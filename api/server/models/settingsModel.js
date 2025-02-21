import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    required: true,
    default: '#FCD34D'
  },
  secondaryColor: {
    type: String,
    required: true,
    default: '#111827'
  },
  fontFamily: {
    type: String,
    required: true,
    default: 'serif'
  },
  backgroundColor: {
    type: String,
    required: true,
    default: '#F9FAFB'
  }
}, { _id: false });

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Diamond Elite Bites\nA Heavenly Bites'
  },
  description: {
    type: String,
    required: true,
    default: 'Turning your fantasy into reality with celebration cakes, budget cakes, banana & coconut bread, and all types of cakes. We also offer food trays and pastries ready to travel!'
  },
  imageUrl: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
  }
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  theme: {
    type: themeSchema,
    required: true,
    default: () => ({})
  },
  hero: {
    type: heroSchema,
    required: true,
    default: () => ({})
  },
  siteName: {
    type: String,
    required: true,
    default: 'Diamond Bakes'
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  openingHours: {
    type: String,
    required: true
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String
  },
  metaDescription: {
    type: String,
    required: true
  },
  orderingInstructions: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Settings', settingsSchema);
