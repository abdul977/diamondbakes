import React, { useMemo, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { settings, loading, version } = useTheme();
  
  useEffect(() => {
    console.log('Hero rerendering:', {
      version,
      settingsPresent: !!settings,
      hero: settings?.hero,
      theme: settings?.theme
    });
  }, [settings, version]);

  // Use useMemo to recreate theme and hero objects when settings or version changes
  const { theme, hero } = useMemo(() => {
    const defaultTheme = {
      backgroundColor: '#F9FAFB',
      fontFamily: 'sans',
      primaryColor: '#FCD34D',
      secondaryColor: '#111827'
    };

    const defaultHero = {
      title: 'Diamond Elite Bites\nA Heavenly Bites',
      description: 'Turning your fantasy into reality with celebration cakes, budget cakes, banana & coconut bread, and all types of cakes. We also offer food trays and pastries ready to travel!',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
    };

    if (!settings) {
      console.log('Using default theme and hero (no settings)');
      return { theme: defaultTheme, hero: defaultHero };
    }

    const result = {
      theme: settings.theme || defaultTheme,
      hero: settings.hero || defaultHero
    };
    
    console.log('Computed theme and hero:', result);
    return result;
  }, [settings, version]); // Include version in dependencies

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily === 'serif' ? 'serif' : 
                   theme.fontFamily === 'mono' ? 'monospace' : 
                   'sans-serif'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div style={{ color: theme.secondaryColor }}>
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6" 
              style={{ 
                whiteSpace: 'pre-line',
                color: theme.secondaryColor
              }}
            >
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{ opacity: 0.8 }}>
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="px-8 py-3 rounded-lg transition-colors flex items-center justify-center font-medium"
                style={{ 
                  backgroundColor: theme.primaryColor,
                  color: theme.secondaryColor
                }}
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/menu"
                className="px-8 py-3 rounded-lg transition-colors font-medium text-center"
                style={{ 
                  border: `2px solid ${theme.secondaryColor}`,
                  color: theme.secondaryColor
                }}
              >
                Our Menu
              </Link>
            </div>
          </div>
          <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={hero.imageUrl}
              alt="Hero image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
