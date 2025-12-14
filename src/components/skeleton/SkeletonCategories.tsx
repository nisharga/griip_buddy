"use client";

import React from "react";

const SkeletonLine = ({ width = "w-full" }: { width?: string }) => (
  <div className={`h-3 ${width} rounded bg-gray-200 animate-pulse`} />
);

export default function SkeletonCategories() {
  return (
    <ul className="flex gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="relative">
          {/* Top-level category */}
          <div className="flex items-center gap-1 py-1">
            <SkeletonLine width="w-16" />
            <div className="h-3 w-3 rounded bg-gray-200 animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
