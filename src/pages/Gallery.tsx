import React, { useEffect, useState } from 'react';
import { fetchImagesForCategory } from '../utils/fetchImages';

const Gallery = () => {
  const [images, setImages] = useState<Record<string, string[]>>({
    cakes: [],
    bread: [],
    pies: [],
    smallChops: [],
    shawarma: [],
    pastries: [],
    gallery: []
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadImages = async () => {
      try {
        const results: Record<string, string[]> = {};
        const categories = ['cakes', 'bread', 'pies', 'smallChops', 'shawarma', 'pastries', 'gallery'];
        
        for (const category of categories) {
          const categoryImages = await fetchImagesForCategory(category as any);
          results[category] = categoryImages;
        }
        
        setImages(results);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
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

  const getFilteredImages = () => {
    if (activeTab === 'all') {
      return Object.values(images).flat();
    }
    return images[activeTab] || [];
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
          {getFilteredImages().map((image, index) => (
            <div 
              key={index}
              className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
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
