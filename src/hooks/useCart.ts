"use client";
import { useState, useEffect } from "react"; 
import { getRawCart, CartItem } from "../lib/cartManager";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const updateCartData = () => {
      const items = getRawCart();
      setCartItems(items);
      // Calculate total quantity (e.g., 2 apples + 1 orange = 3)
      const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartLength(totalCount);
    };

    // Initialize
    updateCartData();

    // Listen for the custom event we created in cartManager
    window.addEventListener("cartUpdated", updateCartData);
    // Also listen for storage changes (if user has multiple tabs open)
    window.addEventListener("storage", updateCartData);

    return () => {
      window.removeEventListener("cartUpdated", updateCartData);
      window.removeEventListener("storage", updateCartData);
    };
  }, []);

  return { cartItems, cartLength };
};