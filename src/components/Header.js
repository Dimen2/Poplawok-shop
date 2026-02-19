import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Home,
  LayoutGrid,
  MoreHorizontal
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoImage from './logo.png';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { cartItemsCount, favorites } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Логіка фіксації шапки при скролі
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${searchQuery}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  return (
      <>
        {/* Затемнення фону при пошуку */}
        <div
            className={`search-overlay ${isSearchFocused ? 'active' : ''}`}
            onClick={() => setIsSearchFocused(false)}
        />

        <header className={`main-header ${isSticky ? 'sticky' : ''} ${isSearchFocused ? 'header-on-focus' : ''}`}>

          {/* Верхня полоса (приховується на мобілках і при sticky) */}
          <div className={`header-top desktop-only ${isSticky ? 'hidden' : ''}`}>
            <div className="header-top-content">
              <div className="header-top-left">
                <span>+380 68 219 96 33</span>
                <span>2 магазини</span>
              </div>
              <div className="header-top-right">
                <span>Доставка по всій Україні</span>
              </div>
            </div>
          </div>

          {/* Основна шапка: Лого і Пошук */}
          <div className={`header-main ${isSticky ? 'header-main-sticky' : ''}`}>
            <div className="header-main-content">

              {/* Логотип */}
              <Link to="/" className="logo">
                <div className="logo-image-container">
                  <img src={logoImage} alt="логотип" className="logo-image" />
                </div>
                <div className={`logo-text desktop-only ${isSticky ? 'hidden' : ''}`}>
                  <h1>Поплавок</h1>
                </div>
              </Link>

              {/* Навігація в sticky режимі (тепер вона в центрі через CSS) */}
              {isSticky && (
                  <nav className="sticky-nav desktop-only">
                    <NavLink to="/catalog" className="sticky-nav-link">Каталог товарів</NavLink>
                    <NavLink to="/novelty" className="sticky-nav-link">Новинки</NavLink>
                    <NavLink to="/discounts" className="sticky-nav-link">Знижки</NavLink>
                    <NavLink to="/hits" className="sticky-nav-link">Хіт продажів</NavLink>
                    <NavLink to="/brands" className="sticky-nav-link">Бренди</NavLink>
                  </nav>
              )}

              {/* Пошук */}
              <form onSubmit={handleSearch} className="search-container">
                <div className="search-wrapper">
                  <input
                      type="text"
                      placeholder="Пошук товарів..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="search-input"
                      data-testid="search-input"
                  />
                  <Search size={20} className="search-icon" />
                </div>
              </form>

              {/* Іконки дій для ПК */}
              <div className={`header-actions desktop-only ${isSticky ? 'hidden' : ''}`}>
                <Link to="/favorites" className="action-btn" data-testid="favorites-btn">
                  <Heart size={22} />
                  {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
                </Link>
                <Link to="/cart" className="action-btn" data-testid="cart-btn">
                  <ShoppingCart size={22} />
                  {cartItemsCount > 0 && <span className="badge">{cartItemsCount}</span>}
                </Link>
              </div>
            </div>
          </div>

          {/* Навігація для ПК (приховується при sticky) */}
          <nav className={`header-nav desktop-only ${isSticky ? 'hidden' : ''}`}>
            <div className="nav-links">
              <NavLink to="/catalog" className="nav-link" data-testid="nav-catalog">Каталог товарів</NavLink>
              <NavLink to="/novelty" className="nav-link" data-testid="nav-novelty">Новинки</NavLink>
              <NavLink to="/discounts" className="nav-link" data-testid="nav-discounts">Знижки</NavLink>
              <NavLink to="/hits" className="nav-link" data-testid="nav-hits">Хіт продажів</NavLink>
              <NavLink to="/brands" className="nav-link" data-testid="nav-brands">Бренди</NavLink>
            </div>
          </nav>
        </header>

        {/* НИЖНЯ ПАНЕЛЬ ДЛЯ МОБІЛЬНИХ */}
        <div className="mobile-bottom-nav">
          <NavLink to="/" className="mobile-nav-item" data-testid="mobile-nav-home">
            <Home size={24} />
            <span>Головна</span>
          </NavLink>
          <NavLink to="/catalog" className="mobile-nav-item" data-testid="mobile-nav-catalog">
            <LayoutGrid size={24} />
            <span>Каталог</span>
          </NavLink>
          <NavLink to="/cart" className="mobile-nav-item" data-testid="mobile-nav-cart">
            <div className="icon-with-badge">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && <span className="m-badge">{cartItemsCount}</span>}
            </div>
            <span>Кошик</span>
          </NavLink>
          <NavLink to={user ? "/profile" : "/auth"} className="mobile-nav-item" data-testid="mobile-nav-profile">
            <User size={24} />
            <span>Кабінет</span>
          </NavLink>
          <div className="mobile-nav-item" data-testid="mobile-nav-more">
            <MoreHorizontal size={24} />
            <span>Більше</span>
          </div>
        </div>
      </>
  );
};

export default Header;