import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GalleryItem from '../server/models/galleryModel.js';

dotenv.config();

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID a36P8_gh54qoYAebDmKpwJfp3pNiZBxOxDTbGLObfdg'
  }
});

const searchQueries = {
  cakes: [
    { query: 'birthday cake', title: 'Birthday Cake Creation' },
    { query: 'wedding cake', title: 'Elegant Wedding Cake' },
    { query: 'chocolate cake', title: 'Rich Chocolate Cake' },
    { query: 'celebration cake', title: 'Special Celebration Cake' },
    { query: 'cupcakes display', title: 'Cupcakes Collection' }
  ],
  bread: [
    { query: 'freshly baked bread', title: 'Fresh Artisan Bread' },
    { query: 'artisan bread', title: 'Handcrafted Bread' },
    { query: 'bread loaf', title: 'Classic Bread Loaf' },
    { query: 'bakery bread', title: 'Bakery Special' },
    { query: 'banana bread', title: 'Homestyle Banana Bread' }
  ],
  pies: [
    { query: 'meat pie', title: 'Signature Meat Pie' },
    { query: 'chicken pie', title: 'Golden Chicken Pie' },
    { query: 'nigerian meat pie', title: 'Traditional Meat Pie' },
    { query: 'savory pie', title: 'Savory Special Pie' },
    { query: 'hand pie', title: 'Hand-Crafted Mini Pie' }
  ],
  smallChops: [
    { query: 'spring rolls', title: 'Crispy Spring Rolls' },
    { query: 'samosa', title: 'Spiced Samosas' },
    { query: 'puff puff', title: 'Classic Puff Puff' },
    { query: 'finger food', title: 'Assorted Small Chops' },
    { query: 'appetizers', title: 'Party Appetizers' }
  ],
  shawarma: [
    { query: 'chicken shawarma', title: 'Classic Chicken Shawarma' },
    { query: 'beef shawarma', title: 'Premium Beef Shawarma' },
    { query: 'shawarma wrap', title: 'Special Shawarma Wrap' },
    { query: 'gyro sandwich', title: 'Mediterranean Style Shawarma' },
    { query: 'doner kebab', title: 'Turkish Style Shawarma' }
  ],
  pastries: [
    { query: 'sausage roll', title: 'Fresh Sausage Roll' },
    { query: 'fresh croissants', title: 'Buttery Croissants' },
    { query: 'doughnuts display', title: 'Assorted Doughnuts' },
    { query: 'scotch egg', title: 'Classic Scotch Egg' },
    { query: 'pastry display', title: 'Premium Pastries Selection' }
  ]
};

async function fetchAndStoreImages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'diamondbakes'
    });
    console.log('Connected to MongoDB');

    // Clear existing gallery items
    await GalleryItem.deleteMany({});
    console.log('Cleared existing gallery items');

    let counter = 1;
    for (const [category, items] of Object.entries(searchQueries)) {
      console.log(`\nProcessing ${category} category...`);
      
      for (const { query, title } of items) {
        try {
          const response = await unsplashApi.get('/search/photos', {
            params: {
              query,
              orientation: 'landscape',
              per_page: 1
            }
          });

          if (response.data.results.length > 0) {
            const image = response.data.results[0];
            const item = new GalleryItem({
              id: `g${counter}`,
              title: title,
              description: `Beautiful ${query.toLowerCase()} from our collection`,
              image: image.urls.regular,
              category: category,
              createdAt: new Date().toISOString()
            });

            await item.save();
            console.log(`Created gallery item: ${title}`);
            counter++;
          }

          // Delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error fetching/saving image for "${query}":`, error.message);
        }
      }
    }

    console.log('\nGallery seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchAndStoreImages();
