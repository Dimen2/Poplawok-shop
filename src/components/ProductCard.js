import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(product.id);

  return (
    <div className="product-card">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
          />
        </Link>
        
        <div className="product-badges">
          {product.isNew && (
            <span className="badge badge-new">Новинка</span>
          )}
          {product.isHit && (
            <span className="badge badge-hit">Хіт</span>
          )}
        </div>
        
        {product.discount && (
          <span className="badge badge-discount">-{product.discount}%</span>
        )}

        <button
          onClick={() => toggleFavorite(product)}
          className={`fav-btn ${favorite ? 'active' : ''}`}
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="product-content">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-price">
          <span className="price-current">{product.price} грн</span>
          {product.oldPrice && (
            <span className="price-old">{product.oldPrice} грн</span>
          )}
        </div>

        {product.rating && (
          <div className="rating">
            <div className="flex">
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
};

export default ProductCard;