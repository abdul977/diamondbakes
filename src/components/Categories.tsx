import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CategoryCard } from '../types';

const categories: CategoryCard[] = [
  {
    id: '1',
    name: 'CAKES',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80',
    description: 'All types of cakes including budget and celebration cakes'
  },
  {
    id: '2',
    name: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    description: 'Different types of freshly baked bread including banana and coconut bread'
  },
  {
    id: '3',
    name: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80',
    description: 'Delicious savory pies made with fresh meat and chicken filling'
  },
  {
    id: '4',
    name: 'SMALL CHOPS',
    image: 'https://i0.wp.com/www.bbcatering.com.ng/wp-content/uploads/2020/07/bb-small-chops-1.jpg?fit=570%2C464&ssl=1',
    description: 'Perfect party snacks and finger foods for your events'
  },
  {
    id: '5',
    name: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&q=80',
    description: 'Delicious shawarma wraps with special sauce'
  },
  {
    id: '6',
    name: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80',
    description: 'Various pastries and baked treats ready to travel'
  },
];

const Categories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">WE SELL</h2>
          <p className="text-gray-600">Turning your fantasy into reality with our delicious baked goods</p>
        </div>
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
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
            <Link
              to={`/products/${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="text-yellow-500 font-medium hover:text-yellow-600 inline-flex items-center"
            >
              View Menu <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
