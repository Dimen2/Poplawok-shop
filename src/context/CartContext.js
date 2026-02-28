import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Завантаження з localStorage при старті
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedFavorites = localStorage.getItem('favorites');

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Збереження в localStorage при зміні
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Додавання в корзину
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Оновлення кількості
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
        prev.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        )
    );
  };

  // Видалення з корзини
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Очищення корзини
  const clearCart = () => {
    setCartItems([]);
  };

  // Загальна кількість товарів
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Загальна сума
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Перевірка чи товар в обраному
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // Додати/видалити з обраного
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const value = {
    cartItems,
    favorites,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartItemsCount,
    cartTotal,
    isFavorite,
    toggleFavorite
  };

  return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
  );
};