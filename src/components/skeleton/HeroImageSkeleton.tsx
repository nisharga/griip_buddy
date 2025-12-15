"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HeroImageSkeletonProps {
  currentSlide: number;
}

export default function HeroImageSkeleton({
  currentSlide,
}: HeroImageSkeletonProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`skeleton-${currentSlide}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="absolute inset-0"
      >
        {/* Skeleton block */}
        <div className="relative w-full h-full overflow-hidden bg-gray-200">
          {/* Shimmer */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SlideCardSkeleton() {
  return (
    <div className="h-full overflow-hidden relative">
      {/* Aspect ratio container */}
      <div className="relative w-full h-full aspect-2/1 bg-gray-200">
        {/* Shimmer layer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>
  );
}
