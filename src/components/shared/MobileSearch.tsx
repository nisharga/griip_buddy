/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ChangeEvent, KeyboardEvent } from "react";

import {
  mobileSearchOverlayVariants,
  searchInputVariants,
  resultsVariants,
  resultItemVariants,
  SearchProduct,
} from "@/src/types/navbar";
import { mockSearchData } from "@/src/lib/data";

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchRecommendationSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={`skeleton-${i}`} className="flex items-center gap-4 p-3">
        <div className="w-12 h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded-full w-3/4 animate-pulse"></div>
          <div className="h-3 bg-linear-to-r from-gray-200 to-gray-300 rounded-full w-1/2 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const MobileSearch = ({ isOpen, onClose }: MobileSearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecommendations, setFilteredRecommendations] = useState<
    SearchProduct[]
  >([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
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
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (searchTerm.length > 0) {
      searchTimeoutRef.current = setTimeout(() => {
        const filtered = mockSearchData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecommendations(filtered);
        setIsLoadingRecommendations(false);
      }, 300);
    } else {
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

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
          variants={mobileSearchOverlayVariants as any}
          className="fixed inset-0 z-70 bg-white md:hidden"
          ref={searchRef}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-secondary/5">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-semibold text-gray-800 flex items-center gap-2"
            >
              <Search className="h-5 w-5 text-primary" />
              Search Products
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-gray-600" />
            </motion.button>
          </div>

          <motion.div
            variants={searchInputVariants as any}
            initial="hidden"
            animate="visible"
            className="p-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 py-4 pl-12 pr-6 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {searchTerm.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              ></motion.div>
            ) : (
              /* Search Results */
              <motion.div
                variants={resultsVariants}
                initial="hidden"
                animate="visible"
              >
                {isLoadingRecommendations ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Searching...</span>
                    </div>
                    <SearchRecommendationSkeleton />
                  </div>
                ) : filteredRecommendations.length > 0 ? (
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <Search className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Found {filteredRecommendations.length} results
                      </h3>
                    </motion.div>
                    <div className="space-y-3">
                      {filteredRecommendations
                        .slice(0, 8)
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            variants={resultItemVariants}
                            custom={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href={`/search?q=${encodeURIComponent(
                                item.name
                              )}`}
                              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                              onClick={() => {
                                setSearchTerm(item.name);
                                onClose();
                              }}
                            >
                              <div className="relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={60}
                                  height={60}
                                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.discount > 0 && (
                                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -{item.discount}%
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                  {item.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-2">
                                  {item.discount > 0 ? (
                                    <>
                                      <span className="text-lg font-bold text-red-500">
                                        ৳
                                        {(
                                          item.price *
                                          (1 - item.discount / 100)
                                        ).toFixed(0)}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through">
                                        ৳{item.price.toFixed(0)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-lg font-bold text-gray-900">
                                      ৳{item.price.toFixed(0)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown className="h-5 w-5 text-gray-400 -rotate-90 group-hover:text-primary transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
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
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearch;
