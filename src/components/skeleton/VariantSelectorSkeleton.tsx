// components/VariantSelectorSkeleton.tsx
import React from "react";

const VariantSelectorSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Title placeholder */}
      <div className="h-4 w-40 bg-gray-200 rounded"></div>

      {/* Variant buttons placeholders */}
      <div className="flex gap-3 flex-wrap">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-8 w-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default VariantSelectorSkeleton;
