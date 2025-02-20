import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  FileText,
  Tag,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive, 
  hasSubmenu, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Link
        to={to}
        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-purple-100 text-purple-900' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => hasSubmenu && setIsOpen(!isOpen)}
      >
        <span className="p-2">{icon}</span>
        <span className="flex-grow">{label}</span>
        {hasSubmenu && (
          <ChevronDown 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            size={20} 
          />
        )}
      </Link>
      {hasSubmenu && isOpen && (
        <div className="ml-8 mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold text-purple-600">
            Diamond Bakes Admin
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem
            to="/admin/dashboard"
            icon={<Home size={20} />}
            label="Dashboard"
            isActive={isActive('/admin/dashboard')}
          />

          <NavItem
            to="/admin/menu"
            icon={<ShoppingBag size={20} />}
            label="Menu Management"
            isActive={isActive('/admin/menu')}
            hasSubmenu
          >
            <Link
              to="/admin/menu/categories"
              className="block p-2 text-sm text-gray-600 hover:text-purple-600"
            >
              Categories
            </Link>
            <Link
              to="/admin/menu/products"
              className="block p-2 text-sm text-gray-600 hover:text-purple-600"
            >
              Products
            </Link>
          </NavItem>

          <NavItem
            to="/admin/blog"
            icon={<FileText size={20} />}
            label="Blog Management"
            isActive={isActive('/admin/blog')}
            hasSubmenu
          >
            <Link
              to="/admin/blog/posts"
              className="block p-2 text-sm text-gray-600 hover:text-purple-600"
            >
              Posts
            </Link>
            <Link
              to="/admin/blog/categories"
              className="block p-2 text-sm text-gray-600 hover:text-purple-600"
            >
              Categories
            </Link>
          </NavItem>

          <NavItem
            to="/admin/tags"
            icon={<Tag size={20} />}
            label="Tags"
            isActive={isActive('/admin/tags')}
          />

          <NavItem
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
            isActive={isActive('/admin/settings')}
          />
        </nav>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, {admin?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;