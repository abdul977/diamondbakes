import React, { useState, useEffect, useRef } from 'react';
import { Settings, settingsService } from '../../services/settingsService';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';
import { storageService } from '../../services/storageService';

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
  siteName: '',
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

const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { refetchSettings } = useTheme();

  // Image upload state
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSettings();
      console.log('Fetched settings:', data);

      // Ensure theme and hero are present
      setSettings({
        ...data,
        theme: data.theme || defaultTheme,
        hero: data.hero || defaultHero
      });
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      toast.error(error.message || 'Error fetching settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log('Submitting settings update:', settings);

      // Ensure theme and hero are included
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

      const updatedSettings = await settingsService.updateSettings(updateData);
      console.log('Settings updated successfully:', updatedSettings);

      await refetchSettings();
      toast.success('Settings updated successfully');
    } catch (error: any) {
      console.error('Error updating settings:', error);
      toast.error(error.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle hero image upload
  const handleHeroImageUpload = async () => {
    if (imageFile) {
      try {
        setSaving(true);
        console.log('Preparing to upload hero image to Supabase Storage');

        // Use our storageService to upload directly to Supabase
        const imageUrl = await storageService.uploadFile(imageFile);

        console.log('Hero image uploaded successfully to Supabase:', imageUrl);

        // Update the settings with the new image URL
        setSettings(prev => ({
          ...prev,
          hero: {
            ...prev.hero,
            imageUrl: imageUrl
          }
        }));

        // Reset upload state
        setImageFile(null);
        setImagePreview('');
        setUploadMode('url');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        toast.success('Hero image uploaded successfully');
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setSaving(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Setting change: ${name} = ${value}`);

    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else if (name.startsWith('theme.')) {
      const themeKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        theme: {
          ...prev.theme,
          [themeKey]: value
        }
      }));

      console.log('Updated theme:', {
        ...settings.theme,
        [themeKey]: value
      });
    } else if (name.startsWith('hero.')) {
      const heroKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          [heroKey]: value
        }
      }));

      console.log('Updated hero:', {
        ...settings.hero,
        [heroKey]: value
      });
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Site Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Theme Settings</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Color</label>
              <input
                type="color"
                name="theme.primaryColor"
                value={settings.theme.primaryColor}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
              <input
                type="color"
                name="theme.secondaryColor"
                value={settings.theme.secondaryColor}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                name="theme.backgroundColor"
                value={settings.theme.backgroundColor}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Family</label>
              <select
                name="theme.fontFamily"
                value={settings.theme.fontFamily}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="serif">Serif</option>
                <option value="sans">Sans-serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hero Section Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="hero.title"
                value={settings.hero.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="hero.description"
                value={settings.hero.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Image</label>
              <div className="mt-1 flex items-center space-x-2">
                <div className="flex-1">
                  <div className="flex space-x-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`px-3 py-1 text-sm rounded-md ${uploadMode === 'url' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-3 py-1 text-sm rounded-md ${uploadMode === 'file' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Upload File
                    </button>
                  </div>

                  {uploadMode === 'url' ? (
                    <input
                      type="url"
                      name="hero.imageUrl"
                      value={settings.hero.imageUrl}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required={uploadMode === 'url'}
                    />
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                          <Upload className="w-5 h-5 mr-2 text-gray-500" />
                          <span className="text-gray-500">Choose file</span>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                        {imageFile && (
                          <span className="text-sm text-gray-500 truncate max-w-[150px]">
                            {imageFile.name}
                          </span>
                        )}
                      </div>

                      {imageFile && (
                        <button
                          type="button"
                          onClick={handleHeroImageUpload}
                          disabled={saving}
                          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                        >
                          {saving ? 'Uploading...' : 'Upload Image'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {(imagePreview || settings.hero.imageUrl) && (
                <div className="mt-3 border rounded-md p-2">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <img
                    src={imagePreview || settings.hero.imageUrl}
                    alt="Hero Preview"
                    className="h-40 object-contain mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
              <input
                type="text"
                name="openingHours"
                value={settings.openingHours}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
          <div>
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="url"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="url"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter</label>
              <input
                type="url"
                name="socialMedia.twitter"
                value={settings.socialMedia.twitter}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
              <input
                type="url"
                name="socialMedia.whatsapp"
                value={settings.socialMedia.whatsapp}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* SEO & Instructions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">SEO & Instructions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                name="metaDescription"
                value={settings.metaDescription}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ordering Instructions</label>
              <textarea
                name="orderingInstructions"
                value={settings.orderingInstructions}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
