import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/menu/Categories';
import Products from './pages/admin/menu/Products';

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

// Product Pages
import CakesPage from './pages/products/cakes';
import BreadPage from './pages/products/bread';
import PiesPage from './pages/products/pies';
import SmallChopsPage from './pages/products/small-chops';
import ShawarmaPage from './pages/products/shawarma';
import PastriesPage from './pages/products/pastries';

const HomePage = () => (
  <>
    <Hero />
    <MenuCategories />
    <Testimonials />
    <Newsletter />
  </>
);

const PublicLayout = () => (
  <div className="min-h-screen bg-white">
    <Navigation />
    <main className="pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
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
            <Route path="blog" element={<Navigate to="/admin/dashboard" replace />} />
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
            <Route path="products/cakes" element={<CakesPage />} />
            <Route path="products/bread-varieties" element={<BreadPage />} />
            <Route path="products/meat-and-chicken-pies" element={<PiesPage />} />
            <Route path="products/small-chops" element={<SmallChopsPage />} />
            <Route path="products/shawarma" element={<ShawarmaPage />} />
            <Route path="products/other-pastries" element={<PastriesPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
