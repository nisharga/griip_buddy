/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, KeyboardEvent } from "react";

import { useGetAllProductsQuery } from "@/src/redux/api/product-api";
import SmartImage from "./SmartImage";

/* ---------------- Debounce Hook ---------------- */
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/* ---------------- Skeleton ---------------- */
const SearchRecommendationSkeleton = () => (
  <div className="space-y-3 p-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-4/5 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Desktop Search ---------------- */
const DesktopSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const shouldSearch = debouncedSearchTerm.trim().length > 0;

  const { data: product, isFetching } = useGetAllProductsQuery(
    debouncedSearchTerm,
    { skip: !shouldSearch }
  );

  // ================= fetching ====================
  const data = product?.data?.data;

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ---------------- Close on outside / ESC ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc as unknown as EventListener);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "keydown",
        handleEsc as unknown as EventListener
      );
    };
  }, []);

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={searchRef}
      className="hidden md:flex flex-1 max-w-3xl mx-4 relative w-60 lg:w-80"
    >
      {/* Input */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900" />
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-300 bg-white py-2.5 pl-11 pr-5 text-sm focus:border-primary focus:ring-2 focus:ring-primary text-gray-900"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleSubmit}
      />

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border rounded-xl shadow-xl overflow-hidden"
          >
            {!shouldSearch ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                Start typing to search products
              </div>
            ) : isFetching ? (
              <SearchRecommendationSkeleton />
            ) : data.length > 0 ? (
              <div className="max-h-105 overflow-y-auto">
                {data?.slice(0, 6).map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/product/${data?.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => {
                      setSearchTerm(item.name);
                      setIsOpen(false);
                    }}
                  >
                    <SmartImage
                      src={item.thumbnail}
                      alt={item.name}
                      width={44}
                      height={44}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1 text-gray-900">
                        {item.name}
                      </p>

                      <div className="flex gap-2 items-center">
                        {item.variants[0].sale_price > 0 ? (
                          <>
                            <span className="text-sm font-bold text-red-500">
                              ৳ {item.variants[0].sale_price}
                              {/* {(
                                item?.price *
                                (1 - item.discountPercentage / 100)
                              ).toFixed(0)} */}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {/* ৳{item?.price.toFixed(0)} */}
                              {item.variants[0].regular_price}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold">
                            {/* ৳{item?.price?.toFixed(0)} */}৳
                            {item.variants[0].sale_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {data.length > 6 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="block text-center py-3 text-primary font-semibold hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    View all results
                  </Link>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-gray-500">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopSearch;
