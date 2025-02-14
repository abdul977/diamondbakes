import { fetchAllImages } from '../src/utils/fetchImages';
import * as fs from 'fs/promises';
import * as path from 'path';

const updateProductImages = async () => {
  try {
    console.log('Fetching images from Unsplash...');
    const images = await fetchAllImages();

    // Update product files
    const updateFile = async (filePath: string, category: string) => {
      const content = await fs.readFile(filePath, 'utf-8');
      const categoryImages = images[category];
      if (!categoryImages || categoryImages.length === 0) {
        console.warn(`No images found for category: ${category}`);
        return;
      }

      let updatedContent = content;
      const imagePattern = /image: ['"]https:\/\/images\.unsplash\.com\/[^'"]+['"]/g;
      const matches = content.match(imagePattern) || [];

      matches.forEach((match, index) => {
        if (categoryImages[index]) {
          updatedContent = updatedContent.replace(
            match,
            `image: '${categoryImages[index]}'`
          );
        }
      });

      await fs.writeFile(filePath, updatedContent, 'utf-8');
      console.log(`Updated images in ${path.basename(filePath)}`);
    };

    // Update all product pages
    await Promise.all([
      updateFile('./src/pages/products/cakes.tsx', 'cakes'),
      updateFile('./src/pages/products/bread.tsx', 'bread'),
      updateFile('./src/pages/products/pies.tsx', 'pies'),
      updateFile('./src/pages/products/small-chops.tsx', 'smallChops'),
      updateFile('./src/pages/products/shawarma.tsx', 'shawarma'),
      updateFile('./src/pages/products/pastries.tsx', 'pastries')
    ]);

    console.log('Successfully updated all product images!');
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
};

updateProductImages();
