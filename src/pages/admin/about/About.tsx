import React, { useEffect, useState, useRef } from 'react';
import { Users, Clock, Award, Heart, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  getAboutContent,
  updateAboutContent,
  type About,
  type AboutInput,
  type AboutFeature,
  type AboutStoryImage
} from '../../../services/aboutService';
import { storageService } from '../../../services/storageService';

const AdminAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Image upload state
  const [imageUploadIndex, setImageUploadIndex] = useState<number | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && imageUploadIndex !== null) {
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (imageFile && imageUploadIndex !== null) {
      try {
        setSaving(true);
        console.log('Preparing to upload about image to Supabase Storage');

        // Use our storageService to upload directly to Supabase
        const imageUrl = await storageService.uploadFile(imageFile);

        console.log('About image uploaded successfully to Supabase:', imageUrl);

        // Update the form data with the new image URL
        const newImages = [...formData.story.images];
        newImages[imageUploadIndex] = {
          ...newImages[imageUploadIndex],
          url: imageUrl
        };

        setFormData({
          ...formData,
          story: { ...formData.story, images: newImages }
        });

        // Reset upload state
        setImageUploadIndex(null);
        setImageFile(null);
        setImagePreview('');
        setUploadMode('url');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateAboutContent(formData);
      toast.success('About content updated successfully');
    } catch (error) {
      console.error('Error updating about content:', error);
      toast.error('Failed to update about content');
    } finally {
      setSaving(false);
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
              <div key={index} className="space-y-2 border p-4 rounded">
                <label className="block text-sm font-medium">Image {index + 1}</label>

                <div className="flex space-x-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMode('url');
                      setImageUploadIndex(index);
                    }}
                    className={`px-3 py-1 text-sm rounded-md ${imageUploadIndex === index && uploadMode === 'url' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMode('file');
                      setImageUploadIndex(index);
                      setImagePreview('');
                      setImageFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className={`px-3 py-1 text-sm rounded-md ${imageUploadIndex === index && uploadMode === 'file' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Upload File
                  </button>
                </div>

                {imageUploadIndex === index ? (
                  uploadMode === 'url' ? (
                    <div>
                      <input
                        type="url"
                        value={image.url}
                        onChange={(e) => handleStoryImageChange(index, 'url', e.target.value)}
                        placeholder="Image URL"
                        className="w-full p-2 border rounded mb-2"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="flex-1 flex items-center justify-center px-4 py-2 border rounded cursor-pointer hover:bg-gray-50">
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
                          onClick={handleImageUpload}
                          disabled={saving}
                          className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                        >
                          {saving ? 'Uploading...' : 'Upload Image'}
                        </button>
                      )}

                      {imagePreview && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-40 object-contain mx-auto border rounded p-1"
                          />
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <div>
                    <input
                      type="url"
                      value={image.url}
                      onChange={(e) => handleStoryImageChange(index, 'url', e.target.value)}
                      placeholder="Image URL"
                      className="w-full p-2 border rounded mb-2"
                      required
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleStoryImageChange(index, 'alt', e.target.value)}
                  placeholder="Image description"
                  className="w-full p-2 border rounded"
                  required
                />

                {image.url && imageUploadIndex !== index && (
                  <div className="mt-2 border rounded p-1">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-40 object-contain mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
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
