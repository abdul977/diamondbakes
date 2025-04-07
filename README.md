# Diamond Elite Bites

A full-stack web application for Diamond Elite Bites bakery, built with React, Node.js, and MongoDB.

## Features

- Product catalog with categories
- Blog section for bakery updates and recipes
- Image gallery showcasing our products
- Customer testimonials
- About us section
- Contact information and opening hours
- Admin dashboard for content management

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Storage**: Supabase Storage for image uploads
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/diamondbakes.git
cd diamondbakes
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:5001/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:5001

## API Endpoints

### Menu Routes
- GET /api/menu/categories - Get all menu categories
- GET /api/menu/products - Get all products
- GET /api/menu/categories/:name/products - Get products by category
- POST /api/menu/categories - Create new category (Admin only)
- POST /api/menu/products - Create new product (Admin only)

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- POST /api/auth/logout - Logout user

### Blog Routes
- GET /api/blog/posts - Get all blog posts
- GET /api/blog/posts/:id - Get single blog post
- POST /api/blog/posts - Create new blog post (Admin only)

### Gallery Routes
- GET /api/gallery - Get all gallery items
- POST /api/gallery - Upload new gallery item (Admin only)

## License

This project is proprietary software belonging to Diamond Elite Bites.
