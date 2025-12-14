"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="w-full bg-white rounded overflow-hidden border border-gray-100 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-200" />

      <div className="p-3 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/2" />

        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/4" />

        {/* Buttons */}
        <div className="flex gap-1.5 pt-1">
          <div className="flex-1 h-8 bg-gray-200 rounded" />
          <div className="flex-1 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
