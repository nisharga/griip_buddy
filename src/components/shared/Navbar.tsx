/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User } from "lucide-react";
import { Container } from "../common/container";
import MobileSearch from "./MobileSearch";
import CartSheet from "../cart/cart-sheet";
import { popoverVariants } from "@/src/types/navbar";

/* ---------------- STATIC DATA ---------------- */

const STATIC_SEARCH_DATA = [
  {
    _id: "1",
    name: "iPhone 15 Pro",
    thumbnail: "/products/iphone.jpg",
  },
  {
    _id: "2",
    name: "Samsung Galaxy S24",
    thumbnail: "/products/samsung.jpg",
  },
  {
    _id: "3",
    name: "MacBook Air M3",
    thumbnail: "/products/macbook.jpg",
  },
  {
    _id: "4",
    name: "AirPods Pro",
    thumbnail: "/products/airpods.jpg",
  },
];

// interface SubCategory {
//   name: string;
//   path: string;
// }

// interface Category {
//   name: string;
//   path: string;
//   subcategories: SubCategory[];
// }

/* ---------------- COMPONENT ---------------- */

const Navbar = () => {
  const router = useRouter();
  const user = false;

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<typeof STATIC_SEARCH_DATA>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLoading = false;

  /* ---------------- SEARCH LOGIC ---------------- */

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!searchTerm.trim()) {
      // setIsSearchPopoverOpen(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = STATIC_SEARCH_DATA.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchData(filtered);

      setIsSearchPopoverOpen(true);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  /* ---------------- OUTSIDE CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      )
        setIsSearchPopoverOpen(false);

      if (loginRef.current && !loginRef.current.contains(event.target as Node))
        setIsLoginDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchPopoverOpen(false);
    }
  };

  const handleLogout = () => {
    /*   removeUser();
    removeAccessToken();
    removeVendorId(); */
    router.push("/");
  };

  /* ---------------- RENDER ---------------- */

  return (
    <header className="sticky top-0 z-58 w-full bg-secondary shadow">
      <Container>
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={180}
              height={60}
              priority
            />
          </Link>

          {/* Search */}
          <div
            className="hidden md:block relative w-full max-w-xl"
            ref={searchRef}
          >
            <input
              className="w-full rounded-full border px-4 py-2"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />

            <AnimatePresence>
              {isSearchPopoverOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute z-20 mt-2 w-full rounded-lg bg-white shadow"
                >
                  {isLoading ? (
                    <div className="p-4 text-center">Searching...</div>
                  ) : searchData.length ? (
                    searchData.map((item) => (
                      <Link
                        key={item._id}
                        href={`/search?q=${item.name}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                      >
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={40}
                          height={40}
                        />
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center">No results found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Account */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              className="flex items-center gap-2 text-white"
            >
              <User size={16} />
              Account
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {isLoginDropdownOpen && (
                <motion.div
                  variants={popoverVariants as any}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-40 rounded bg-white shadow"
                >
                  {!user ? (
                    <>
                      <Link className="block px-4 py-2" href="/login">
                        Login
                      </Link>
                      <Link className="block px-4 py-2" href="/register">
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="block px-4 py-2" href="/dashboard">
                        Dashboard
                      </Link>
                      <button
                        className="block w-full px-4 py-2 text-left text-red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>

      <MobileSearch
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />
      <CartSheet />
    </header>
  );
};

export default Navbar;
