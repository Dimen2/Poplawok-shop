import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites';
import { ToastProvider } from './hooks/use-toast';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/:category" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/favorites" element={<Favorites />} />
                  {/* Додаткові маршрути */}
                  <Route path="/novelty" element={<Catalog />} />
                  <Route path="/discounts" element={<Catalog />} />
                  <Route path="/hits" element={<Catalog />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;