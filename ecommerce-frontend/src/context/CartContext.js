import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const items = [...prev.items];
      const idx = items.findIndex(i => i.product._id === product._id);
      if (idx > -1) items[idx].quantity = items[idx].quantity + qty;
      else items.push({ product, quantity: qty });
      return { ...prev, items };
    });
  };

  const updateItem = (productId, quantity) => {
    setCart(prev => {
      const items = prev.items.map(i =>
        i.product._id === productId ? { ...i, quantity } : i
      ).filter(i => i.quantity > 0);
      return { ...prev, items };
    });
  };

  const removeItem = (productId) => {
    setCart(prev => ({ items: prev.items.filter(i => i.product._id !== productId) }));
  };

  const clearCart = () => setCart({ items: [] });

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
