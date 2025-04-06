import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.image;
    
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read the file
    const fileData = await fs.promises.readFile(file.filepath);
    
    // Generate a unique filename
    const fileName = `${uuidv4()}-${file.originalFilename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, fileData, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image to storage' });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return res.status(200).json({ 
      success: true, 
      imageUrl: urlData.publicUrl 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to process image upload' });
  }
}