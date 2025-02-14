import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'b1',
    name: 'Banana Bread',
    description: 'Moist and delicious banana bread made with ripe bananas and premium ingredients',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1686431985100-a31cb343bce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmcmVzaGx5JTIwYmFrZWQlMjBicmVhZHxlbnwwfDB8fHwxNzM5NDk0MDc3fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b2',
    name: 'Coconut Bread',
    description: 'Sweet and fluffy coconut bread with real coconut flakes',
    price: '₦3,000',
    image: 'https://images.unsplash.com/photo-1566698629409-787a68fc5724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWR8ZW58MHwwfHx8MTczOTQ5NDA3OHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b3',
    name: 'Whole Wheat Bread',
    description: 'Healthy whole wheat bread perfect for sandwiches',
    price: '₦2,500',
    image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MHwwfHx8MTczOTQ5NDA3OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b4',
    name: 'Milk Bread',
    description: 'Soft and fluffy milk bread, perfect for breakfast',
    price: '₦2,000',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwwfDB8fHwxNzM5NDk0MDc5fDA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const BreadPage = () => {
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
        <h1 className="text-4xl font-serif font-bold mb-8">Our Bread Varieties</h1>
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

export default BreadPage;
