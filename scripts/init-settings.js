import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Settings from '../server/models/settingsModel.js';

dotenv.config();

const defaultTheme = {
  primaryColor: '#FCD34D',
  secondaryColor: '#111827',
  fontFamily: 'serif',
  backgroundColor: '#F9FAFB'
};

const defaultHero = {
  title: 'Diamond Elite Bites\nA Heavenly Bites',
  description: 'Turning your fantasy into reality with celebration cakes, budget cakes, banana & coconut bread, and all types of cakes. We also offer food trays and pastries ready to travel!',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
};

async function initializeSettings() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully to MongoDB');

    // Find existing settings document
    const existingSettings = await Settings.findOne();
    
    if (existingSettings) {
      console.log('Found existing settings:', existingSettings);
      
      // Force update theme and hero
      const updatedSettings = await Settings.findByIdAndUpdate(
        existingSettings._id,
        {
          $set: {
            theme: defaultTheme,
            hero: defaultHero
          }
        },
        { new: true }
      );

      console.log('Updated settings with theme and hero:', updatedSettings);
    } else {
      console.log('No settings found, creating new settings...');
      const newSettings = await Settings.create({
        theme: defaultTheme,
        hero: defaultHero,
        siteName: 'Diamond Elite Bites',
        contactEmail: 'info@diamondelitebites.com',
        contactPhone: '08027408760',
        address: 'ABUJA',
        openingHours: 'Monday - Friday: 7am - 8pm\nSaturday: 8am - 8pm\nSunday: 9am - 6pm',
        socialMedia: {
          facebook: '',
          instagram: 'https://instagram.com/diamond_elitesbites',
          twitter: '',
          whatsapp: ''
        },
        metaDescription: 'Crafting moments of joy through artisanal baking since 2015.',
        orderingInstructions: 'Contact us via Instagram @diamond_elitesbites or call 08027408760 to place your order.'
      });

      console.log('Created new settings:', newSettings);
    }

    console.log('Settings initialization complete');
  } catch (error) {
    console.error('Error initializing settings:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

initializeSettings().catch(console.error);
