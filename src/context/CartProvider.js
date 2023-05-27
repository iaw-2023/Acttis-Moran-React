import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext({});

const localStorageCart = () => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localStorageCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
