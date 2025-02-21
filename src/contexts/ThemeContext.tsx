import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, settingsService } from '../services/settingsService';

interface ThemeContextType {
  settings: Settings | null;
  loading: boolean;
  refetchSettings: () => Promise<void>;
  version: number;
}

const defaultTheme = {
  primaryColor: '#FCD34D',
  secondaryColor: '#111827',
  fontFamily: 'serif',
  backgroundColor: '#F9FAFB'
};

const defaultHero = {
  title: 'Diamond Elite Bites\nA Heavenly Bites',
  description: 'Turning your fantasy into reality with celebration cakes, budget cakes, banana & coconut bread, and all types of cakes. We also offer food trays and pastries ready to travel!',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
};

const defaultSettings: Settings = {
  theme: defaultTheme,
  hero: defaultHero,
  siteName: 'Diamond Elite Bites',
  contactEmail: '',
  contactPhone: '',
  address: '',
  openingHours: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
    whatsapp: ''
  },
  metaDescription: '',
  orderingInstructions: ''
};

const ThemeContext = createContext<ThemeContextType>({
  settings: defaultSettings,
  loading: true,
  refetchSettings: async () => {},
  version: 0
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      console.log('ThemeContext: Fetching settings...');
      const data = await settingsService.getSettings();
      
      // Ensure theme and hero exist
      const completeSettings = {
        ...data,
        theme: data.theme || defaultTheme,
        hero: data.hero || defaultHero
      };

      console.log('ThemeContext: Settings fetched:', completeSettings);
      setSettings(completeSettings);
      setVersion(v => v + 1);
    } catch (error) {
      console.error('ThemeContext: Error fetching settings:', error);
      // Use defaults if fetch fails
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Log when settings change
  useEffect(() => {
    console.log('ThemeContext: Settings updated:', settings);
    console.log('ThemeContext: Version:', version);
  }, [settings, version]);

  return (
    <ThemeContext.Provider 
      value={{ 
        settings: settings || defaultSettings,
        loading,
        refetchSettings: fetchSettings,
        version
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
