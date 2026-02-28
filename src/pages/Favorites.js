import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import './Favorites.css'; // Додайте цей імпорт

const Favorites = () => {
  const { favorites, addToCart, toggleFavorite, isFavorite } = useCart();

  if (favorites.length === 0) {
    return (
        <div className="favorites-empty-page">
          <div className="favorites-empty-container">
            <Card className="empty-favorites-card">
              <CardContent className="empty-favorites-content">
                <Heart className="empty-favorites-icon" />
                <h2 className="empty-favorites-title">Список обраного порожній</h2>
                <p className="empty-favorites-text">Додайте товари в обране, щоб не згубити їх</p>
                <Link to="/catalog">
                  <Button className="empty-favorites-button">
                    Перейти до каталогу
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
    );
  }

  return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="favorites-header">
            <Heart className="favorites-heart-icon" />
            <h1 className="favorites-title">Обране</h1>
            <span className="favorites-count">({favorites.length})</span>
          </div>
          <div className="favorites-grid">
            {favorites.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <Link to={`/product/${product.id}`}>
                      <img
                          src={product.image || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="product-image"
                      />
                    </Link>
                    {product.isNew && (
                        <div className="product-badges">
                          <span className="badge badge-new">Новинка</span>
                        </div>
                    )}
                    <button
                        className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product)}
                    >
                      <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{product.price} грн</span>
                    </div>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                    >
                      <ShoppingCart size={16} />
                      <span>{product.inStock ? 'Додати в кошик' : 'Немає'}</span>
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Favorites;