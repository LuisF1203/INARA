import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializa el estado del carrito con los datos de sessionStorage o con un array vacío
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Añade un producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      let newCart;

      if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        newCart = [...prevCart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: newCart[existingProductIndex].quantity + quantity,
        };
      } else {
        // Si el producto es nuevo, añádelo al carrito
        newCart = [...prevCart, { ...product, quantity }];
      }
      
      // Actualiza el sessionStorage con el nuevo estado del carrito
      sessionStorage.setItem('cart', JSON.stringify(newCart));

      return newCart;
    });
    console.log(sessionStorage.getItem('cart'))
    console.log(cart)
  };

  // Remueve un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      sessionStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Actualiza la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => 
        item.id === productId ? { ...item, quantity: quantity } : item
      );
      sessionStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Limpia el carrito
  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('cart');
  };

  // El valor que el contexto pasará a los componentes consumidores
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
