import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from './mockData';
import {
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import photo1 from "./Photos/Chat.png";
import photo2 from "./Photos/Fider.jpg";
import photo3 from "./Photos/Fish.jpg";
import photo4 from "./Photos/Hook.jpg";
import photo5 from "./Photos/Coil.jpg";
import photo6 from "./Photos/Umbrella.jpg";
import photo7 from "./Photos/Wobbler.jpg";
import Lestka1 from "./Photos/Lestka-100m.jpg";
import Lestka2 from "./Photos/Lestka-300m.jpg";
import Lugha100g from "./Photos/lugha-100g.jpg";
import Lugha10g from "./Photos/lugha-10g.jpg";
import Lugha50g from "./Photos/lugha-50g.jpg";
import Fider from "./Photos/Fider.jpg";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const searchQuery = searchParams.get('search');
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Состояние фильтров
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Массив всех фотографий
const allPhotos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, Lestka1, Lestka2, Lugha100g, Lugha10g, Lugha50g, Fider];

  // Функция для получения фото
  const getProductImage = (productId) => {
    const index = productId % allPhotos.length;
    return allPhotos[index];
  };

  // Переключение аккордеона
  const toggleCategoryAccordion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Обработчик выбора подкатегории
  const handleSubcategoryToggle = (subcategorySlug) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategorySlug)
        ? prev.filter(s => s !== subcategorySlug)
        : [...prev, subcategorySlug]
    );
  };

  // Применяем фильтры
  useEffect(() => {
    let filtered = [...products];

    // Фильтр по категории из URL
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Фильтр по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Фильтр по выбранным категориям
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Фильтр по выбранным подкатегориям
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(p =>
        p.subcategory && selectedSubcategories.includes(p.subcategory)
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Фильтр по наличию
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [category, searchQuery, sortBy, selectedCategories, selectedSubcategories, priceRange, inStockOnly]);

  // Получаем продукты для текущей страницы
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryToggle = (categorySlug) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value) || 0
    }));
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange({ min: 0, max: 150000 });
    setInStockOnly(false);
    setSortBy('default');
    setExpandedCategories({});
  };

  // Получаем текущую категорию
  const currentCategory = categories.find(c => c.slug === category);

  return (
    <div className="catalog-page">
      <div className="page-container">
        {/* Заголовок */}
        <div className="catalog-header">
          <h1 className="catalog-title">
            {searchQuery
              ? `Результати пошуку: "${searchQuery}"`
              : currentCategory
                ? currentCategory.name
                : 'Каталог товарів'
            }
          </h1>
          <p className="catalog-subtitle">
            Знайдено {filteredProducts.length} товарів
          </p>
        </div>

        {/* Кнопка мобильных фильтров */}
        <button
          className="mobile-filters-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter size={20} />
          Фільтри та сортування
        </button>

        <div className="catalog-container">
          {/* Боковая панель фильтров */}
          <aside className="catalog-sidebar">
            <div className="filter-card">
              <h3 className="filter-title">Фільтри</h3>

              {/* Категории с аккордеонами */}
              <div className="filter-group">
                <h4 className="filter-group-title">Категорії</h4>
                <div className="filter-options">
                  {categories.map(cat => (
                    <div key={cat.id} className="category-accordion">
                      <div className="category-header">
                        <label className="filter-option">
                          <div
                            className={`filter-checkbox ${selectedCategories.includes(cat.slug) ? 'checked' : ''}`}
                            onClick={() => handleCategoryToggle(cat.slug)}
                          />
                          <span className="filter-label">{cat.name}</span>
                        </label>
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <button
                            className="accordion-toggle"
                            onClick={() => toggleCategoryAccordion(cat.id)}
                          >
                            {expandedCategories[cat.id] ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Подкатегории */}
                      {cat.subcategories && cat.subcategories.length > 0 && expandedCategories[cat.id] && (
                        <div className="subcategories-list">
                          {cat.subcategories.map(subcat => (
                            <label key={subcat.id} className="subcategory-option">
                              <div
                                className={`filter-checkbox ${selectedSubcategories.includes(subcat.slug) ? 'checked' : ''}`}
                                onClick={() => handleSubcategoryToggle(subcat.slug)}
                              />
                              <span className="subcategory-label">{subcat.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ценовой диапазон */}
              <div className="filter-group">
                <h4 className="filter-group-title">Ціна, грн</h4>
                <div className="price-range-slider">
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="price-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="price-slider"
                  />
                  <div className="price-values">
                    <span>{priceRange.min} грн</span>
                    <span>{priceRange.max} грн</span>
                  </div>
                </div>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Від"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="price-input"
                  />
                </div>
              </div>

              {/* Наличие */}
              <div className="filter-group">
                <label className="filter-option">
                  <div
                    className={`filter-checkbox ${inStockOnly ? 'checked' : ''}`}
                    onClick={() => setInStockOnly(!inStockOnly)}
                  />
                  <span className="filter-label">Тільки в наявності</span>
                </label>
              </div>

              {/* Кнопки фильтров */}
              <div className="filter-buttons">
                <button className="filter-btn apply" onClick={() => setShowMobileFilters(false)}>
                  Застосувати
                </button>
                <button className="filter-btn" onClick={resetFilters}>
                  Скинути
                </button>
              </div>
            </div>
          </aside>

          {/* Основная область с товарами */}
          <main className="catalog-main">
            {/* Панель управления */}
            <div className="catalog-controls">
              <div className="sort-container">
                <span className="sort-label">Сортування:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">За замовчуванням</option>
                  <option value="price-asc">Ціна: від низької</option>
                  <option value="price-desc">Ціна: від високої</option>
                  <option value="name">За назвою</option>
                  <option value="rating">За рейтингом</option>
                </select>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Сетка товаров */}
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">😕</div>
                <h3 className="no-products-title">Товарів не знайдено</h3>
                <p className="no-products-text">
                  Спробуйте змінити параметри пошуку або вибрати іншу категорію
                </p>
                <button className="filter-btn apply" onClick={resetFilters}>
                  Скинути фільтри
                </button>
              </div>
            ) : (
              <>
                <div className={`catalog-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {currentProducts.map((product, index) => {
                    const isFav = isFavorite(product.id);
                    const productImage = product.image; // Беремо фото з об'єкта товару

                    return (
                      <div key={product.id} className="catalog-product-card">
                        <div className="product-image-container">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={productImage}
                              alt={product.name}
                              className="product-image"
                            />
                          </Link>

                          <div className="product-badges">
                            {product.isNew && <span className="badge badge-new">Новинка</span>}
                            {product.isHit && <span className="badge badge-hit">Хіт</span>}
                          </div>

                          {product.discount && (
                            <span className="badge badge-discount">-{product.discount}%</span>
                          )}

                          <button
                            onClick={() => toggleFavorite(product)}

                            className={`favorite-btn ${isFav ? 'active' : ''}`}
                          >
                            <Heart size={20} />
                          </button>
                        </div>

                        <div className="product-info">
                          <h3 className="product-name">
                            <Link to={`/product/${product.id}`}>
                              {product.name}
                            </Link>
                          </h3>

                          <div className="product-price">
                            <span className="current-price">{product.price} грн</span>
                            {product.oldPrice && (
                              <span className="old-price">{product.oldPrice} грн</span>
                            )}
                          </div>

                          {product.rating && (
                            <div className="product-rating">
                              <div className="stars">
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
                  })}
                </div>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="page-dots">...</span>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    )}

                    <button
                      className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Мобильные фильтры */}
      {showMobileFilters && (
        <div className="mobile-filters-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filters-sidebar open" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filters-header">
              <h3 className="mobile-filters-title">Фільтри</h3>
              <button
                className="close-filters-btn"
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Сортування</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                style={{ width: '100%' }}
              >
                <option value="default">За замовчуванням</option>
                <option value="price-asc">Ціна: від низької</option>
                <option value="price-desc">Ціна: від високої</option>
                <option value="name">За назвою</option>
                <option value="rating">За рейтингом</option>
              </select>
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Категорії</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <div key={cat.id} className="category-accordion">
                    <div className="category-header">
                      <label className="filter-option">
                        <div
                          className={`filter-checkbox ${selectedCategories.includes(cat.slug) ? 'checked' : ''}`}
                          onClick={() => handleCategoryToggle(cat.slug)}
                        />
                        <span className="filter-label">{cat.name}</span>
                      </label>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <button
                          className="accordion-toggle"
                          onClick={() => toggleCategoryAccordion(cat.id)}
                        >
                          {expandedCategories[cat.id] ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      )}
                    </div>

                    {cat.subcategories && cat.subcategories.length > 0 && expandedCategories[cat.id] && (
                      <div className="subcategories-list">
                        {cat.subcategories.map(subcat => (
                          <label key={subcat.id} className="subcategory-option">
                            <div
                              className={`filter-checkbox ${selectedSubcategories.includes(subcat.slug) ? 'checked' : ''}`}
                              onClick={() => handleSubcategoryToggle(subcat.slug)}
                            />
                            <span className="subcategory-label">{subcat.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Ціна, грн</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Від"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="price-input"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="price-input"
                />
              </div>
            </div>

            <div className="filter-buttons" style={{ marginTop: '30px' }}>
              <button
                className="filter-btn apply"
                onClick={() => setShowMobileFilters(false)}
              >
                Застосувати
              </button>
              <button
                className="filter-btn"
                onClick={() => {
                  resetFilters();
                  setShowMobileFilters(false);
                }}
              >
                Скинути
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;