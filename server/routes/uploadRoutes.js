import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'product-images';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

// Configure temporary storage for multer
const storage = multer.memoryStorage(); // Store files in memory instead of disk

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Add CORS headers for the upload route
router.use((req, res, next) => {
  // Get the origin from the request
  const origin = req.headers.origin;
  console.log('Upload route - Request origin:', origin);

  // Allow specific origins
  const allowedOrigins = ['http://localhost:5173', 'https://diamondbakes.vercel.app'];

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Upload image route - using authorize('admin') instead of admin middleware
router.post('/', protect, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    console.log('File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Generate a unique filename
    const fileName = `${uuidv4()}-${req.file.originalname}`;

    console.log('Uploading to Supabase:', fileName);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image to storage: ' + error.message });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(supabaseBucket)
      .getPublicUrl(fileName);

    console.log('Upload successful, URL:', urlData.publicUrl);

    res.status(200).json({
      success: true,
      imageUrl: urlData.publicUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process image upload: ' + error.message });
  }
});

export default router;