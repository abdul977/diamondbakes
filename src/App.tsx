import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

// Pages
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';

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
    <Categories />
    <Testimonials />
    <Newsletter />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/products/cakes" element={<CakesPage />} />
          <Route path="/products/bread-varieties" element={<BreadPage />} />
          <Route path="/products/meat-and-chicken-pies" element={<PiesPage />} />
          <Route path="/products/small-chops" element={<SmallChopsPage />} />
          <Route path="/products/shawarma" element={<ShawarmaPage />} />
          <Route path="/products/other-pastries" element={<PastriesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
