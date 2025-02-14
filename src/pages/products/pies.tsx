import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'p1',
    name: 'Meat Pie',
    description: 'Classic Nigerian meat pie filled with seasoned minced meat, potatoes, and carrots',
    price: '₦1,000 per piece',
    image: 'https://images.unsplash.com/photo-1545668855-b923f0176935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcGllfGVufDB8MHx8fDE3Mzk0OTQwODF8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'p2',
    name: 'Chicken Pie',
    description: 'Delicious pie filled with tender chicken and vegetables',
    price: '₦1,000 per piece',
    image: 'https://images.unsplash.com/photo-1601000938365-f182c5ec2f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGllfGVufDB8MHx8fDE3Mzk0OTQwODF8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'p3',
    name: 'Party Pack Pies',
    description: 'Mix of meat and chicken pies perfect for events (minimum 50 pieces)',
    price: 'Starting from ₦50,000',
    image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMG1lYXQlMjBwaWV8ZW58MHwwfHx8MTczOTQ5NDA4Mnww&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const PiesPage = () => {
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
        <h1 className="text-4xl font-serif font-bold mb-8">Meat & Chicken Pies</h1>
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
          <h2 className="text-2xl font-semibold mb-4">Bulk Orders</h2>
          <p className="text-gray-600">
            We offer special pricing for bulk orders and events. Contact us via WhatsApp to discuss your requirements and get a custom quote.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PiesPage;
