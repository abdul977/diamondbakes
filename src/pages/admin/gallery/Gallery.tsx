import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Image, Upload } from 'lucide-react';
import { galleryService, GalleryItem } from '../../../services/galleryService';
import { toast } from 'react-hot-toast';
import { storageService } from '../../../services/storageService';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: ''
  });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch gallery items
  const fetchItems = async () => {
    try {
      const data = await galleryService.getAllItems();
      setItems(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
          console.log('Preparing to upload gallery image to Supabase Storage');

          // Use our storageService to upload directly to Supabase
          imageUrl = await storageService.uploadFile(imageFile);

          console.log('Gallery image uploaded successfully to Supabase:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload error:', uploadErr);
          toast.error('Image upload failed: ' + (uploadErr instanceof Error ? uploadErr.message : 'Unknown error'));
          throw new Error('Image upload failed');
        }
      }

      // Create or update gallery item with the image URL
      const itemData = {
        ...formData,
        image: imageUrl
      };

      if (editingItem) {
        await galleryService.updateItem(editingItem.id, itemData);
        toast.success('Gallery item updated successfully');
      } else {
        await galleryService.createItem(itemData);
        toast.success('Gallery item created successfully');
      }
      await fetchItems();
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Handle item deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await galleryService.deleteItem(id);
        toast.success('Gallery item deleted successfully');
        await fetchItems();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      category: ''
    });
    setEditingItem(null);
    setUploadMode('url');
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search gallery items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No gallery items found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setFormData({
                          title: item.title,
                          description: item.description || '',
                          image: item.image,
                          category: item.category || ''
                        });
                        setShowModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
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
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Enter image URL"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required={uploadMode === 'url'}
                    />
                    {formData.image && (
                      <div className="w-12 h-12 border rounded-lg overflow-hidden">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
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

                {/* Image Preview for file upload */}
                {imagePreview && uploadMode === 'file' && (
                  <div className="mt-3 border rounded-lg p-2">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 object-contain mx-auto"
                      onError={() => setImagePreview('')}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select a category</option>
                  <option value="cakes">Cakes</option>
                  <option value="bread">Bread</option>
                  <option value="pies">Pies</option>
                  <option value="smallChops">Small Chops</option>
                  <option value="shawarma">Shawarma</option>
                  <option value="pastries">Pastries</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
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
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
