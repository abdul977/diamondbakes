import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/menu/Categories';
import Products from './pages/admin/menu/Products';
import BlogPosts from './pages/admin/blog/Posts';
import Settings from './pages/admin/Settings';
import AdminGallery from './pages/admin/gallery/Gallery';
import AdminTestimonials from './pages/admin/testimonials/Testimonials';
import AdminAbout from './pages/admin/about/About';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MenuCategories from './components/Categories';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

// Pages
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

import ProductsPage from './pages/Products';

const HomePage = () => (
  <>
    <Hero />
    <MenuCategories />
    <Testimonials />
    <Newsletter />
  </>
);

const PublicLayout = () => {
  const { settings, loading } = useTheme();

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const theme = settings.theme || {
    backgroundColor: '#F9FAFB',
    fontFamily: 'sans',
    secondaryColor: '#111827'
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily === 'serif' ? 'serif' :
                   theme.fontFamily === 'mono' ? 'monospace' :
                   'sans-serif',
        color: theme.secondaryColor
      }}
    >
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#059669',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#dc2626',
                },
              },
            }}
          />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<Navigate to="/admin/menu/categories" replace />} />
              <Route path="menu/categories" element={<Categories />} />
              <Route path="menu/products" element={<Products />} />
              <Route path="blog" element={<Navigate to="/admin/blog/posts" replace />} />
              <Route path="blog/posts" element={<BlogPosts />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<Menu />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="menu/:categoryName" element={<ProductsPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
