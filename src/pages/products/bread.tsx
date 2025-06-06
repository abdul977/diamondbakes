import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { menuService } from '../../services/menuService';
import { MenuItem } from '../../types';

const BreadPage = () => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching bread products...');
        const data = await menuService.getProductsByCategory('BREAD VARIETIES');
        console.log('Received products:', data);
        
        // Initialize empty array if data is undefined
        setProducts(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bread products:', err);
        setError('Failed to load bread products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hi, I'm interested in ordering ${productName} from Diamond Elite Bites.`;
    const whatsappUrl = `https://wa.me/2348027408760?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-yellow-500 hover:text-yellow-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Link>
        </div>
        <h1 className="text-4xl font-serif font-bold mb-8">Our Bread Varieties</h1>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bread products...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            <p>No bread products available at the moment.</p>
            <p className="mt-2">Please check back later or contact us for more information.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
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
        )}
      </div>
    </div>
  );
};

export default BreadPage;
