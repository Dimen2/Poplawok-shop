import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Minus, Plus, Star, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useCart } from '../context/CartContext';
import { products } from './mockData';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  if (!product) {
    return (
        <div className="product-page">
          <div className="product-container">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold mb-4">Товар не знайдено</h1>
              <Link to="/catalog">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Повернутись до каталогу
                </Button>
              </Link>
            </div>
          </div>
        </div>
    );
  }

  const favorite = isFavorite(product.id);
  const relatedProducts = products.filter(
      p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
      <div className="product-page">
        {/* Хлібні крихти */}
        <div className="breadcrumbs">
          <div className="breadcrumbs-container">
            <div className="breadcrumbs-list">
              <Link to="/">Головна</Link>
              <ChevronRight size={14} className="breadcrumbs-separator" />
              <Link to="/catalog">Каталог</Link>
              <ChevronRight size={14} className="breadcrumbs-separator" />
              <span>{product.name}</span>
            </div>
          </div>
        </div>

        <div className="product-container">
          {/* Основний блок товару */}
          <div className="product-main">
            {/* Фото товару */}
            <div className="product-gallery">
              <Card className="product-image-card">
                <CardContent className="p-0">
                  <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                  />
                </CardContent>
              </Card>

              {/* Бейджі */}
              <div className="product-badges">
                {product.isNew && (
                    <span className="product-badge badge-new">Новинка</span>
                )}
                {product.isHit && (
                    <span className="product-badge badge-hit">Хіт продажів</span>
                )}
                {product.discount && (
                    <span className="product-badge badge-discount">
                  -{product.discount}%
                </span>
                )}
              </div>
            </div>

            {/* Інформація про товар */}
            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>

              {/* Рейтинг */}
              <div className="product-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                      <Star
                          key={i}
                          className={i < Math.floor(product.rating || 4)
                              ? 'star-filled'
                              : 'star-empty'
                          }
                      />
                  ))}
                </div>
                <span className="rating-count">
                ({product.reviews || 0} відгуків)
              </span>
              </div>

              {/* Ціна */}
              <div className="product-price-block">
              <span className="product-current-price">
                {product.price} грн
              </span>
                {product.oldPrice && (
                    <span className="product-old-price">
                  {product.oldPrice} грн
                </span>
                )}
              </div>

              {/* Наявність */}
              <div className="product-stock">
              <span className={`stock-badge ${product.inStock ? 'stock-in' : 'stock-out'}`}>
                {product.inStock ? 'В наявності' : 'Немає в наявності'}
              </span>
              </div>

              {/* Опис */}
              <p className="product-description">{product.description}</p>

              {/* Кнопки дій */}
              <div className="product-actions">
                {/* Лічильник кількості */}
                <div className="quantity-selector">
                  <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Кнопка додавання в кошик */}
                <button
                    onClick={() => addToCart(product, quantity)}
                    className="add-to-cart-btn"
                    disabled={!product.inStock}
                >
                  <ShoppingCart size={20} />
                  Додати в кошик
                </button>

                {/* Кнопка сердечка (обране) */}
                <button
                    onClick={() => toggleFavorite(product)}
                    className={`favorite-btn ${favorite ? 'active' : ''}`}
                    aria-label="Додати в обране"
                >
                  <Heart size={22} className={favorite ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Загальна вартість */}
              <div className="total-price-card">
                <span className="total-price-label">Загальна вартість:</span>
                <span className="total-price-value">
                {product.price * quantity} грн
              </span>
              </div>
            </div>
          </div>

          {/* Таби (Характеристики, Опис, Відгуки) */}
          <div className="product-tabs">
            <div className="tabs-header">
              <button
                  className={`tab-trigger ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
              >
                Характеристики
              </button>
              <button
                  className={`tab-trigger ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
              >
                Опис
              </button>
              <button
                  className={`tab-trigger ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
              >
                Відгуки
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'specs' && (
                  <div className="specs-list">
                    {product.specifications &&
                        Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="spec-item">
                              <span className="spec-label">{key}:</span>
                              <span className="spec-value">{value}</span>
                            </div>
                        ))
                    }
                  </div>
              )}

              {activeTab === 'description' && (
                  <div className="description-text">
                    {product.fullDescription || product.description}
                  </div>
              )}

              {activeTab === 'reviews' && (
                  <div className="reviews-empty">
                    Відгуків поки немає. Будьте першим!
                  </div>
              )}
            </div>
          </div>

          {/* Схожі товари */}
          {relatedProducts.length > 0 && (
              <div className="related-products">
                <h2 className="related-title">Схожі товари</h2>
                <div className="products-grid">
                  {relatedProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default ProductDetail;