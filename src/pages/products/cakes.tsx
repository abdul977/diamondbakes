import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'c1',
    name: 'Birthday Cake',
    description: 'Customized birthday cakes with your choice of flavors and designs',
    price: 'Starting from ₦30,000',
    image: 'https://images.unsplash.com/photo-1589218909732-f304d13fbf2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2V8ZW58MHwwfHx8MTczOTQ5NDA3NHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'c2',
    name: 'Wedding Cake',
    description: 'Elegant multi-tiered wedding cakes with premium decorations',
    price: 'Starting from ₦100,000',
    image: 'https://images.unsplash.com/photo-1604702433171-33756f3f3825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZXxlbnwwfDB8fHwxNzM5NDk0MDc1fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'c3',
    name: 'Cupcakes',
    description: 'Delicious cupcakes in various flavors perfect for any occasion',
    price: '₦10,000 per dozen',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDB8MHx8fDE3Mzk0OTQwNzV8MA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const CakesPage = () => {
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
        <h1 className="text-4xl font-serif font-bold mb-8">Our Cakes</h1>
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

export default CakesPage;
