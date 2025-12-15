"use client";
import { Container } from "@/src/components/common/container";
import { brands } from "@/src/lib/data/brands";
import { Star } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          All Vendors
        </h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 p-6 w-75"
            >
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
                  <h2 className="text-lg font-medium text-gray-900">
                    {brand.name}
                  </h2>
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
          ))}
        </div>
      </div>
    </Container>
  );
};

export default page;
