"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { getUser, removeUser, removeVendorId } from "../store/user";
import { useLogoutMutation } from "@/redux/api/auth-api";
import {
  ProfileDetailsContainerVariants,
  ProfileDetailsItemVariants,
  SIDEBAR_MENUS,
  SIDEBAR_MENUS_VENDOR,
} from "./authNavItems";
import { removeAccessToken } from "@/lib/cookies";

export const handleLogout = () => {
  removeAccessToken();
  removeUser();
  removeVendorId();
  window.location.href = "/";
};

const AuthNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [labelSelect, setLabelSelect] = useState("");

  // base on role sidebar show
  const user = getUser();
  const NAV_ITEMS =
    user?.role === "customer" ? SIDEBAR_MENUS : SIDEBAR_MENUS_VENDOR;

  // logout
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const activeItem =
      SIDEBAR_MENUS.find((item) => item?.route === pathname) ||
      SIDEBAR_MENUS_VENDOR?.find((item) => item?.route === pathname);
    if (activeItem) {
      setLabelSelect(activeItem.label);
    }
  }, [pathname]);

  const handleDropdownClick = (route: string, label: string) => {
    setDropdownOpen(false);
    setLabelSelect(label);
    router.push(route);
  };

  return (
    <>
      <motion.div
        className="hidden lg:flex border-r-2 border-primary flex-col p-4"
        initial="hidden"
        animate="visible"
        variants={ProfileDetailsContainerVariants}
      >
        {NAV_ITEMS?.map((item) => {
          const isActive = pathname === item?.route;
          return (
            <motion.div
              key={item?.id}
              variants={ProfileDetailsItemVariants}
              className={`mb-2 p-2.5 rounded-md transition-colors duration-300 
                cursor-pointer ${
                  isActive ? "font-semibold" : "hover:font-semibold"
                }`}
            >
              {item?.id === 5 ? (
                <button onClick={handleLogout}>{item?.label}</button>
              ) : (
                <Link href={item?.route ?? ""}>{item?.label}</Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="lg:hidden p-4 relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex justify-between items-center p-3 border 
                    rounded-md shadow-md bg-white cursor-pointer"
        >
          {labelSelect ? labelSelect : "Profile Details"}
          <ChevronDown
            className={`transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute w-[95%] mt-2 border rounded-md shadow-md bg-white z-10"
            >
              {NAV_ITEMS?.map((item) => (
                <>
                  {item?.id === 5 ? (
                    <motion.div
                      key={item?.id}
                      className={`p-2.5 border-b last:border-b-0 cursor-pointer 
                  ${
                    pathname === item?.route
                      ? "font-medium lg:font-semibold text-purple-600"
                      : "hover:bg-gray-100"
                  }`}
                      onClick={handleLogout}
                    >
                      {item?.label}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item?.id}
                      className={`p-2.5 border-b last:border-b-0 cursor-pointer 
                  ${
                    pathname === item?.route
                      ? "font-medium lg:font-semibold text-[#057ec1]"
                      : "hover:bg-gray-100"
                  }`}
                      onClick={() => {
                        handleDropdownClick(
                          item?.route ?? "/",
                          item?.label ?? ""
                        );
                      }}
                    >
                      {item?.label}
                    </motion.div>
                  )}
                </>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AuthNav;
