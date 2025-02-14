import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'sc1',
    name: 'Classic Small Chops Pack',
    description: 'Mix of spring rolls, samosas, puff puff, and chicken wings (50 pieces)',
    price: '₦30,000',
    image: 'https://images.unsplash.com/photo-1606525437679-037aca74a3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xsc3xlbnwwfDB8fHwxNzM5NDk0MDg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc2',
    name: 'Premium Party Pack',
    description: 'Deluxe mix including fish rolls, mini pizzas, and meatballs (100 pieces)',
    price: '₦70,000',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHwwfHx8MTczOTQ5NDA4NXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc3',
    name: 'Puff Puff Special',
    description: 'Nigerian-style soft and fluffy puff puff (50 pieces)',
    price: '₦10,000',
    image: 'https://images.unsplash.com/photo-1665833613236-7c1d087463b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxwdWZmJTIwcHVmZnxlbnwwfDB8fHwxNzM5NDk0MDg1fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc4',
    name: 'Spring Rolls Pack',
    description: 'Crispy vegetable spring rolls with sweet chili sauce (30 pieces)',
    price: '₦20,000',
    image: 'https://images.unsplash.com/photo-1574183118053-258a7b31e784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmaW5nZXIlMjBmb29kfGVufDB8MHx8fDE3Mzk0OTQwODZ8MA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const SmallChopsPage = () => {
  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hi, I'm interested in ordering ${productName} from Diamond Elite Bites.`;
    const whatsappUrl = `https://wa.me/2348027408760?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Link>
        </div>
        <h1 className="text-4xl font-serif font-bold mb-8">Small Chops</h1>
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Perfect for Your Events</h2>
          <p className="text-gray-600">
            Our small chops are freshly made for your parties and events. We recommend ordering at least 48 hours in advance for large events. Custom combinations are available upon request.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="text-yellow-600 font-semibold mb-4">{product.price}</p>
                <button
                  onClick={() => handleWhatsAppOrder(product.name)}
                  className="w-full bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallChopsPage;
