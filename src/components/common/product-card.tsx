/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Coins, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string; // Added brand for the requested feature
    price: number;
    discountPercentage?: number;
    stock?: number;
    rating?: number;
    thumbnail: string;
    approximately_delivery_time?: string;
    coin_per_order?: string;
    variants?: any;
  };
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const discountedPrice = product.discountPercentage
    ? (product.price * (100 - product.discountPercentage)) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    } else {
      alert(`Added product ID: ${product.id}`);
    }
  };

  // ================= fetching ====================
  const delivery_time = product?.approximately_delivery_time || "";
  const name = product?.name || "Product";
  const coin_per_order = product?.coin_per_order || "0";
  const regular_price = product?.variants[0].regular_price || "0";
  const sell_price = product?.variants[0].sell_price || "0";

  console.log("product", product);

  return (
    <Link href={`/product/${product?.slug}`} className="block">
      {/* PREMIUM CARD CONTAINER: ENTIRE CARD IS INTERACTIVE */}
      <div
        className="group bg-white h-full
                       transition-all duration-300 ease-in-out
                       hover:shadow-md hover:-translate-y-1 p-1 sm:p-2" // Full card lift and shadow on hover
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <Image
            src={product?.thumbnail || "/No_Image_Available.jpg"}
            alt={product.name}
            width={400}
            height={200}
            priority
            // Image subtle scale on hover
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {product.discountPercentage && (
            <span className="absolute top-0 left-0 bg-black text-white text-xs font-bold uppercase px-2 py-1 tracking-wider">
              SAVE {product.discountPercentage}%
            </span>
          )}

          {product.discountPercentage && (
            <span className="absolute bottom-0 left-0 bg-black text-white text-xs font-bold uppercase px-2 py-1 tracking-wider">
              🚚 FREE DELIVERY
            </span>
          )}
        </div>

        {/* Content: Compact spacing (p-4) */}
        <div className="py-2 sm:py-4 space-y-2">
          {/* 1. BRAND (Left) & RATING (Right) */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {delivery_time}
            </span>
            {coin_per_order && (
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-gray-800 font-semibold">
                  {/* {product.rating.toFixed(1)} */}
                  {coin_per_order}
                </span>
              </div>
            )}
          </div>

          {/* 2. TITLE (Left-aligned) */}
          {/* Title is now outside the <Link> tag but inside the main <Link> wrapper */}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-9.5 text-left mb-1 sm:mb-0">
            {name}
          </h3>

          {/* 3. Price + Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row items-baseline sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-primary">
                {/* ৳{discountedPrice.toFixed(2)} */}৳{sell_price}
              </span>
              {regular_price && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {/* ৳{product.price.toFixed(2)} */}৳{regular_price}
                </span>
              )}
            </div>

            {/* Add to cart: Prevent click propagation to the main Link */}
            <button
              onClick={handleAddToCart}
              className="h-10 w-10 bg-gray-100 hover:bg-primary hover:text-white text-gray-800 flex items-center justify-center transition-colors duration-200 border border-gray-100"
              aria-label="Add to cart"
              // Stop event from bubbling up to the surrounding <Link>
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Low stock */}
          {product.stock && product.stock < 5 && (
            <span className="text-xs text-red-500 mt-1 block">
              **LOW STOCK:** Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
