/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, KeyboardEvent } from "react";

import { searchInputVariants } from "@/src/types/navbar";
import { useGetAllProductsQuery } from "@/src/redux/api/product-api";
import SmartImage from "./SmartImage";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// New variants for the dropdown effect
const mobileDropdownVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.3 },
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "tween", duration: 0.3 },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.2 },
  },
};

const SearchRecommendationSkeleton = () => (
  // Updated skeleton gradient class to use standard Tailwind classes
  <div className="space-y-3">
    {Array?.from({ length: 5 }).map(
      (
        _,
        i // Max 5 items for skeleton
      ) => (
        <div
          key={`skeleton-${i}`}
          className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl"
        >
          <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded-full w-4/5 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
      )
    )}
  </div>
);

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearch = ({ isOpen, onClose }: MobileSearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  console.log("debouncedSearchTerm: ", debouncedSearchTerm); // here get acuall value

  const shouldSearch = debouncedSearchTerm.trim().length > 0;

  /* const {
    data,
    isFetching: isLoadingRecommendations,
  } = useGetSearchProductsQuery(debouncedSearchTerm, {}); */

  const { data, isLoading: isLoadingRecommendations } = useGetAllProductsQuery(
    debouncedSearchTerm,
    { skip: !shouldSearch }
  );

  // ================= fetching ====================
  const filteredRecommendations = data?.data?.data;

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // NOTE: For the new dropdown design, we typically remove the outside click handler
    // as the user should still be able to interact with the page below the dropdown.
    // However, if you want the dropdown to close when clicking the page body, keep this.
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSearchSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.length > 0) {
      event.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          // 👇 NEW DROPDOWN CLASSES AND VARIANTS
          variants={mobileDropdownVariants as any}
          // Fixed positioning right under assumed header (e.g., 4rem/64px), full width, max height
          className="fixed left-0 right-0 top-16 z-60 bg-white shadow-xl max-h-[75vh] md:hidden 
                     border-t border-gray-200 overflow-hidden"
          ref={searchRef}
        >
          {/* Header/Close Button within the dropdown panel */}
          <div className="flex items-center justify-between px-4 border-b border-gray-100 bg-linear-to-r from-primary/5 to-secondary/5">
            {/* Search Input */}
            <motion.div
              variants={searchInputVariants as any}
              initial="hidden"
              animate="visible"
              className="py-4 border-b border-gray-100 w-full pr-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 py-2 pl-12 pr-6 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  onKeyDown={handleSearchSubmit}
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </motion.button>
                )}
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-primary"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-white" />
            </motion.button>
          </div>

          {/* Results/Recommendations Container - SCROLLABLE CONTENT */}
          <div
            className="overflow-y-auto p-4"
            style={{ maxHeight: "calc(75vh - 120px)" }}
          >
            {/* Calculate max height for scroll */}
            {searchTerm.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center py-2 text-sm text-gray-600"
              >
                Start typing to see product recommendations.
              </motion.div>
            ) : (
              /* Search Results */
              <div>
                {isLoadingRecommendations ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Searching...</span>
                    </div>
                    <SearchRecommendationSkeleton />
                  </div>
                ) : filteredRecommendations?.length > 0 ? (
                  <div>
                    <div className="space-y-3">
                      {/* LIMIT TO MAX 5 PRODUCTS VISIBLE AT ONCE */}
                      {filteredRecommendations.slice(0, 5).map((item: any) => (
                        <div key={item._id}>
                          <Link
                            href={`/product/${data?.slug}`}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                            onClick={() => {
                              setSearchTerm(item.name);
                              onClose();
                            }}
                          >
                            <div className="relative">
                              <SmartImage
                                src={item.thumbnail}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {/*  {item?.discountPercentage > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  -{item?.discountPercentage}%
                                </div>
                              )} */}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-2">
                                {item.variants[0].sale_price > 0 ? (
                                  <>
                                    <span className="text-base font-bold text-red-500">
                                      ৳ {item.variants[0].sale_price}
                                      {/* {(
                                        item.price *
                                        (1 - item.discountPercentage / 100)
                                      ).toFixed(0)} */}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">
                                      {/* ৳{item.price.toFixed(0)} */}
                                      {item.variants[0].regular_price}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold text-gray-900">
                                    {/* ৳{item.price.toFixed(0)} */}
                                    {item.variants[0].sale_price}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400 -rotate-90 group-hover:text-primary transition-colors" />
                          </Link>
                        </div>
                      ))}

                      {/* Optional: View All Link */}
                      {filteredRecommendations.length > 5 && (
                        <div className="text-center pt-4">
                          <Link
                            href={`/search?q=${encodeURIComponent(searchTerm)}`}
                            className="text-primary font-semibold hover:text-primary/80 transition-colors"
                            onClick={onClose}
                          >
                            View all {filteredRecommendations.length} results
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try searching with different keywords
                    </p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearch;
