import React, { useEffect, useState } from 'react';
import { galleryService } from '../services/galleryService';

const Gallery = () => {
  const [items, setItems] = useState<Record<string, typeof galleryService.getAllItems extends () => Promise<infer T> ? T : never>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        const allItems = await galleryService.getAllItems();
        const categorizedItems = allItems.reduce((acc, item) => {
          const category = item.category || 'other';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {} as Record<string, typeof allItems>);

        setItems(categorizedItems);
      } catch (error) {
        console.error('Error loading gallery items:', error);
        setError('Failed to load gallery items');
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, []);

  const tabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'bread', label: 'Bread' },
    { id: 'pies', label: 'Pies' },
    { id: 'smallChops', label: 'Small Chops' },
    { id: 'shawarma', label: 'Shawarma' },
    { id: 'pastries', label: 'Pastries' }
  ];

  const getFilteredItems = () => {
    if (activeTab === 'all') {
      return Object.values(items).flat();
    }
    return items[activeTab] || [];
  };

  if (loading) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">Our Gallery</h1>
          <p className="text-gray-600 text-lg">
            Take a look at our delicious creations. From custom cakes to freshly baked bread,
            every item is crafted with care and attention to detail.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {error ? (
            <div className="col-span-full text-center text-red-600">{error}</div>
          ) : getFilteredItems().map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-yellow-50 rounded-2xl text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Want to Order?</h2>
          <p className="text-gray-600 mb-6">
            See something you like? Contact us to place an order or discuss custom requirements.
          </p>
          <a
            href="https://wa.me/2348027408760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
