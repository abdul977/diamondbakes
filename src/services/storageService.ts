import supabaseClient from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'product-images';

export const storageService = {
  /**
   * Upload a file to Supabase Storage
   * @param file The file to upload
   * @returns The public URL of the uploaded file
   */
  async uploadFile(file: File): Promise<string> {
    try {
      // Generate a unique filename to prevent collisions
      const fileName = `${uuidv4()}-${file.name}`;

      console.log('Uploading to Supabase Storage:', fileName);
      console.log('File type:', file.type);
      console.log('File size:', file.size);

      // Upload the file to Supabase Storage
      const { data, error } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true, // Changed to true to overwrite if file exists
          contentType: file.type,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      if (!data) {
        console.error('No data returned from upload');
        throw new Error('Upload failed: No data returned');
      }

      // Get the public URL of the uploaded file
      const { data: urlData } = supabaseClient.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) {
        console.error('Failed to get public URL');
        throw new Error('Failed to get public URL for uploaded file');
      }

      console.log('Upload successful, URL:', urlData.publicUrl);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadFile:', error);
      throw error;
    }
  },

  /**
   * Delete a file from Supabase Storage
   * @param url The public URL of the file to delete
   * @returns A boolean indicating whether the deletion was successful
   */
  async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract the file path from the URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];

      console.log('Deleting from Supabase Storage:', fileName);

      // Delete the file from Supabase Storage
      const { error } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

      if (error) {
        console.error('Supabase delete error:', error);
        throw new Error(`Failed to delete file: ${error.message}`);
      }

      console.log('Delete successful');

      return true;
    } catch (error) {
      console.error('Error in deleteFile:', error);
      return false;
    }
  }
};
