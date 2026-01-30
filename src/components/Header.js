import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoImage from './logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItemsCount, favorites } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header>
      {/* Верхняя полоса */}
      <div className="header-top">
        <div className="header-top-content">

          <div className="header-top-left">
            <div className="header-top-item">
              <Phone size={16} />
              <span>0800-303-355</span>
            </div>

            <div className="header-top-item">
              <MapPin size={16} />
              <span>2 магазини</span>
            </div>
          </div>

          <div className="header-top-right">
            <span>🇺🇦</span>
            <span>Доставка по всій Україні</span>
          </div>

        </div>
      </div>

      {/* Основная шапка */}
      <div className="header-main">
        <div className="header-main-content">

          {/* Логотип */}
          <Link to="/" className="logo">
            <div className="logo-image-container">
              <img
                src={logoImage}
                alt="Поплавок логотип"
                className="logo-image"
              />
            </div>
            <div className="logo-text">
              <h1>Поплавок</h1>
              <p>Все для риболовлі</p>
            </div>
          </Link>

          {/* Кнопка меню (мобилка) */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Поиск */}
          <form onSubmit={handleSearch} className="search-container">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Пошук товарів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          {/* Иконки */}
          <div className="header-actions">
            <Link to={user ? "/profile" : "/auth"} className="action-btn">
              <User size={22} />
            </Link>

            <Link to="/favorites" className="action-btn">
              <Heart size={22} />
              {favorites.length > 0 && (
                <span className="badge">{favorites.length}</span>
              )}
            </Link>

            <Link to="/cart" className="action-btn">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="badge cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* Навигация */}
      <nav className="header-nav">
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/catalog" className="nav-link">Каталог товарів</Link>
            <Link to="/novelty" className="nav-link">Новинки</Link>
            <Link to="/discounts" className="nav-link discount">Знижки</Link>
            <Link to="/hits" className="nav-link">Хіт продажів</Link>
            <Link to="/brands" className="nav-link">Бренди</Link>
          </div>
        </div>
      </nav>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
          <Link to="/novelty" onClick={() => setMobileMenuOpen(false)}>Новинки</Link>
          <Link to="/discounts" onClick={() => setMobileMenuOpen(false)}>Знижки</Link>
          <Link to="/hits" onClick={() => setMobileMenuOpen(false)}>Хіти</Link>
          <Link to="/brands" onClick={() => setMobileMenuOpen(false)}>Бренди</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
