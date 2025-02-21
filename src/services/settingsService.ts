import apiClient from '../utils/apiClient';

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
}

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

interface Hero {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Settings {
  theme: Theme;
  hero: Hero;
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  openingHours: string;
  socialMedia: SocialMedia;
  metaDescription: string;
  orderingInstructions: string;
}

const defaultTheme: Theme = {
  primaryColor: '#FCD34D',
  secondaryColor: '#111827',
  fontFamily: 'serif',
  backgroundColor: '#F9FAFB'
};

const defaultHero: Hero = {
  title: 'Diamond Elite Bites\nA Heavenly Bites',
  description: 'Turning your fantasy into reality with celebration cakes, budget cakes, banana & coconut bread, and all types of cakes. We also offer food trays and pastries ready to travel!',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
};

export const settingsService = {
  // Get settings
  async getSettings(): Promise<Settings> {
    try {
      console.log('Fetching settings...');
      const response = await apiClient.get('/settings');
      const data = response.data;

      // Log the raw response
      console.log('Raw settings response:', data);

      // Return complete settings with defaults if needed
      return {
        ...data,
        theme: data.theme || defaultTheme,
        hero: data.hero || defaultHero
      };
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  // Update settings
  async updateSettings(settings: Settings): Promise<Settings> {
    try {
      // Log the update request
      console.log('Updating settings:', {
        theme: settings.theme,
        hero: settings.hero
      });

      // Ensure defaults are included
      const updateData = {
        ...settings,
        theme: {
          ...defaultTheme,
          ...settings.theme
        },
        hero: {
          ...defaultHero,
          ...settings.hero
        }
      };

      const response = await apiClient.put('/settings', updateData);
      const updatedSettings = response.data;

      // Log the response
      console.log('Settings update response:', updatedSettings);

      // Ensure theme and hero are included in response
      return {
        ...updatedSettings,
        theme: updatedSettings.theme || defaultTheme,
        hero: updatedSettings.hero || defaultHero
      };
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
