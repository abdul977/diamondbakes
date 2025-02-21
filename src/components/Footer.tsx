import React, { useMemo } from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Diamond } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { settings, loading, version } = useTheme();

  const theme = useMemo(() => {
    const defaultTheme = {
      backgroundColor: '#F9FAFB',
      fontFamily: 'sans',
      primaryColor: '#FCD34D',
      secondaryColor: '#111827'
    };

    return settings?.theme || defaultTheme;
  }, [settings, version]);

  if (loading || !settings) {
    return null;
  }

  return (
    <footer style={{ 
      backgroundColor: theme.secondaryColor,
      color: 'white',
      fontFamily: theme.fontFamily === 'serif' ? 'serif' : 
                 theme.fontFamily === 'mono' ? 'monospace' : 
                 'sans-serif'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Diamond className="h-8 w-8" style={{ color: theme.primaryColor }} />
              <span className="ml-2 text-xl font-bold">{settings.siteName}</span>
            </div>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {settings.metaDescription}
            </p>
            <div className="flex space-x-5">
              {settings.socialMedia.facebook && (
                <a 
                  href={settings.socialMedia.facebook}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {settings.socialMedia.instagram && (
                <a 
                  href={settings.socialMedia.instagram}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {settings.socialMedia.twitter && (
                <a 
                  href={settings.socialMedia.twitter}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
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
                <MapPin className="h-5 w-5" style={{ color: theme.primaryColor }} />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{settings.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: theme.primaryColor }} />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: theme.primaryColor }} />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{settings.contactEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Opening Hours</h3>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>
              <pre className="font-inherit whitespace-pre-line">
                {settings.openingHours}
              </pre>
            </div>
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
