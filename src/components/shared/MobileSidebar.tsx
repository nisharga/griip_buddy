/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { mobileMenuVariants } from "@/src/types/navbar";
import { categoriesData } from "@/src/static/category";
import { ChevronDown, Package, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MobileSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: any) => {
  const [openMobileSubcategory, setOpenMobileSubcategory] = useState<
    string | null
  >(null);

  const sidebarRef = useRef<HTMLDivElement>(null);

  // ✅ Outside click handler
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants as any}
          ref={sidebarRef}
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
                      setOpenMobileSubcategory(isOpen ? category.name : null)
                    }
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-white hover:text-primary transition-colors py-2">
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
                          className="block text-sm text-gray-300 hover:text-primary transition-colors"
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
                    className="text-sm font-medium text-white hover:text-primary transition-colors py-2 block"
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
  );
};

export default MobileSidebar;
