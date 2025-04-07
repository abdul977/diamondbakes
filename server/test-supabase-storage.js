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

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'product-images';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found in environment variables');
  process.exit(1);
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Bucket:', supabaseBucket);

const supabase = createClient(supabaseUrl, supabaseKey);

// Test image path (replace with an actual image in your project)
const testImagePath = path.join(__dirname, 'test-image.jpg');

// Create a test image if it doesn't exist
if (!fs.existsSync(testImagePath)) {
  console.log('Test image not found, creating a placeholder...');
  // This is just a simple 1x1 pixel JPEG
  const placeholderJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc2, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00,
    0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xda, 0x00, 0x08, 0x01,
    0x01, 0x00, 0x01, 0x3f, 0x10
  ]);
  fs.writeFileSync(testImagePath, placeholderJpeg);
}

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
    
    // List files in the bucket
    console.log('Listing files in bucket...');
    const { data: listData, error: listError } = await supabase.storage
      .from(supabaseBucket)
      .list();
      
    if (listError) {
      console.error('Error listing files:', listError);
    } else {
      console.log('Files in bucket:', listData);
    }
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSupabaseStorage();
