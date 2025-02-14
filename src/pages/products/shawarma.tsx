import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'sh1',
    name: 'Classic Chicken Shawarma',
    description: 'Grilled chicken with fresh vegetables and special sauce wrapped in flat bread',
    price: '₦2,000',
    image: 'https://images.unsplash.com/photo-1724698341025-3df06b7e490d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2hhd2FybWF8ZW58MHwwfHx8MTczOTQ5NDA4N3ww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh2',
    name: 'Beef Shawarma',
    description: 'Seasoned beef strips with vegetables and garlic sauce',
    price: '₦2,500',
    image: 'https://images.unsplash.com/photo-1654579920979-8ebb4e96b755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc2hhd2FybWF8ZW58MHwwfHx8MTczOTQ5NDA4OHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh3',
    name: 'Special Shawarma',
    description: 'Double meat (chicken and beef) with extra cheese and special sauce',
    price: '₦3,000',
    image: 'https://images.unsplash.com/photo-1662116765994-1e4200c43589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzaGF3YXJtYSUyMHdyYXB8ZW58MHwwfHx8MTczOTQ5NDA4OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh4',
    name: 'Party Pack',
    description: 'Mix of chicken and beef shawarma (10 pieces)',
    price: '₦22,000',
    image: 'https://images.unsplash.com/photo-1715640396476-a884855dbcc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxneXJvJTIwc2FuZHdpY2h8ZW58MHwwfHx8MTczOTQ5NDA4OXww&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const ShawarmaPage = () => {
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
        <h1 className="text-4xl font-serif font-bold mb-8">Shawarma</h1>
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Fresh & Delicious</h2>
          <p className="text-gray-600">
            Our shawarmas are made fresh with high-quality meat, fresh vegetables, and our special house sauce. 
            Available for individual orders and party packs. For bulk orders, please place your order at least 24 hours in advance.
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
        
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Extra cheese - ₦500</li>
            <li>Extra meat - ₦1,000</li>
            <li>Special sauce - ₦300</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShawarmaPage;
