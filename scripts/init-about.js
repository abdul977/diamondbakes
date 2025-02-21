import mongoose from 'mongoose';
import dotenv from 'dotenv';
import About from '../server/models/aboutModel.js';

dotenv.config();

const aboutData = {
  heading: 'About Diamond Elite Bites',
  introduction: 'Diamond Elite Bites is a premium bakery dedicated to crafting exceptional baked goods that bring joy to every occasion. Since our establishment, we\'ve been committed to delivering quality, taste, and excellence in every bite.',
  features: [
    {
      icon: 'Users',
      title: 'Expert Bakers',
      description: 'Our team of skilled bakers brings years of experience and passion to every creation.'
    },
    {
      icon: 'Clock',
      title: 'Fresh Daily',
      description: 'Everything is baked fresh daily using premium ingredients and traditional techniques.'
    },
    {
      icon: 'Award',
      title: 'Quality Guaranteed',
      description: 'We maintain the highest standards of quality and food safety in all our products.'
    },
    {
      icon: 'Heart',
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We ensure every order exceeds expectations.'
    }
  ],
  story: {
    title: 'Our Story',
    content: [
      'Diamond Elite Bites began with a simple passion for creating delicious, high-quality baked goods that bring people together. What started as a small family venture has grown into a beloved bakery known for its exceptional products and customer service.',
      'We take pride in using only the finest ingredients, following traditional recipes while embracing modern techniques to ensure consistent quality and taste. Our team of dedicated bakers starts early each morning to provide fresh, delightful treats for our valued customers.',
      'From celebration cakes to daily bread, from savory pies to delectable pastries, every item is crafted with care and attention to detail. We understand that our products are part of your special moments and daily joy, and we take this responsibility seriously.'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556191041-c74e1904be2c?auto=format&fit=crop&q=80',
        alt: 'Baker working'
      },
      {
        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80',
        alt: 'Fresh baked goods'
      }
    ]
  },
  commitment: {
    title: 'Our Commitment',
    content: 'At Diamond Elite Bites, we\'re committed to bringing you the finest baked goods made with love and expertise. We believe in creating not just products, but experiences that bring smiles to faces and warmth to hearts. Your satisfaction is our success, and we look forward to serving you with excellence.'
  }
};

async function seedAboutContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'diamondbakes'
    });
    console.log('Connected to MongoDB');

    // Clear existing about content
    await About.deleteMany({});
    console.log('Cleared existing about content');

    // Create new about content
    const about = new About(aboutData);
    await about.save();
    console.log('About content seeded successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding about content:', error);
    process.exit(1);
  }
}

seedAboutContent();
