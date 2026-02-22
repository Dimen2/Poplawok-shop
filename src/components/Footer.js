import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Дякуємо за підписку! Ви будете отримувати наші новини та акції');
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Секция подписки на рассылку */}
      <div className="newsletter">
        <div className="newsletter-content">
          <h3>Будь в курсі!</h3>
          <p>Отримуй першим товари за вигідними цінами, дізнавайся про акції та новинки</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              <Send size={18} /> 

              Підписатись
            </button>
          </form>
        </div>
      </div>

      {/* Основной контент футера */}
      <div className="footer-main">
        <div className="footer-content">
          {/* Колонка 1: О компании */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-circle">
                <span>П</span>
              </div>
              <div className="footer-logo-text">Поплавок</div>
            </div>
            <p className="footer-about">
              Риболовний інтернет-магазин №1 в Україні. Все для риболовлі та туризму.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@Poplavok_"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={23} />
              </a>
            </div>
          </div>

          {/* Колонка 2: Каталог */}
          <div className="footer-section">
            <h4 className="footer-title">Каталог</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/catalog/spinning-rods" className="footer-link">
                  Спінінгові вудилища
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/catalog/spinning-reels" className="footer-link">
                  Спінінгові котушки
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/catalog/feeder-rods" className="footer-link">
                  Фідерні вудилища
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/catalog/carp-rods" className="footer-link">
                  Коропові вудилища
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/catalog/lures" className="footer-link">
                  Приманки
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/catalog/camping" className="footer-link">
                  Туризм та кемпінг
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Информация */}
          <div className="footer-section">
            <h4 className="footer-title">Інформація</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/about" className="footer-link">
                  Про нас
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/delivery" className="footer-link">
                  Доставка та оплата
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/guarantee" className="footer-link">
                  Гарантія та повернення
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contacts" className="footer-link">
                  Контакти
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/stores" className="footer-link">
                  Наші магазини
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div className="footer-section">
            <h4 className="footer-title">Контакти</h4>
            <div className="contact-list">
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <div className="contact-text">
                  <strong>0800-303-355</strong>
                  <div>Безкоштовно по Україні</div>
                </div>
              </div>
              
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <div className="contact-text">
                  <a href="mailto:info@poplavok.ua">
                    info@poplavok.ua
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <div className="contact-text">
                  2 магазина в Україні
                </div>
              </div>
              
              <div className="contact-item">
                <Clock size={18} className="contact-icon" />
                <div className="contact-text">
                  Пн-Нд: 9:00 - 21:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © 2025 Поплавок. Всі права захищено.
          </div>
          <div className="legal-links">
            <Link to="/privacy" className="legal-link">
              Політика конфіденційності
            </Link>
            <Link to="/terms" className="legal-link">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;