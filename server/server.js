import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import menuRoutes from './routes/menuRoutes.js';
import authRoutes from './routes/authRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import { errorHandler } from './middleware/authMiddleware.js';

// Load env vars
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5001;
const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true
}));

// Debug middleware for all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', req.body);
  console.log('Cookies:', req.cookies);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/menu', (req, res, next) => {
  console.log('Menu route hit:', req.method, req.path);
  next();
}, menuRoutes);

app.use('/api/auth', (req, res, next) => {
  console.log('Auth route hit:', req.method, req.path);
  next();
}, authRoutes);

app.use('/api/settings', (req, res, next) => {
  console.log('Settings route hit:', req.method, req.path);
  next();
}, settingsRoutes);

app.use('/api/blog', (req, res, next) => {
  console.log('Blog route hit:', req.method, req.path);
  next();
}, blogRoutes);

app.use('/api/gallery', (req, res, next) => {
  console.log('Gallery route hit:', req.method, req.path);
  next();
}, galleryRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
});

// Error handling middleware
app.use(errorHandler);

// Configure mongoose
mongoose.set('strictQuery', false);

async function startServer() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { 
      dbName: 'diamondbakes'
    });

    console.log('Connected to MongoDB');
    console.log('Database Name:', mongoose.connection.name);
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('\nAPI endpoints:');
      console.log('Auth Routes:');
      console.log(`- POST   http://localhost:${PORT}/api/auth/register`);
      console.log(`- POST   http://localhost:${PORT}/api/auth/login`);
      console.log(`- GET    http://localhost:${PORT}/api/auth/me`);
      console.log(`- POST   http://localhost:${PORT}/api/auth/logout`);
      console.log(`- PUT    http://localhost:${PORT}/api/auth/updatedetails`);
      console.log(`- PUT    http://localhost:${PORT}/api/auth/updatepassword`);
      console.log('\nMenu Routes:');
      console.log(`- GET    http://localhost:${PORT}/api/menu/categories`);
      console.log(`- GET    http://localhost:${PORT}/api/menu/products`);
      console.log(`- POST   http://localhost:${PORT}/api/menu/categories`);
      console.log(`- POST   http://localhost:${PORT}/api/menu/products`);
      console.log('\nBlog Routes:');
      console.log(`- GET    http://localhost:${PORT}/api/blog/posts`);
      console.log(`- GET    http://localhost:${PORT}/api/blog/posts/:id`);
      console.log(`- POST   http://localhost:${PORT}/api/blog/posts`);
      console.log(`- PUT    http://localhost:${PORT}/api/blog/posts/:id`);
      console.log(`- DELETE http://localhost:${PORT}/api/blog/posts/:id`);
      console.log('\nGallery Routes:');
      console.log(`- GET    http://localhost:${PORT}/api/gallery`);
      console.log(`- GET    http://localhost:${PORT}/api/gallery/:id`);
      console.log(`- POST   http://localhost:${PORT}/api/gallery`);
      console.log(`- PUT    http://localhost:${PORT}/api/gallery/:id`);
      console.log(`- DELETE http://localhost:${PORT}/api/gallery/:id`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

// Log mongoose queries in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
