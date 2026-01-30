import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './Favorites.css'

const Favorites = () => {
  const { favorites } = useCart();

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;