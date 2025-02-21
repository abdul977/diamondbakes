import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../server/models/testimonialModel.js';

dotenv.config();

const testimonials = [
  {
    name: 'Oluwaseun Adebayo',
    role: 'Event Planner',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80',
    content: 'The small chops from Diamond Elite Bites are always the highlight at my events. Their service is reliable and the quality is consistently excellent.',
    rating: 5
  },
  {
    name: 'Chidinma Okonkwo',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1613053341085-db794820ce43?auto=format&fit=crop&q=80',
    content: 'I order their meat pies regularly for my office meetings. They\'re always fresh, well-seasoned, and delivered on time. Highly recommended!',
    rating: 5
  },
  {
    name: 'Aisha Ibrahim',
    role: 'Wedding Planner',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80',
    content: 'Their wedding cakes are absolutely beautiful! The attention to detail and taste is outstanding. My clients are always impressed.',
    rating: 5
  },
  {
    name: 'Babajide Ogunleye',
    role: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80',
    content: 'The quality of their bread is exceptional. I\'ve been ordering from them for my restaurant for over a year now. Great consistency!',
    rating: 5
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'diamondbakes'
    });
    console.log('Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials');

    // Insert new testimonials
    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();
