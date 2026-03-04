import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';
import './Cart.css';

const Cart = () => {
  const cartContext = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!cartContext) {
    return (
        <div className="cart-page">
          <div className="cart-container">
            <Card className="empty-cart-card">
              <CardContent className="empty-cart-content">
                <p>Завантаження...</p>
              </CardContent>
            </Card>
          </div>
        </div>
    );
  }

  const {
    cartItems = [],
    updateQuantity,
    removeFromCart,
    cartTotal = 0,
    cartItemsCount = 0
  } = cartContext;

  // 🔥 Функция перехода на оформление
  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Потрібна авторизація",
        description: "Щоб оформити замовлення, увійдіть у свій акаунт"
      });
      navigate('/auth');
    } else {
      navigate('/checkout');
    }
  };

  // Якщо кошик порожній
  if (!cartItems || cartItems.length === 0) {
    return (
        <div className="cart-page">
          <div className="cart-container">
            <Card className="empty-cart-card">
              <CardContent className="empty-cart-content">
                <ShoppingCart className="empty-cart-icon" />
                <h2 className="empty-cart-title">Кошик порожній</h2>
                <p className="empty-cart-text">
                  Додайте товари до кошика, щоб зробити замовлення
                </p>
                <Link to="/catalog">
                  <Button className="empty-cart-button">
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
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Кошик</h1>

          <div className="cart-content">
            {/* Ліва частина */}
            <div className="cart-items">
              {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Link to={`/product/${item.id}`} className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </Link>

                    <div className="cart-item-info">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <div className="cart-item-price">
                        {item.price} грн за штуку
                      </div>
                    </div>

                    <div className="cart-item-quantity">
                      <button
                          className="quantity-btn"
                          onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                          }
                      >
                        <Minus size={14} />
                      </button>

                      <span className="quantity-value">
                    {item.quantity}
                  </span>

                      <button
                          className="quantity-btn"
                          onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                          }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-total">
                      {item.price * item.quantity} грн
                    </div>

                    <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
              ))}
            </div>

            {/* Права частина */}
            <div className="cart-order">
              <h2 className="order-title">Замовлення</h2>

              <div className="order-row">
                <span>Товарів:</span>
                <span>{cartItemsCount}</span>
              </div>

              <div className="order-row">
                <span>Сума:</span>
                <span>{cartTotal} грн</span>
              </div>

              <div className="order-row">
                <span>Доставка:</span>
                <span className="delivery-free">Безкоштовно</span>
              </div>

              <div className="order-total">
                <span>До сплати:</span>
                <span className="total-price">
                {cartTotal} грн
              </span>
              </div>

              {/* 🔥 ВАЖНА КНОПКА */}
              <button
                  className="checkout-btn"
                  onClick={handleCheckout}
              >
                Оформити замовлення
              </button>

              <Link to="/catalog" className="continue-link">
                Продовжити покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;