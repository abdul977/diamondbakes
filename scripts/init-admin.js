import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../server/models/adminModel.js';

// Load env vars
dotenv.config({ path: './.env' });

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'diamondbakes'
    });

    console.log('MongoDB Connected...');

    // Create super admin
    const adminData = {
      username: 'admin',
      email: 'admin@diamondbakes.com',
      password: 'Admin@123',
      role: 'super_admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create(adminData);

    console.log('Super admin created:', {
      username: admin.username,
      email: admin.email,
      role: admin.role
    });

    console.log('\nLogin credentials:');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();