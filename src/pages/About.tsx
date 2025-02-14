import React from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-yellow-500" />,
      title: 'Expert Bakers',
      description: 'Our team of skilled bakers brings years of experience and passion to every creation.'
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: 'Fresh Daily',
      description: 'Everything is baked fresh daily using premium ingredients and traditional techniques.'
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-500" />,
      title: 'Quality Guaranteed',
      description: 'We maintain the highest standards of quality and food safety in all our products.'
    },
    {
      icon: <Heart className="h-6 w-6 text-yellow-500" />,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We ensure every order exceeds expectations.'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">About Diamond Elite Bites</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Diamond Elite Bites is a premium bakery dedicated to crafting exceptional baked goods 
            that bring joy to every occasion. Since our establishment, we've been committed to 
            delivering quality, taste, and excellence in every bite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Diamond Elite Bites began with a simple passion for creating delicious, high-quality 
                baked goods that bring people together. What started as a small family venture has 
                grown into a beloved bakery known for its exceptional products and customer service.
              </p>
              <p>
                We take pride in using only the finest ingredients, following traditional recipes 
                while embracing modern techniques to ensure consistent quality and taste. Our team 
                of dedicated bakers starts early each morning to provide fresh, delightful treats 
                for our valued customers.
              </p>
              <p>
                From celebration cakes to daily bread, from savory pies to delectable pastries, 
                every item is crafted with care and attention to detail. We understand that our 
                products are part of your special moments and daily joy, and we take this 
                responsibility seriously.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-w-4 aspect-h-5">
              <img 
                src="https://images.unsplash.com/photo-1556191041-c74e1904be2c?auto=format&fit=crop&q=80" 
                alt="Baker working"
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
            <div className="aspect-w-4 aspect-h-5 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80" 
                alt="Fresh baked goods"
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-yellow-50 rounded-2xl">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">Our Commitment</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            At Diamond Elite Bites, we're committed to bringing you the finest baked goods made 
            with love and expertise. We believe in creating not just products, but experiences 
            that bring smiles to faces and warmth to hearts. Your satisfaction is our success, 
            and we look forward to serving you with excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
