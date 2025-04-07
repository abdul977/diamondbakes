import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CategoryCard } from '../types';
import { mongodbService } from '../services/mongodbService';

// Removed hardcoded categories array - now fetching from MongoDB

const Categories = () => {
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories from MongoDB...');
        const data = await mongodbService.fetchCategories();
        console.log('Categories fetched successfully:', data);
        setCategories(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        setError(err.message || 'Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">WE SELL</h2>
          <p className="text-gray-600">Turning your fantasy into reality with our delicious baked goods</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
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
                  <Link
                    to={category.link || `/products/${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                    className="text-yellow-500 font-medium hover:text-yellow-600 inline-flex items-center"
                  >
                    View Menu <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
