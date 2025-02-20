import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost as BlogPostType } from '../types';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const fetchedPost = await blogService.getPostById(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error
        </h1>
        <p className="text-gray-600 mb-8">
          {error}
        </p>
        <Link
          to="/blog"
          className="text-yellow-600 hover:text-yellow-700 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Post not found
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          to="/blog"
          className="text-yellow-600 hover:text-yellow-700 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Back button */}
      <Link
        to="/blog"
        className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8"
      >
        <span>← Back to Blog</span>
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
      </header>

      {/* Featured image */}
      <div className="aspect-video mb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph.trim()}
            </p>
          )
        ))}
      </div>

      {/* Share buttons */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-4">Share this post</h2>
        <div className="flex gap-4">
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Share on Twitter
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Share on Facebook
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
