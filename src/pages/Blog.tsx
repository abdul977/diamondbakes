import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await blogService.getAllPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get unique tags from all blog posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover baking tips, recipe insights, and behind-the-scenes stories from Diamond Elite Bites.
        </p>
      </div>

      {/* Tags filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${!selectedTag 
                ? 'bg-yellow-400 text-gray-900' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedTag === tag
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {!selectedTag && posts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
          <div className="max-w-4xl mx-auto">
            <BlogCard post={posts[0]} />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedTag ? filteredPosts : posts.slice(1)).map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No posts found for the selected tag.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
