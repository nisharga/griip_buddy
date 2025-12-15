/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  User,
  Phone,
  ChevronDown,
  X,
  ShoppingCart,
  Package,
  Gift,
} from "lucide-react";
import Image from "next/image";
import { Container } from "../common/container";
import { useRouter } from "next/navigation";
import MobileSearch from "./MobileSearch";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useGetCurrentProfileQuery } from "@/src/redux/api/old/auth-api";
import { mobileMenuVariants, popoverVariants } from "@/src/types/navbar";
import CartSheet from "./cart/cart-sheet";
import { useGetAllCategoriesQuery } from "@/src/redux/api/category-api";
import SkeletonCategories from "../skeleton/SkeletonCategories";
import DesktopSearch from "./DesktopSearch";

// import { mockSearchData } from "@/src/lib/data";

const Navbar = () => {
  // const { totalItems, isOpen } = useAppSelector((state) => state.cart);
  const totalItems = 0;
  const { data: currentProfile } = useGetCurrentProfileQuery({});
  console.log(currentProfile, "currentProfile");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  // const [filteredRecommendations, setFilteredRecommendations] = useState<
  //   SearchProduct[]
  // >([]);
  // const [isLoadingRecommendations, setIsLoadingRecommendations] =
  //   useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openMobileSubcategory, setOpenMobileSubcategory] = useState<
    string | null
  >(null);

  const {
    data: categoriesData = [],
    isLoading: isLoadingCategory,
    isError,
  } = useGetAllCategoriesQuery({});

  // const user = getUser();

  const loginRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /*  const handleSearchSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.length > 0) {
      event.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchPopoverOpen(false);
      setIsMobileMenuOpen(false);
    }
  }; */

  const handleLogOut = async () => {
    /* removeUser();
    removeAccessToken();
    removeVendorId(); */
    router.push("/");
  };
  /*  if (isLoadingCategory) {
    return <SkeletonCategories />;
  } */

  if (isError) {
    return null;
  }
  return (
    <header
      lang="en"
      className="sticky top-0 w-full z-58 transition-all text-white shadow"
    >
      <div className="w-full bg-secondary">
        <Container>
          <div className="flex items-center justify-between py-1 gap-4">
            <div className="flex w-full md:w-1/2 items-center justify-between">
              <Link
                href="/"
                className="text-2xl md:text-3xl font-extrabold text-primary tracking-wide shrink-0"
              >
                <Image
                  src={"/logo/logo.png"}
                  alt="Main logo of Griipbuddy"
                  className="md:h-17.5 h-15 w-auto"
                  width={400}
                  height={100}
                />
              </Link>

              {/* Mobile Controls */}
              <div className="md:hidden flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors relative"
                  onClick={() => setIsMobileSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5 text-primary" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>

                <button
                  className="p-2 rounded-md hover:bg-primary/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <Menu className="h-6 w-6 text-primary" />
                </button>
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* Desktop Search */}
              <DesktopSearch />

              <div className="flex gap-1 text-primary items-center">
                <Gift className="size-7 text-primary" />
                <div className="text-white">
                  <h1 className="text-sm">Offers</h1>
                </div>
              </div>
              <div className="flex gap-1 text-primary items-center">
                <ShoppingCart className="size-7 text-primary" />
                <div className="text-white">
                  <h1 className="text-sm">Cart(0)</h1>
                </div>
              </div>
              <div className="relative" ref={loginRef}>
                <button
                  className="flex items-center gap-1 text-xs font-medium text-white hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/20 cursor-pointer"
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  aria-label="Login or Register"
                  aria-expanded={isLoginDropdownOpen}
                >
                  <User className="size-3" />
                  <span>Account</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      isLoginDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isLoginDropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={popoverVariants as any}
                      className="absolute right-0 top-full z-20 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden"
                    >
                      {false && (
                        <ul className="py-1">
                          <li>
                            <Link
                              href="/login"
                              className="block px-4 py-2 text-sm text-secondary hover:text-primary   transition-colors"
                              onClick={() => setIsLoginDropdownOpen(false)}
                            >
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/register"
                              className="block px-4 py-2 text-sm text-secondary hover:text-primary   transition-colors"
                              onClick={() => setIsLoginDropdownOpen(false)}
                            >
                              Register
                            </Link>
                          </li>
                        </ul>
                      )}
                      {false && (
                        <ul className="py-1">
                          <li>
                            {"customer" === "customer" && (
                              <Link
                                href="/profile-details"
                                className="block px-4 py-2 text-sm text-secondary hover:text-primary   transition-colors"
                                onClick={() => setIsLoginDropdownOpen(false)}
                              >
                                My Profile
                              </Link>
                            )}
                            {"vendor_owner" === "vendor_owner" && (
                              <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm text-secondary hover:text-primary   transition-colors"
                                onClick={() => setIsLoginDropdownOpen(false)}
                              >
                                Dashboard
                              </Link>
                            )}
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 text-sm text-red-500 hover:text-secondary cursor-pointer   transition-colors"
                              onClick={() => (
                                setIsLoginDropdownOpen(false), handleLogOut()
                              )}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>

        {/* Desktop Categories */}
        <div className="bg-white">
          <Container className="hidden md:flex items-center justify-between py-2 bg-white">
            <div className="flex items-center">
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {!isLoadingCategory ? (
                  categoriesData.map((category) => (
                    <li
                      key={category.name}
                      className="relative"
                      onMouseEnter={() =>
                        category.subcategories.length > 0 &&
                        setHoveredCategory(category.name)
                      }
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        href={category.path}
                        className="text-[11px] font-medium text-primary hover:text-primary transition-colors relative group py-1 flex items-center"
                        aria-haspopup={
                          category.subcategories.length > 0 ? "menu" : undefined
                        }
                        aria-expanded={
                          hoveredCategory === category.name ? "true" : "false"
                        }
                      >
                        {category.name}
                        {category.subcategories.length > 0 && (
                          <ChevronDown
                            className={`ml-1 h-3 w-3 transition-transform ${
                              hoveredCategory === category.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        )}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </Link>
                      <AnimatePresence>
                        {hoveredCategory === category.name &&
                          category.subcategories.length > 0 && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={popoverVariants as any}
                              className="absolute left-0 top-full z-30 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden"
                            >
                              <ul className="py-1">
                                {category.subcategories.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.path}
                                      className="block px-4 py-2 text-sm text-secondary hover:text-primary transition-colors"
                                      onClick={() => setHoveredCategory(null)}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </li>
                  ))
                ) : (
                  <SkeletonCategories />
                )}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/track"
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/20"
              >
                <Package className="h-4 w-4" />

                <span>Track Order</span>
              </Link>
              <button
                onClick={() => router.push("/cart")}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/20 relative"
                aria-label="View shopping cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </motion.span>
                  )}
                </div>
                <span>Cart</span>
              </button>
              <CartSheet />
            </div>
          </Container>
        </div>

        {/* Mobile Search Overlay */}
        <MobileSearch
          isOpen={isMobileSearchOpen}
          onClose={() => setIsMobileSearchOpen(false)}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants as any}
              className="fixed inset-0 z-50 overflow-y-auto bg-secondary p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="text-2xl font-extrabold text-primary tracking-wide"
                >
                  <Image
                    src={"/logo/logo.png"}
                    width={180}
                    height={80}
                    alt="Main logo of Griipbuddy"
                    className="object-contain"
                  />
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label="Close mobile menu"
                  className="p-2 rounded-md hover:bg-primary/20 transition-colors"
                >
                  <X className="h-6 w-6 text-primary" />
                </button>
              </div>

              <ul className="flex flex-col gap-4 grow mb-5">
                {categoriesData.map((category) => (
                  <li key={category.name}>
                    {category.subcategories.length > 0 ? (
                      <Collapsible
                        open={openMobileSubcategory === category.name}
                        onOpenChange={(isOpen) =>
                          setOpenMobileSubcategory(
                            isOpen ? category.name : null
                          )
                        }
                      >
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-medium text-white hover:text-primary transition-colors py-2">
                          {category.name}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openMobileSubcategory === category.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="grid gap-2 pl-4 py-2">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.path}
                              className="block text-base text-gray-300 hover:text-primary transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenMobileSubcategory(null);
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={category.path}
                        className="text-lg font-medium text-white hover:text-primary transition-colors py-2 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 border-t border-gray-700 flex flex-col gap-3">
                <Link
                  href="tel:+8809647149449"
                  className="flex items-center gap-2 text-base font-medium text-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  <span>+88 09647149449</span>
                </Link>
                <Link
                  href="/track-order"
                  className="flex items-center gap-2 text-base font-medium text-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Track Order</span>
                </Link>
                <Link
                  href="/login"
                  className="text-base font-medium text-white hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-base font-medium text-white hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
                {/* <CartSheet>
                  <button
                    className='flex cursor-pointer items-center gap-2 text-base font-medium text-white hover:text-primary transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <div className='relative'>
                      <ShoppingCart className='h-4 w-4' />
                      {totalItems > 0 && (
                        <span className='absolute -top-2 -right-2 bg-primary text-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </div>
                    <span>Cart ({totalItems})</span>
                  </button>
                </CartSheet> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
