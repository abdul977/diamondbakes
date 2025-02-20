import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { title, excerpt, date, image, tags } = post;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/blog/${post.id}`}>
        <div className="relative h-48">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-yellow-600">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="text-yellow-600 hover:text-yellow-700">Read more →</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
