import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  ShoppingBag,
  FileText,
  Tag
} from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { admin } = useAuth();

  // These would normally be fetched from an API
  const stats = [
    {
      title: 'Total Products',
      value: '24',
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Categories',
      value: '8',
      icon: <Tag className="h-6 w-6 text-white" />,
      color: 'bg-green-500'
    },
    {
      title: 'Blog Posts',
      value: '12',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Tags',
      value: '32',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {admin?.username}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <p className="text-gray-500 text-sm">
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="p-4 bg-white rounded-lg shadow text-left hover:bg-gray-50"
            onClick={() => {/* Navigate to add product */}}
          >
            <ShoppingBag className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Add New Product</h3>
            <p className="text-sm text-gray-500 mt-1">
              Create a new product listing
            </p>
          </button>

          <button
            className="p-4 bg-white rounded-lg shadow text-left hover:bg-gray-50"
            onClick={() => {/* Navigate to create post */}}
          >
            <FileText className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Create Blog Post</h3>
            <p className="text-sm text-gray-500 mt-1">
              Write a new blog article
            </p>
          </button>

          <button
            className="p-4 bg-white rounded-lg shadow text-left hover:bg-gray-50"
            onClick={() => {/* Navigate to manage tags */}}
          >
            <Tag className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Manage Tags</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add or edit content tags
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;