import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive updates about new products, special offers, and expert baking tips delivered straight to your inbox.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center justify-center font-medium"
              >
                Subscribe
                <Send className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
