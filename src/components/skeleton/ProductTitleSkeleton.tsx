// components/ProductTitleSkeleton.tsx
import React from "react";

const ProductTitleSkeleton: React.FC = () => {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded"></div> {/* Category */}
      <div className="h-6 w-64 bg-gray-200 rounded"></div> {/* Product Name */}
    </div>
  );
};

export default ProductTitleSkeleton;
