/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the shape of a single item
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  thumbnail: string;
  quantity: number;
  variantId?: string;
  slug?: string;
}

const CART_KEY = "app_shopping_cart";

// Helper to get raw data safely (handling SSR)
export const getRawCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

// Manager for actions
export const cartManager = {
  getAllCart: getRawCart,

  addToCart: (product: any) => {
    if (typeof window === "undefined") return;
    const cart = getRawCart();
    const productId = product._id || product.id;
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.variants?.[0]?.sell_price || 0,
        thumbnail: product.thumbnail,
        quantity: 1,
        slug: product.slug
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  },

  clearCart: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cartUpdated"));
  }
};