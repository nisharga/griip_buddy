"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { IProductFull } from "@/src/types/IProductFull";

interface ProductCardProps {
  product: IProductFull;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const minPrice = product?.min_price;
  const maxPrice =
    product?.min_price !== product?.max_price ? product?.max_price : null;

  // Optional: assume old price exists (adjust field name if different)
  const oldPrice = product?.old_price; // optional

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation
    if (product?.id) {
      alert(product.id);
    }
  };

  return (
    <div className="group bg-white hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <Link href={`/details/${product.slug}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={400}
            height={260}
            priority
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3 mb-3">
        {/* Title */}
        <Link href={`/details/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 min-h-10">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-xs text-gray-500">{product.category?.name}</p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{oldPrice}
              </span>
            )}

            <span className="text-base font-semibold text-primary">
              ৳{minPrice}
              {maxPrice && (
                <span className="text-sm font-medium"> - {maxPrice}</span>
              )}
            </span>

            {/* Future stock warning */}
            {/*
            {product.quantity < 5 && (
              <span className="text-xs text-red-500 mt-1">
                Only {product.quantity} products left
              </span>
            )}
            */}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="cursor-pointer h-10 w-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
