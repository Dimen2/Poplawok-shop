import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Percent, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Checkout.css';

const Checkout = () => {
  const { cartItems = [], cartTotal = 0, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: '',
    address: '',
    paymentMethod: 'card',
    deliveryMethod: 'novaposhta',
    comment: ''
  });

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryPrice] = useState(0); // Безкоштовна доставка

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    // Тут логіка перевірки промокоду
    if (promoCode === 'DISCOUNT10') {
      setDiscount(cartTotal * 0.1);
      toast({ title: 'Промокод застосовано!', description: 'Знижка 10%' });
    } else {
      toast({ title: 'Помилка', description: 'Невірний промокод' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "orders"), {
        userId: user?.uid || null,
        customer: formData,
        items: cartItems,
        total: cartTotal - discount,
        status: "new",
        createdAt: serverTimestamp()
      });

      toast({
        title: 'Замовлення оформлено!',
        description: 'Замовлення успішно збережено.'
      });

      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
      toast({
        title: "Помилка",
        description: "Не вдалося зберегти замовлення"
      });
    }
  };

  const finalTotal = cartTotal - discount;

  return (
      <div className="checkout-page">
        <div className="checkout-container">
          <h1 className="checkout-title">Оформлення замовлення</h1>

          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              {/* Ліва колонка */}
              <div className="checkout-main">
                {/* Контактна інформація */}
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <User size={20} />
                    <h2>Контактні дані</h2>
                    <span className="contact-edit">Редагувати</span>
                  </div>
                  <div className="checkout-card-content">
                    <div className="contact-info">
                      <div className="contact-info-row">
                        <span className="contact-info-label">Прізвище та ім'я</span>
                        <span className="contact-info-value">{formData.name || 'Іваненко Іван'}</span>
                      </div>
                      <div className="contact-info-row">
                        <span className="contact-info-label">Телефон *</span>
                        <span className="contact-info-value">{formData.phone || '+380501234567'}</span>
                      </div>
                      <div className="contact-info-row">
                        <span className="contact-info-label">Email *</span>
                        <span className="contact-info-value">{formData.email || 'email@example.com'}</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Прізвище та ім'я</label>
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Іваненко Іван"
                          required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Телефон <span>*</span></label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="+380501234567"
                            required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email <span>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="email@example.com"
                            required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Доставка */}
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <MapPin size={20} />
                    <h2>Доставка</h2>
                  </div>
                  <div className="checkout-card-content">
                    <div className="form-group">
                      <label className="form-label">Спосіб доставки</label>
                      <div className="radio-group">
                        <label className={`radio-option ${formData.deliveryMethod === 'novaposhta' ? 'selected' : ''}`}>
                          <input
                              type="radio"
                              name="deliveryMethod"
                              value="novaposhta"
                              checked={formData.deliveryMethod === 'novaposhta'}
                              onChange={handleChange}
                          />
                          <div>
                            <div style={{ fontWeight: 500 }}>Нова Пошта</div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>Доставка у відділення</div>
                          </div>
                        </label>

                        <label className={`radio-option ${formData.deliveryMethod === 'courier' ? 'selected' : ''}`}>
                          <input
                              type="radio"
                              name="deliveryMethod"
                              value="courier"
                              checked={formData.deliveryMethod === 'courier'}
                              onChange={handleChange}
                          />
                          <div>
                            <div style={{ fontWeight: 500 }}>Укр Пошта</div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>Доставка за адресою</div>
                          </div>
                        </label>

                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Місто <span>*</span></label>
                      <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Київ"
                          required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Адреса / Відділення <span>*</span></label>
                      <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="вул. Хрещатик, 1 або Відділення №21"
                          required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Права колонка - замовлення */}
              <div className="checkout-sidebar">
                <div className="order-card">
                  <div className="order-header">
                    <h3>Ваше замовлення</h3>
                  </div>
                  <div className="order-content">
                    <div className="order-items">
                      {cartItems.map(item => (
                          <div key={item.id} className="order-item">
                            <div className="order-item-image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="order-item-info">

                              <div className="order-item-name">{item.name}</div>
                              <div className="order-item-meta">
                                <span className="order-item-quantity">Кількість: {item.quantity} шт</span>
                                <span className="order-item-price">{item.price * item.quantity} грн</span>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>

                    {/* Промокод */}
                    <div className="promo-code">
                      <form onSubmit={handlePromoSubmit} className="promo-input">
                        <input
                            type="text"
                            placeholder="Застосувати промокод"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="form-input"
                        />
                        <button type="submit" className="promo-btn">ОК</button>
                      </form>
                    </div>

                    {/* Розрахунки */}
                    <div className="order-calculations">
                      <div className="calc-row">
                        <span>Сума:</span>
                        <span>{cartTotal} грн</span>
                      </div>
                      {discount > 0 && (
                          <div className="calc-row discount">
                            <span>Знижка:</span>
                            <span>-{discount} грн</span>
                          </div>
                      )}
                      <div className="calc-row delivery">
                        <span>Доставка:</span>
                        <span>Безкоштовно</span>
                      </div>
                      <div className="calc-row total">
                        <span>До сплати:</span>
                        <span className="total-amount">{finalTotal} грн</span>
                      </div>
                    </div>

                    <button type="submit" className="checkout-btn">
                      Оформити замовлення
                    </button>

                    <div className="agreement-text">
                      Натискаючи кнопку оформити замовлення ви даєте згоду на обробку персональних даних та приймаєте угоду користувача
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Checkout;