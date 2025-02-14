import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: '1',
    name: 'CAKES',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80',
    description: 'All types of cakes including budget and celebration cakes',
    link: '/products/cakes'
  },
  {
    id: '2',
    name: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    description: 'Different types of freshly baked bread including banana and coconut bread',
    link: '/products/bread-varieties'
  },
  {
    id: '3',
    name: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80',
    description: 'Delicious savory pies made with fresh meat and chicken filling',
    link: '/products/meat-and-chicken-pies'
  },
  {
    id: '4',
    name: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80',
    description: 'Perfect party snacks and finger foods for your events',
    link: '/products/small-chops'
  },
  {
    id: '5',
    name: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&q=80',
    description: 'Delicious shawarma wraps with special sauce',
    link: '/products/shawarma'
  },
  {
    id: '6',
    name: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80',
    description: 'Various pastries and baked treats ready to travel',
    link: '/products/other-pastries'
  }
];

const Menu = () => {
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
