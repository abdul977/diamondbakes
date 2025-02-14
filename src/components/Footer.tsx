import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Diamond } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Diamond className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-serif font-bold">Diamond Elite Bites</span>
            </div>
            <p className="text-gray-300 mb-6">
              Crafting moments of joy through artisanal baking since 2015.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://instagram.com/diamond_elitesbites" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Menu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">ABUJA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">08027408760</span>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">@diamond_elitesbites</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-4 text-gray-300">
              <li>Monday - Friday: 7am - 8pm</li>
              <li>Saturday: 8am - 8pm</li>
              <li>Sunday: 9am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Diamond Elite Bites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
