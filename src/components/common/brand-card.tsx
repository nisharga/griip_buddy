import { Brand } from "@/lib/data/brands";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <div
      key={brand.name}
      className="embla__slide flex-none w-fit md:w-1/3 lg:w-1/4 xl:w-1/5 pl-2 first:pl-0"
    >
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 p-6 w-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 relative mb-2">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-fit"
              sizes="(max-width: 112px) 100vw, 112px"
            />
          </div>

          <div className="text-center space-y-2 w-full">
            <h2 className="text-lg font-medium text-gray-900">{brand.name}</h2>
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {brand.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full pt-3 border-t border-gray-100">
            <div className="text-center flex-1">
              <div className="text-lg font-semibold text-blue-600">
                {brand.reviewCount}
              </div>
              <div className="text-xs text-gray-500">Reviews</div>
            </div>

            <div className="text-center flex-1 border-l border-gray-100">
              <div className="text-lg font-semibold text-blue-600">
                {brand.productCount}
              </div>
              <div className="text-xs text-gray-500">Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
