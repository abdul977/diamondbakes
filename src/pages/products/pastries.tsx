import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'pa1',
    name: 'Sausage Roll',
    description: 'Classic sausage roll with seasoned minced meat filling',
    price: '₦800 per piece',
    image: 'https://images.unsplash.com/photo-1619445832874-8b153f60ae78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzYXVzYWdlJTIwcm9sbHxlbnwwfDB8fHwxNzM5NDk0MDkwfDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa2',
    name: 'Doughnuts',
    description: 'Soft and fluffy doughnuts with various toppings (6 pieces)',
    price: '₦5,000',
    image: 'https://images.unsplash.com/photo-1587652758160-6fee93aee8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNyb2lzc2FudHN8ZW58MHwwfHx8MTczOTQ5NDA5MXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa3',
    name: 'Scotch Egg',
    description: 'Boiled egg wrapped in seasoned minced meat and breadcrumbs',
    price: '₦1,000 per piece',
    image: 'https://images.unsplash.com/photo-1599639668273-01b1f435b56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxkb3VnaG51dHMlMjBkaXNwbGF5fGVufDB8MHx8fDE3Mzk0OTQwOTJ8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa4',
    name: 'Croissants',
    description: 'Buttery, flaky croissants (4 pieces)',
    price: '₦6,000',
    image: 'https://images.unsplash.com/photo-1576748092413-ee713ea2f178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzY290Y2glMjBlZ2d8ZW58MHwwfHx8MTczOTQ5NDA5Mnww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa5',
    name: 'Chicken Roll',
    description: 'Puff pastry filled with seasoned shredded chicken',
    price: '₦1,200 per piece',
    image: 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBkaXNwbGF5fGVufDB8MHx8fDE3Mzk0OTQwOTN8MA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const PastriesPage = () => {
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
        <h1 className="text-4xl font-serif font-bold mb-8">Other Pastries</h1>
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Fresh Daily</h2>
          <p className="text-gray-600">
            All our pastries are baked fresh daily using premium ingredients. For bulk orders or special requests, 
            please contact us via WhatsApp at least 24 hours in advance.
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
          <h2 className="text-2xl font-semibold mb-4">Bulk Order Discounts</h2>
          <p className="text-gray-600">
            We offer special pricing for bulk orders. Contact us via WhatsApp to discuss your requirements 
            and get a custom quote for your event or business needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PastriesPage;
