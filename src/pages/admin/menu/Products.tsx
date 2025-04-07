import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Upload } from 'lucide-react';
import { menuService } from '../../../services/menuService';
import { MenuItem } from '../../../types';
import { toast } from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch products and categories
  const fetchProducts = async () => {
    try {
      // Always fetch all products
      const data = await menuService.getAllProducts();

      // Filter products on the client side if a category is selected
      if (categoryFilter) {
        const filteredData = data.filter(product => product.categoryId === categoryFilter);
        setProducts(filteredData);
      } else {
        setProducts(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await menuService.getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [categoryFilter]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      // Find selected category to get its name
      const selectedCategory = categories.find(c => c.id === formData.category);
      if (!selectedCategory) {
        throw new Error('Please select a valid category');
      }

      // Handle image upload if a file is selected
      let imageUrl = formData.image;
      if (uploadMode === 'file' && imageFile) {
        try {
          // Create FormData for file upload
          const formDataUpload = new FormData();
          formDataUpload.append('image', imageFile);

          // Use the correct API URL for uploads
          // Get the base API URL from environment variables
          const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
          const apiUrl = `${baseApiUrl}/upload`;

          console.log('Uploading image to:', apiUrl);

          // Upload the image with authentication
          // Get token from cookie instead of localStorage
          const cookies = document.cookie.split(';');
          const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
          const token = tokenCookie ? tokenCookie.split('=')[1] : null;

          if (!token) {
            throw new Error('Authentication token not found. Please log in again.');
          }

          const uploadResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formDataUpload,
            credentials: 'include' // Include cookies in the request
          });

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({}));
            console.error('Upload response error:', uploadResponse.status, errorData);

            // Provide more specific error messages based on status code
            if (uploadResponse.status === 401) {
              throw new Error('Authentication failed. Please log in again.');
            } else if (uploadResponse.status === 403) {
              throw new Error('You do not have permission to upload images. Please contact an administrator.');
            } else if (uploadResponse.status === 413) {
              throw new Error('Image file is too large. Please use a smaller image (max 5MB).');
            } else {
              throw new Error(`Failed to upload image: ${errorData.error || uploadResponse.statusText}`);
            }
          }

          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.imageUrl;
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload error:', uploadErr);
          toast.error('Image upload failed: ' + (uploadErr instanceof Error ? uploadErr.message : 'Unknown error'));
          throw new Error('Image upload failed');
        }
      }

      // Create product data with category name
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        category: selectedCategory.name, // Keep this for backward compatibility
        image: imageUrl
      };

      console.log('Submitting product with data:', productData);

      if (editingProduct) {
        await menuService.updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await menuService.addProduct(productData);
        toast.success('Product added successfully');
      }

      await fetchProducts();
      setShowModal(false);
      resetForm();
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error saving product');
      toast.error(err.message || 'Error saving product');
    }
  };

  // Handle product deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await menuService.deleteProduct(id);
        toast.success('Product deleted successfully');
        await fetchProducts();
        setError('');
      } catch (err: any) {
        setError(err.message || 'Error deleting product');
        toast.error(err.message || 'Error deleting product');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: ''
    });
    setEditingProduct(null);
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
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products List */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-purple-600 font-semibold mb-4">₦{product.price}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{product.categoryName}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setFormData({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category: product.categoryId || '',
                        image: product.image
                      });
                      setImagePreview(product.image);
                      setUploadMode('url');
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
              {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>

                {/* Toggle between URL and File upload */}
                <div className="flex space-x-4 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3 py-1 rounded ${
                      uploadMode === 'url'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-3 py-1 rounded ${
                      uploadMode === 'file'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {uploadMode === 'url' ? (
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Enter image URL"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
