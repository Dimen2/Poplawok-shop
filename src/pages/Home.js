import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { banners, products, fishTypes, categories } from './mockData';
import { Facebook, Instagram, Youtube, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

// Импорт ваших фотографий (замените на свои имена файлов)
import photo from "./Photos/Chat.png";
import photo2 from "./Photos/Fider.jpg";
import photo3 from "./Photos/Fish.jpg";
import photo4 from "./Photos/Hook.jpg";
import photo5 from "./Photos/Coil.jpg";
import photo6 from "./Photos/Umbrella.jpg";
import photo7 from "./Photos/Wobbler.jpg";
import photo8 from "./Photos/Fider.jpg";  // повторяется, возможно нужно другое фото
import photo9 from "./Photos/Hook.jpg";    // повторяется, возможно нужно другое фото
import photo10 from "./Photos/Umbrella.jpg"; // повторяется
import photo11 from "./Photos/Coil.jpg";     // повторяется
import photo12 from "./Photos/Fider.jpg";    // повторяется
import photo13 from "./Photos/Fish.jpg";     // повторяется
import photo14 from "./Photos/Coil.jpg";     // повторяется
import photo15 from "./Photos/Wobbler.jpg";  // повторяется


function Home() {
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  // Фильтруем продукты
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const hitProducts = products.filter(p => p.isHit).slice(0, 4);
  const discountProducts = products.filter(p => p.discount).slice(0, 4);

  return (
    <div>
      <div className="home-page">
        {/* Герой секция */}
        <div className="page-container">
          <div className="hero-banner">
            <img src={photo} alt="Акция" className="hero-image" />
            <div className="hero-content">
              <div className="hero-text">
                <a
                  href="https://www.youtube.com/@Poplavok_"
                  className="header-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube size={70} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция Новинки */}
      <section className="products-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">Новинки</h2>
            <Link to="/novelty">
              <button className="view-all-btn">
                Всі товари
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="products-grid">
            {newProducts.map((product, index) => {
              const isFav = isFavorite(product.id);
              // Используем разные фото для каждого продукта
              const productImage = [photo2, photo3, photo4, photo5][index] || photo2;
              
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <Link to={`/product/${product.id}`}>
                      <img src={productImage} alt={product.name} className="product-image" />
                    </Link>
                    <div className="product-badges">
                      {product.isNew && <span className="badge badge-new">Новинка</span>}
                      {product.isHit && <span className="badge badge-hit">Хіт</span>}
                    </div>
                    {product.discount && (
                      <span className="badge badge-discount">-{product.discount}%</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className={`favorite-btn ${isFav ? 'active' : ''}`}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{product.price} грн</span>
                      {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} грн</span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="star">
                              {i < Math.floor(product.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="rating-count">({product.reviews})</span>
                      </div>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={16} />
                      {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Секция "Виды рыб" */}
      <section className="fish-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">Злови свій трофей</h2>
            <Link to="/fish-types">
              <button className="view-all-btn">
                Всі види риб
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="fish-grid">
            {fishTypes.map((fish, index) => {
              // Используем разные фото для каждого вида рыб
              const fishImage = [photo6, photo7, photo8, photo9, photo10][index] || photo6;
              
              return (
                <Link key={fish.id} to={`/fish/${fish.slug}`} className="fish-card">
                  <img src={fishImage} alt={fish.name} className="fish-image" />
                  <h3 className="fish-name">{fish.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Секция Знижки */}
      <section className="products-section discounts-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">Знижки</h2>
            <Link to="/discounts">
              <button className="view-all-btn">
                Всі товари
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="products-grid">
            {discountProducts.map((product, index) => {
              const isFav = isFavorite(product.id);
              // Используем разные фото для каждого продукта
              const discountImage = [photo11, photo12, photo13, photo14][index] || photo11;
              
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <Link to={`/product/${product.id}`}>
                      <img src={discountImage} alt={product.name} className="product-image" />
                    </Link>
                    <div className="product-badges">
                      {product.isNew && <span className="badge badge-new">Новинка</span>}
                      {product.isHit && <span className="badge badge-hit">Хіт</span>}
                    </div>
                    {product.discount && (
                      <span className="badge badge-discount">-{product.discount}%</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className={`favorite-btn ${isFav ? 'active' : ''}`}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{product.price} грн</span>
                      {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} грн</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={16} />
                      {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Секция Категории */}
      <section className="categories-section">
        <div className="page-container">
          <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>
            Популярні категорії
          </h2>
          <div className="categories-grid">
            {categories.map((category, index) => {
              // Используем фото15 для категорий
              const categoryImage = photo15;
              
              return (
                <Link key={category.id} to={`/catalog/${category.slug}`} className="category-card">
                  <img src={categoryImage} alt={category.name} className="category-image" />
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Секция Хиты */}
      <section className="products-section hits-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">Хіт продажів</h2>
            <Link to="/hits">
              <button className="view-all-btn">
                Всі товари
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="products-grid">
            {hitProducts.map((product, index) => {
              const isFav = isFavorite(product.id);
              // Используем оставшиеся фото для хитов
              const hitImage = [photo2, photo3, photo4, photo5][index] || photo2;
              
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <Link to={`/product/${product.id}`}>
                      <img src={hitImage} alt={product.name} className="product-image" />
                    </Link>
                    <div className="product-badges">
                      {product.isNew && <span className="badge badge-new">Новинка</span>}
                      {product.isHit && <span className="badge badge-hit">Хіт</span>}
                    </div>
                    {product.discount && (
                      <span className="badge badge-discount">-{product.discount}%</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className={`favorite-btn ${isFav ? 'active' : ''}`}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{product.price} грн</span>
                      {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} грн</span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="star">
                              {i < Math.floor(product.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="rating-count">({product.reviews})</span>
                      </div>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={16} />
                      {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;