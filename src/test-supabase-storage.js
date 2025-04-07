// This file is for testing Supabase storage from the frontend
// Run with: node src/test-supabase-storage.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test image path
const testImagePath = path.join(__dirname, '../public/test-image.jpg');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabaseBucket = 'product-images';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found in environment variables');
  process.exit(1);
}

console.log('Supabase URL:', supabaseUrl);
console.log('Using anon key for client-side storage operations');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseStorage() {
  try {
    console.log('Reading test image...');
    const fileData = fs.readFileSync(testImagePath);
    
    const fileName = `test-${Date.now()}.jpg`;
    
    console.log('Uploading to Supabase:', fileName);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .upload(fileName, fileData, {
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return;
    }

    console.log('Upload successful:', data);

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(supabaseBucket)
      .getPublicUrl(fileName);
    
    console.log('Public URL:', urlData.publicUrl);
    
    // Test deleting the file
    console.log('Testing file deletion...');
    const { error: deleteError } = await supabase.storage
      .from(supabaseBucket)
      .remove([fileName]);
    
    if (deleteError) {
      console.error('Delete error:', deleteError);
    } else {
      console.log('File deleted successfully');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testSupabaseStorage();
