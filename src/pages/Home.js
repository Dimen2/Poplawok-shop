import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ShoppingCart, Heart, ChevronLeft, ChevronRight,
    Youtube, MessageCircle, Phone, X, ChevronUp
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { banners, products, fishTypes, categories } from './mockData';

// Импорты фото (оставляем как были)
import photo from "./Photos/Chat.png";
import header2 from './Photos/header2.png';
import header3 from './Photos/header3.png';
import photo2 from "./Photos/Fider.jpg";
import photo3 from "./Photos/Fish.jpg";
import photo4 from "./Photos/Hook.jpg";
import photo5 from "./Photos/Coil.jpg";
import photo6 from "./Photos/Umbrella.jpg";
import photo8 from "./Photos/Lure.jpg";
import photo9 from "./Photos/BlackFire.jpg";
import photo11 from "./Photos/Feeder.jpg";
import photo12 from "./Photos/Bag.jpg";
import photo13 from "./Photos/Bait.jpg";
import photo15 from "./Photos/Half.jpg";
import photo7 from "./Photos/Koras.jpg";
import photo10 from "./Photos/Skuka.jpg";
import photo14 from "./Photos/Korop.jpg";
import photo16 from "./Photos/Okun.jpg";
import photo17 from "./Photos/Sudak.jpg";
import bounty from "./Photos/bounty.png";
import brain from "./Photos/brain.png";
import carppro from "./Photos/carp-pro.png";
import corona from "./Photos/corona.png";
import fishingRoi from "./Photos/fishing-roi.png";
import spinnex from "./Photos/spinnex.png";
import CodeBox from "./Photos/CodeBox.png";


function Home() {
    const { addToCart, toggleFavorite, isFavorite } = useCart();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showScrollUp, setShowScrollUp] = useState(false);

    // Логика появления кнопки "Вверх" при скролле
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollUp(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- КАРУСЕЛЬ БАНЕРА ---
    const bannerImages = [photo, header2, header3];
    const [bannerIndex, setBannerIndex] = useState(0);
    const bannerIntervalRef = useRef(null);

    useEffect(() => {
        startBannerInterval();
        return () => clearInterval(bannerIntervalRef.current);
    }, []);

    const startBannerInterval = () => {
        if (bannerIntervalRef.current) clearInterval(bannerIntervalRef.current);
        bannerIntervalRef.current = setInterval(handleBannerNext, 7000);
    };

    const handleBannerNext = () => setBannerIndex((prev) => (prev + 1) % bannerImages.length);
    const handleBannerPrev = () => setBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    const goToBanner = (index) => setBannerIndex(index);

    // --- ЛОГИКА КАРУСЕЛИ НОВИНОК ---
    const noveltyProducts = products.filter(p => p.isNew);
    const productImages = [photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo2, photo3, photo4, photo5];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const displayProducts = [...noveltyProducts, ...noveltyProducts.slice(0, 4)];

    useEffect(() => {
        const interval = setInterval(() => { handleNext(); }, 4000);
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
    const sponsors = [bounty, brain, carppro, corona, fishingRoi, spinnex, CodeBox];

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-banner">
                    <button className="banner-arrow banner-arrow-left" onClick={handleBannerPrev}><ChevronLeft size={30} /></button>
                    <button className="banner-arrow banner-arrow-right" onClick={handleBannerNext}><ChevronRight size={30} /></button>
                    <div className="banner-images">
                        {bannerImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`Banner ${idx}`} className={`banner-image ${idx === bannerIndex ? 'active' : ''}`} />
                        ))}
                    </div>
                    <div className="banner-dots">
                        {bannerImages.map((_, idx) => (
                            <button key={idx} className={`banner-dot ${idx === bannerIndex ? 'active' : ''}`} onClick={() => goToBanner(idx)} />
                        ))}
                    </div>
                    <div className="hero-content">
                        <a href="https://www.youtube.com/@Poplavok_" className="youtube-link" target="_blank" rel="noopener noreferrer">
                            <Youtube size={70} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Секция Новинки */}
            <section className="products-section" style={{ overflow: 'hidden' }}>
                <div className="page-container" style={{ position: 'relative' }}>
                    <div className="section-header">
                        <h2 className="section-title">Новинки</h2>
                        <Link to="/novelty">
                            <button className="view-all-btn">Всі товари <ArrowRight size={16} /></button>
                        </Link>
                    </div>

                    <div className="carousel-main-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button onClick={handlePrev} className="side-nav-btn left desktop-only"><ChevronLeft size={28} /></button>
                        <div style={{ width: '100%', overflow: 'hidden' }}>
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                transform: `translateX(-${currentIndex * (100 / 4)}%)`,
                                transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.45, 0, 0.55, 1)' : 'none'
                            }}>
                                {displayProducts.map((product, index) => {
                                    const isFav = isFavorite(product.id);
                                    const productImage = productImages[index % productImages.length];
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
                        <button onClick={handleNext} className="side-nav-btn right desktop-only"><ChevronRight size={28} /></button>
                    </div>
                </div>
            </section>

            {/* Риби */}
            <section className="fish-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2 className="section-title">Злови свій трофей</h2>
                        <Link to="/fish-types" className="view-all-link">Всі види риб <ArrowRight size={16} /></Link>
                    </div>
                    <div className="fish-grid">
                        {fishTypes.slice(0, -3).map((fish, index) => {
                            const fishImage = [photo10, photo14, photo7, photo16, photo17][index % 5];
                            return (
                                <Link key={fish.id} to={`/fish/${fish.slug}`} className="fish-card">
                                    <div className="fish-card-content">
                                        <h3 className="fish-name">{fish.name}</h3>
                                        <div className="fish-button"><ArrowRight size={20} color="white" /></div>
                                    </div>
                                    <div className="fish-image-wrapper">
                                        <img src={fishImage} alt={fish.name} className="fish-image" />
                                    </div>
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
                        <Link to="/discounts"><button className="view-all-btn">Всі товари <ArrowRight size={16} /></button></Link>
                    </div>
                    <div className="products-grid">
                        {discountProducts.map((product, index) => {
                            const isFav = isFavorite(product.id);
                            const discountImg = [photo11, photo12, photo13, photo14][index];
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <Link to={`/product/${product.id}`}><img src={discountImg} alt={product.name} className="product-image" /></Link>
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
                    <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Популярні категории</h2>
                    <div className="categories-grid">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/catalog/${cat.slug}`} className="category-card">
                                <img src={photo3} alt={cat.name} className="category-image" />
                                <div className="category-content"><h3 className="category-name">{cat.name}</h3></div>
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
                        <Link to="/hits"><button className="view-all-btn">Всі товари <ArrowRight size={16} /></button></Link>
                    </div>
                    <div className="products-grid">
                        {hitProducts.map((product, index) => {
                            const isFav = isFavorite(product.id);
                            const hitImg = [photo2, photo3, photo4, photo5][index];
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <Link to={`/product/${product.id}`}><img src={hitImg} alt={product.name} className="product-image" /></Link>
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

            {/* Спонсори */}
            <section className="sponsors-carousel-section">
                <div className="page-container">
                    <div className="sponsors-wrapper">
                        <div className="sponsors-track">
                            {[...sponsors, ...sponsors, ...sponsors].map((logo, idx) => (
                                <div key={idx} className="sponsor-item">
                                    <img src={logo} alt="Partner" className="sponsor-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ПЛАВАЮЩИЕ КНОПКИ */}
            <div className="floating-actions">
                {/* Меню чатов */}
                <div className={`chat-menu-container ${isChatOpen ? 'open' : ''}`}>
                    <div className="chat-options">
                        <a href="viber://chat?number=+380000000000" className="chat-option viber" title="Viber">
                            <Phone size={24} fill="white" />
                        </a>
                        <a href="https://t.me/poplavok1_bot" target="_blank" rel="noreferrer" className="chat-option telegram" title="Telegram">
                            <ArrowRight size={24} style={{ transform: 'rotate(-45deg)' }} />
                        </a>
                        <a href="tel:+380000000000" className="chat-option call" title="Позвонить">
                            <Phone size={24} />
                        </a>
                    </div>
                    <button className="main-chat-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
                        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
                    </button>
                </div>

                {/* Кнопка вверх */}
                <button
                    className={`scroll-up-btn ${showScrollUp ? 'visible' : ''}`}
                    onClick={scrollToTop}
                >
                    <ChevronUp size={30} />
                </button>
            </div>
        </div>
    );
}

export default Home;