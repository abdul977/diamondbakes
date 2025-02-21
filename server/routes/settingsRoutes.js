import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Settings from '../models/settingsModel.js';

const router = express.Router();

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

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/settings: Fetching settings...');
    let settings = await Settings.findOne();
    
    if (!settings) {
      console.log('No settings found, creating default settings...');
      const defaultSettings = {
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
      };
      
      settings = await Settings.create(defaultSettings);
      console.log('Created default settings');
    }

    // Always ensure complete settings object is returned
    const completeSettings = settings.toObject();
    
    // Apply defaults for any missing sections
    // Ensure defaults are properly applied
    completeSettings.theme = completeSettings.theme || defaultTheme;
    completeSettings.hero = completeSettings.hero || defaultHero;

    console.log('Sending settings:', JSON.stringify(completeSettings, null, 2));
    res.json(completeSettings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Received settings update:', JSON.stringify(req.body, null, 2));

    // Find existing settings
    let settings = await Settings.findOne();

    if (!settings) {
      // If no settings exist, create new with proper defaults
      console.log('No existing settings found. Creating new settings...');
      settings = await Settings.create(req.body);
    } else {
      // For existing settings, apply updates directly
      console.log('Updating existing settings...');
      console.log('Current hero data:', JSON.stringify(settings.hero, null, 2));
      console.log('Update hero data:', JSON.stringify(req.body.hero, null, 2));

      settings = await Settings.findOneAndUpdate(
        {},
        req.body,
        { 
          new: true,
          runValidators: true
        }
      );

      console.log('Updated settings result:', JSON.stringify(settings, null, 2));
    }

    // Prepare response with defaults applied
    const completeSettings = settings.toObject();
    completeSettings.theme = completeSettings.theme || defaultTheme;
    completeSettings.hero = completeSettings.hero || defaultHero;

    console.log('Sending updated settings:', JSON.stringify(completeSettings, null, 2));
    res.json(completeSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
