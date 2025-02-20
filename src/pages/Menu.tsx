import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '../services/menuService';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching menu categories...');
        const data = await menuService.getCategories();
        console.log('Received categories:', data);
        setCategories(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching menu categories:', err);
        setError('Failed to load menu categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">Our Menu</h1>
          <p className="text-gray-600 text-lg">
            Explore our wide range of freshly baked goods and delicious treats. 
            Each item is crafted with care using premium ingredients.
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu categories...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            No menu categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <span className="text-yellow-500 font-medium hover:text-yellow-600 inline-flex items-center">
                    View Products
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-yellow-50 rounded-2xl text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Need Help Ordering?</h2>
          <p className="text-gray-600 mb-6">
            Contact us for custom orders, event catering, or any special requirements.
          </p>
          <a
            href="https://wa.me/2348027408760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
