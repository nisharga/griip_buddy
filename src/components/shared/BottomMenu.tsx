"use client";
import React from "react";
import { Gift, User, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/store";
import { selectCartCount } from "@/src/redux/features/cart-slice";

const BottomMenu = () => {
  const menuLinks = [
    {
      name: "Offers",
      href: "/offers",
      icon: Gift,
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      count: 2,
    },
    {
      name: "Orders",
      href: "/orders",
      icon: ShoppingCart,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const cartCount = useAppSelector(selectCartCount);
  const totalItems = cartCount;

  return (
    <div className="bg-secondary md:hidden text-white p-4 fixed bottom-0 w-full flex justify-between items-center z-50">
      {menuLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex flex-col items-center text-xs relative"
        >
          <link.icon className="h-6 text-primary w-6 mb-1" />
          <span>{link.name}</span>
          {link.name === "Cart" && totalItems > 0 && (
            <span className="text-xs bg-red-500 text-white absolute -top-1 -right-1 rounded-full px-2">
              {totalItems}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default BottomMenu;
