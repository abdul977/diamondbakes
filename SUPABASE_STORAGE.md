# Supabase Storage Integration

This document explains how the Supabase Storage integration works in the Diamond Elite Bites application.

## Overview

We use Supabase Storage for handling image uploads in the admin dashboard. This provides several benefits:

1. Direct client-side uploads without going through our backend
2. Automatic CDN distribution for faster image loading
3. Secure access control
4. Simplified image management

## Implementation Details

### Frontend Integration

The frontend uses the Supabase JavaScript client to directly upload images to Supabase Storage. This eliminates the need to proxy uploads through our backend server, which resolves CORS issues and improves performance.

Key components:

1. **Supabase Client** (`src/utils/supabaseClient.ts`): Initializes the Supabase client with our project URL and anon key.

2. **Storage Service** (`src/services/storageService.ts`): Provides methods for uploading and deleting files.

3. **Products Component** (`src/pages/admin/menu/Products.tsx`): Uses the storage service to handle image uploads when adding or editing products.

### Environment Variables

The following environment variables are required:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

Note: The `VITE_SUPABASE_KEY` should be the anon key (public), not the service role key.

## Security Considerations

1. **Bucket Permissions**: The `product-images` bucket is configured with public read access but restricted write access.

2. **Anon Key**: We use the anon key for client-side operations, which has limited permissions.

3. **File Types**: We restrict uploads to image file types only.

## Testing

You can test the Supabase storage integration using the provided test script:

```bash
node src/test-supabase-storage.js
```

This script will upload a test image to Supabase Storage, retrieve its public URL, and then delete it.

## Troubleshooting

If you encounter issues with image uploads:

1. Check that your Supabase credentials are correctly set in the `.env` file
2. Verify that the `product-images` bucket exists in your Supabase project
3. Ensure the bucket has the correct permissions (public read access)
4. Check browser console for any errors during upload
