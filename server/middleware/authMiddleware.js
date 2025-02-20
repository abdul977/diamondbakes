import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

// Protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    // Debug log full request details
    console.log('Auth Request:', {
      path: req.path,
      method: req.method,
      headers: req.headers,
      cookies: req.cookies
    });

    // Get token from cookie or authorization header
    if (req.cookies.token) {
      token = req.cookies.token;
      console.log('Using token from cookie');
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Using token from Authorization header');
    }

    // Check if token exists
    if (!token) {
      console.log('No token found in cookies or Authorization header');
      return res.status(401).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      // Get admin from token
      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (!admin) {
        console.log('No admin found for token');
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }

      // Set both req.admin and req.user for compatibility
      req.admin = admin;
      req.user = admin;
      
      console.log('Auth successful:', {
        id: admin._id,
        role: admin.role
      });

      next();
    } catch (error) {
      console.log('Token verification failed:', {
        error: error.message,
        token: token ? `${token.substring(0, 10)}...` : 'null'
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', {
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method
    });
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    const user = req.admin || req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${user.role} is not authorized to access this route`
      });
    }

    console.log('Authorization successful for role:', user.role);
    next();
  };
};

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);

  let error = { ...err };
  error.message = err.message;

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = { message: 'Invalid token' };
  }

  if (err.name === 'TokenExpiredError') {
    error = { message: 'Token expired' };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
