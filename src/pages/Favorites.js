import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react'; // Додав іконки
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';


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
                /* Малюємо картку прямо тут, щоб не шукати ProductCard */
                <div key={product.id} className="product-card-custom">
                  <div className="image-wrapper">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="product-img" />
                    </Link>
                    {product.isNew && <div className="badge-new">Новинка</div>}
                    <button
                        className="fav-overlay-btn is-fav"
                        onClick={() => toggleFavorite(product)}
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>

                  <div className="product-details">
                    <h3 className="product-title">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="price-tag">{product.price} грн</div>
                    <button
                        className="buy-btn"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                    >
                      <ShoppingCart size={18} />
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