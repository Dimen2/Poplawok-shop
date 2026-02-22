import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Heart, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { banners, products, fishTypes, categories } from './mockData';

// Импорт ваших фотографий
import photo from "./Photos/Chat.png";
import photo2 from "./Photos/Fider.jpg";
import photo3 from "./Photos/Fish.jpg";
import photo4 from "./Photos/Hook.jpg";
import photo5 from "./Photos/Coil.jpg";
import photo6 from "./Photos/Umbrella.jpg";
import photo7 from "./Photos/Wobbler.jpg";
import photo8 from "./Photos/Fider.jpg";
import photo9 from "./Photos/Hook.jpg";
import photo10 from "./Photos/Umbrella.jpg";
import photo11 from "./Photos/Coil.jpg";
import photo12 from "./Photos/Fider.jpg";
import photo13 from "./Photos/Fish.jpg";
import photo14 from "./Photos/Coil.jpg";
import photo15 from "./Photos/Wobbler.jpg";

// Спонсоры
import bounty from "./Photos/bounty.png";
import brain from "./Photos/brain.png";
import carppro from "./Photos/carp-pro.png";
import corona from "./Photos/corona.png";
import fishingRoi from "./Photos/fishing-roi.png";
import spinnex from "./Photos/spinnex.png";

function Home() {
    const { addToCart, toggleFavorite, isFavorite } = useCart();

    // --- ЛОГИКА ПЛАВНОЙ КАРУСЕЛИ ДЛЯ НОВИНОК ---
    const noveltyProducts = products.filter(p => p.isNew);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const displayProducts = [...noveltyProducts, ...noveltyProducts.slice(0, 4)];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (currentIndex >= noveltyProducts.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);
        }
        if (currentIndex < 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(noveltyProducts.length - 1);
            }, 700);
        }
    }, [currentIndex, noveltyProducts.length]);

    const hitProducts = products.filter(p => p.isHit).slice(0, 4);
    const discountProducts = products.filter(p => p.discount).slice(0, 4);

    // Массив логотипов (повторяем, чтобы лента была длиннее)
    const sponsors = [bounty, brain, carppro, corona, fishingRoi, spinnex];

    return (
        <div>
            <div className="home-page">
                {/* Головний банер - виправлений для мобілок */}
                <div className="hero-section">
                    <div className="hero-banner">
                        <img src={photo} alt="Акція" className="hero-image" />
                        <div className="hero-content">
                            <a
                                href="https://www.youtube.com/@Poplavok_"
                                className="youtube-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Youtube size={70} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Секция Новинки */}
            <section className="products-section" style={{ overflow: 'hidden' }}>
                <div className="page-container" style={{ position: 'relative' }}>
                    <div className="section-header">
                        <h2 className="section-title">Новинки</h2>
                        <Link to="/novelty">
                            <button className="view-all-btn">
                                Всі товари
                                <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>

                    <div className="carousel-main-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button onClick={handlePrev} className="side-nav-btn left desktop-only">
                            <ChevronLeft size={28} />
                        </button>

                        <div style={{ width: '100%', overflow: 'hidden' }}>
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                transform: `translateX(-${currentIndex * (100 / 4)}%)`,
                                transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.45, 0, 0.55, 1)' : 'none'
                            }}>
                                {displayProducts.map((product, index) => {
                                    const isFav = isFavorite(product.id);
                                    const productImage = [photo2, photo3, photo4, photo5][index % 4] || photo2;
                                    return (
                                        <div key={`${product.id}-${index}`} className="carousel-item">
                                            <div className="product-card">
                                                <div className="product-image-container">
                                                    <Link to={`/product/${product.id}`}>
                                                        <img src={productImage} alt={product.name} className="product-image" />
                                                    </Link>
                                                    <div className="product-badges">
                                                        <span className="badge badge-new">Новинка</span>
                                                    </div>
                                                    <button onClick={() => toggleFavorite(product)} className={`favorite-btn ${isFav ? 'active' : ''}`}>
                                                        <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                                                    </button>
                                                </div>
                                                <div className="product-info">
                                                    <h3 className="product-name">
                                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                                    </h3>
                                                    <div className="product-price">
                                                        <span className="current-price">{product.price} грн</span>
                                                    </div>
                                                    <button onClick={() => addToCart(product)} className="add-to-cart-btn" disabled={!product.inStock}>
                                                        <ShoppingCart size={16} />
                                                        {product.inStock ? 'Додати в кошик' : 'Немає'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button onClick={handleNext} className="side-nav-btn right desktop-only">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Риби */}
            <section className="fish-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2 className="section-title">Злови свій трофей</h2>
                        <Link to="/fish-types">
                            <button className="view-all-btn">Всі види риб <ArrowRight size={16} /></button>
                        </Link>
                    </div>
                    <div className="fish-grid">
                        {fishTypes.map((fish, index) => {
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

            {/* Знижки */}
            <section className="products-section discounts-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2 className="section-title">Знижки</h2>
                        <Link to="/discounts">
                            <button className="view-all-btn">Всі товари <ArrowRight size={16} /></button>
                        </Link>
                    </div>
                    <div className="products-grid">
                        {discountProducts.map((product, index) => {
                            const isFav = isFavorite(product.id);
                            const discountImage = [photo11, photo12, photo13, photo14][index] || photo11;
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <Link to={`/product/${product.id}`}>
                                            <img src={discountImage} alt={product.name} className="product-image" />
                                        </Link>
                                        <button onClick={() => toggleFavorite(product)} className={`favorite-btn ${isFav ? 'active' : ''}`}>
                                            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <div className="product-price">
                                            <span className="current-price">{product.price} грн</span>
                                            {product.oldPrice && <span className="old-price">{product.oldPrice} грн</span>}
                                        </div>
                                        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                                            <ShoppingCart size={16} /> Додати в кошик
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Категорії */}
            <section className="categories-section">
                <div className="page-container">
                    <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Популярні категорії</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link key={category.id} to={`/catalog/${category.slug}`} className="category-card">
                                <img src={photo15} alt={category.name} className="category-image" />
                                <div className="category-content"><h3 className="category-name">{category.name}</h3></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Хіти */}
            <section className="products-section hits-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2 className="section-title">Хіт продажів</h2>
                        <Link to="/hits">
                            <button className="view-all-btn">Всі товари <ArrowRight size={16} /></button>
                        </Link>
                    </div>
                    <div className="products-grid">
                        {hitProducts.map((product, index) => {
                            const isFav = isFavorite(product.id);
                            const hitImage = [photo2, photo3, photo4, photo5][index] || photo2;
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <Link to={`/product/${product.id}`}>
                                            <img src={hitImage} alt={product.name} className="product-image" />
                                        </Link>
                                        <button onClick={() => toggleFavorite(product)} className={`favorite-btn ${isFav ? 'active' : ''}`}>
                                            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <div className="product-price"><span className="current-price">{product.price} грн</span></div>
                                        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                                            <ShoppingCart size={16} /> Додати в кошик
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* КАРУСЕЛЬ СПОНСОРОВ */}
            <section className="sponsors-carousel-section">
                <div className="page-container">
                    <div className="sponsors-wrapper">
                        <div className="sponsors-track">
                            {[...sponsors, ...sponsors].map((logo, idx) => (
                                <div key={idx} className="sponsor-item">
                                    <img src={logo} alt="Partner" className="sponsor-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;