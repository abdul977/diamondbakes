import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Upload } from 'lucide-react';
import { blogService } from '../../../services/blogService';
import { BlogPost } from '../../../types';
import { toast } from 'react-hot-toast';
import { storageService } from '../../../services/storageService';

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    image: '',
    tags: [] as string[]
  });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch blog posts
  const fetchPosts = async () => {
    try {
      const data = await blogService.getAllPosts();
      setPosts(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
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
          console.log('Preparing to upload blog post image to Supabase Storage');

          // Use our storageService to upload directly to Supabase
          imageUrl = await storageService.uploadFile(imageFile);

          console.log('Blog post image uploaded successfully to Supabase:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload error:', uploadErr);
          toast.error('Image upload failed: ' + (uploadErr instanceof Error ? uploadErr.message : 'Unknown error'));
          throw new Error('Image upload failed');
        }
      }

      // Create or update blog post with the image URL
      const postData = {
        ...formData,
        image: imageUrl
      };

      if (editingPost) {
        await blogService.updatePost(editingPost.id, postData);
        toast.success('Blog post updated successfully');
      } else {
        await blogService.createPost(postData);
        toast.success('Blog post created successfully');
      }
      await fetchPosts();
      setShowModal(false);
      resetForm();
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error saving blog post');
      toast.error(err.message || 'Error saving blog post');
    }
  };

  // Handle post deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deletePost(id);
        toast.success('Blog post deleted successfully');
        await fetchPosts();
        setError('');
      } catch (err: any) {
        setError(err.message || 'Error deleting blog post');
        toast.error(err.message || 'Error deleting blog post');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      image: '',
      tags: []
    });
    setEditingPost(null);
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
        <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Blog Posts List */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
            >
              <div className="flex gap-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.author} | {new Date(post.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setFormData({
                            title: post.title,
                            excerpt: post.excerpt,
                            content: post.content,
                            author: post.author,
                            image: post.image,
                            tags: post.tags
                          });
                          setShowModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                  rows={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
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
                <label className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="tag1, tag2, tag3"
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
                  {editingPost ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;