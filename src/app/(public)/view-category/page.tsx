/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductCard from "@/src/components/common/product-card";

const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.0,
    discountPercentage: 10,
    brand: "JBL",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    name: "Smart LED Strip Lights",
    price: 35.0,
    discountPercentage: 10,
    brand: "Philips",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    name: "Waterproof Bluetooth Speaker",
    price: 79.99,
    discountPercentage: 10,
    brand: "Sony",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 4,
    name: "4K Webcam with Microphone",
    price: 129.99,
    discountPercentage: 10,
    brand: "Logitech",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 5,
    name: "RGB Gaming Mouse",
    price: 59.99,
    discountPercentage: 10,
    brand: "Razer",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    discountPercentage: 10,
    brand: "Corsair",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 29.99,
    discountPercentage: 10,
    brand: "Anker",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 8,
    name: "Portable Power Bank 20000mAh",
    price: 49.99,
    discountPercentage: 10,
    brand: "Samsung",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 9,
    name: "True Wireless Earbuds",
    price: 159.99,
    discountPercentage: 10,
    brand: "Apple",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 10,
    name: "Smart Watch Series 7",
    price: 399.99,
    discountPercentage: 10,
    brand: "Samsung",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 11,
    name: "360° Security Camera",
    price: 89.99,
    discountPercentage: 10,
    brand: "TP-Link",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 12,
    name: "Smart Door Lock",
    price: 199.99,
    discountPercentage: 10,
    brand: "Yale",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 13,
    name: "Wireless Gaming Controller",
    price: 69.99,
    discountPercentage: 10,
    brand: "Microsoft",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 14,
    name: "USB-C Docking Station",
    price: 79.99,
    brand: "Dell",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 15,
    name: "Laptop Cooling Pad",
    price: 39.99,
    brand: "Cooler Master",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 16,
    name: "Wireless Gaming Headset",
    price: 199.99,
    brand: "SteelSeries",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 17,
    name: "4TB External SSD",
    price: 399.99,
    discountPercentage: 10,
    brand: "Western Digital",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 18,
    name: "27-inch Gaming Monitor",
    price: 299.99,
    discountPercentage: 10,
    brand: "ASUS",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 19,
    name: "Wi-Fi 6 Router",
    price: 249.99,
    discountPercentage: 10,
    brand: "Netgear",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 20,
    name: "Smart Home Hub",
    price: 129.99,
    discountPercentage: 10,
    brand: "Google",
    image: "/placeholder.svg?height=150&width=150",
  },
];

export default function Component() {
  const handleAddToCart = () => {
    console.debug("product added");
  };
  /* const handleBuyNow = () => {
    console.debug("buy product");
  }; */

  return (
    <>
      {products.map((product, i) => (
        <ProductCard
          key={i}
          product={product as any}
          onAddToCart={handleAddToCart}
          // onBuyNow={handleBuyNow}
        />
      ))}
    </>
  );
}
