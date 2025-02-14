import { fetchImagesForCategory } from '../src/utils/fetchImages.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateTestimonialImages = async () => {
  try {
    console.log('Fetching Nigerian profile images from Unsplash...');
    const profileImages = await fetchImagesForCategory('profiles');

    if (!profileImages || profileImages.length === 0) {
      console.error('No profile images found');
      process.exit(1);
    }

    // Read Testimonials component file
    const testimonialsPath = path.join(__dirname, '..', 'src/components/Testimonials.tsx');
    let content = await fs.readFile(testimonialsPath, 'utf-8');

    // Update each profile image
    profileImages.forEach((image, index) => {
      const imagePattern = new RegExp(`image: 'https://images\\.unsplash\\.com/[^']+' /\\* Testimonial ${index + 1} \\*/`);
      content = content.replace(imagePattern, `image: '${image}' /* Testimonial ${index + 1} */`);
    });

    // Write the updated content back to the file
    await fs.writeFile(testimonialsPath, content, 'utf-8');
    console.log('Successfully updated testimonial profile images!');

  } catch (error) {
    console.error('Error updating testimonial images:', error);
    process.exit(1);
  }
};

updateTestimonialImages();
