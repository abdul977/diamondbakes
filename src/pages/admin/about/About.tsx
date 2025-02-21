import React, { useEffect, useState } from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  getAboutContent,
  updateAboutContent,
  type About,
  type AboutInput,
  type AboutFeature,
  type AboutStoryImage
} from '../../../services/aboutService';

const AdminAbout = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AboutInput>({
    heading: '',
    introduction: '',
    features: [],
    story: {
      title: '',
      content: ['', '', ''],
      images: [
        { url: '', alt: '' },
        { url: '', alt: '' }
      ]
    },
    commitment: {
      title: '',
      content: ''
    }
  });

  const iconComponents = {
    Users: <Users className="h-6 w-6 text-yellow-500" />,
    Clock: <Clock className="h-6 w-6 text-yellow-500" />,
    Award: <Award className="h-6 w-6 text-yellow-500" />,
    Heart: <Heart className="h-6 w-6 text-yellow-500" />
  };

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      const data = await getAboutContent();
      setFormData({
        heading: data.heading,
        introduction: data.introduction,
        features: data.features,
        story: data.story,
        commitment: data.commitment
      });
    } catch (error) {
      console.error('Error loading about content:', error);
      toast.error('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureChange = (index: number, field: keyof AboutFeature, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const handleStoryContentChange = (index: number, value: string) => {
    const newContent = [...formData.story.content];
    newContent[index] = value;
    setFormData({
      ...formData,
      story: { ...formData.story, content: newContent }
    });
  };

  const handleStoryImageChange = (index: number, field: keyof AboutStoryImage, value: string) => {
    const newImages = [...formData.story.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData({
      ...formData,
      story: { ...formData.story, images: newImages }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAboutContent(formData);
      toast.success('About content updated successfully');
    } catch (error) {
      console.error('Error updating about content:', error);
      toast.error('Failed to update about content');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Manage About Content</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold mb-4">Header Section</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Introduction</label>
            <textarea
              value={formData.introduction}
              onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid gap-6">
            {formData.features.map((feature, index) => (
              <div key={index} className="p-4 border rounded space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <select
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', e.target.value as any)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    {Object.keys(iconComponents).map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={2}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.story.title}
              onChange={(e) => setFormData({
                ...formData,
                story: { ...formData.story, title: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {formData.story.content.map((paragraph, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">Paragraph {index + 1}</label>
              <textarea
                value={paragraph}
                onChange={(e) => handleStoryContentChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.story.images.map((image, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium">Image {index + 1}</label>
                <input
                  type="url"
                  value={image.url}
                  onChange={(e) => handleStoryImageChange(index, 'url', e.target.value)}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleStoryImageChange(index, 'alt', e.target.value)}
                  placeholder="Image description"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.commitment.title}
              onChange={(e) => setFormData({
                ...formData,
                commitment: { ...formData.commitment, title: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={formData.commitment.content}
              onChange={(e) => setFormData({
                ...formData,
                commitment: { ...formData.commitment, content: e.target.value }
              })}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAbout;
