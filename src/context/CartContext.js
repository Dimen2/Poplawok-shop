import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Завантаження з localStorage
    const storedCart = localStorage.getItem('cart');
    const storedFavorites = localStorage.getItem('favorites');
    
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Збереження в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: 'Оновлено',
          description: `Кількість "${product.name}" оновлено в кошику`
        });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      toast({
        title: 'Додано до кошика',
        description: `"${product.name}" додано до кошика`
      });
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast({
      title: 'Видалено',
      description: 'Товар видалено з кошика'
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: 'Кошик очищено',
      description: 'Всі товари видалено з кошика'
    });
  };

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(item => item.id === product.id);
      
      if (isFavorite) {
        toast({
          title: 'Видалено з обраного',
          description: `"${product.name}" видалено з обраного`
        });
        return prevFavorites.filter(item => item.id !== product.id);
      }
      
      toast({
        title: 'Додано до обраного',
        description: `"${product.name}" додано до обраного`
      });
      return [...prevFavorites, product];
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleFavorite,
    isFavorite,
    cartTotal,
    cartItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
