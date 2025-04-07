import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Upload } from 'lucide-react';
import { menuService } from '../../../services/menuService';
import { toast } from 'react-hot-toast';
import { storageService } from '../../../services/storageService';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    link: ''
  });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await menuService.getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Clear the URL input since we're using a file
      setFormData({ ...formData, image: '' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle image upload if a file is selected
      let imageUrl = formData.image;
      if (uploadMode === 'file' && imageFile) {
        try {
          console.log('Preparing to upload category image to Supabase Storage');

          // Use our storageService to upload directly to Supabase
          imageUrl = await storageService.uploadFile(imageFile);

          console.log('Category image uploaded successfully to Supabase:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload error:', uploadErr);
          toast.error('Image upload failed: ' + (uploadErr instanceof Error ? uploadErr.message : 'Unknown error'));
          throw new Error('Image upload failed');
        }
      }

      // Create or update category with the image URL
      const categoryData = {
        ...formData,
        image: imageUrl
      };

      if (editingCategory) {
        await menuService.updateCategory(editingCategory.id, categoryData);
        toast.success('Category updated successfully');
      } else {
        await menuService.addCategory(categoryData);
        toast.success('Category added successfully');
      }
      fetchCategories();
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Error saving category');
    }
  };

  // Handle category deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await menuService.deleteCategory(id);
        fetchCategories();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      link: ''
    });
    setEditingCategory(null);
    setUploadMode('url');
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Categories List */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setFormData({
                      name: category.name,
                      description: category.description,
                      image: category.image,
                      link: category.link
                    });
                    setShowModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
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
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Enter image URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        required={uploadMode === 'url'}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <Upload className="w-5 h-5 mr-2 text-gray-500" />
                          <span className="text-gray-500">Choose file</span>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            required={uploadMode === 'file' && !imageFile}
                          />
                        </label>
                        {imageFile && (
                          <span className="text-sm text-gray-500 truncate max-w-[150px]">
                            {imageFile.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {(imagePreview || (uploadMode === 'url' && formData.image)) && (
                  <div className="mt-3 border rounded-lg p-2">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img
                      src={imagePreview || formData.image}
                      alt="Preview"
                      className="h-40 object-contain mx-auto"
                      onError={() => setImagePreview('')}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;