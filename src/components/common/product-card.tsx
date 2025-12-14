"use client";

import Image from "next/image";
import { ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { IProductFull } from "@/types/IProductFull";

interface ProductCardProps {
  product: IProductFull;
  onAddToCart?: (productId: string) => void;
  onBuyNow?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  const minPrice = product?.min_price;
  const maxPrice =
    product?.min_price !== product?.max_price ? product?.max_price : "";

  const handleAddToCart = () => {
    console.log(product.id);
  };

  const handleBuyNow = () => {
    console.log(product.id);
  };

  return (
    <Link href={`/details/${product?.slug}`} className="group ">
      <div className="w-full bg-white rounded overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-100">
        {/* Product Image */}
        <div className="relative">
          <Image
            src={product?.thumbnail}
            alt={product?.name}
            width={300}
            height={160}
            className="w-full h-[160px] object-cover"
            priority
          />

          {/*  {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded">
              -{product.discountPercentage}%
            </span>
          )} */}
        </div>

        <div className="p-3 space-y-2">
          <div>
            <h3 className="font-medium text-sm text-gray-900 line-clamp-1 leading-tight">
              {product?.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {product?.category?.name}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ৳{minPrice} {maxPrice ? "-" : ""}
              {maxPrice ? maxPrice : ""}
            </span>
          </div>

          <div className="flex gap-1.5 pt-1">
            <button
              onClick={handleBuyNow}
              className="flex-1 cursor-pointer bg-primary hover:bg-primary/90 text-white font-medium py-2 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <Zap className="w-3 h-3" />
              Buy
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-50 cursor-pointer hover:bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded border border-gray-200 text-xs transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <ShoppingCart className="w-3 h-3" />
              Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
