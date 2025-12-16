/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 Home, 
 Package, 
 CreditCard, 
 ArrowRight,
} from "lucide-react";

export interface NavItem {
 title: string;
 icon: any;
 href: string;
 badge?: string | number;
}

export interface NavSection {
 title: string;
 items: NavItem[];
}

export const vendorRoutes: NavSection[] = [
 {
  title: "",
  items: [
   {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
   },
  ],
 },
 {
  title: "PRODUCT MANAGEMENT",
  items: [
   {
    title: "Product List",
    icon: Package,
    href: "/dashboard/products",
   },
   {
    title: "Add Product",
    icon: Package,
    href: "/dashboard/products/create",
   },
  ],
 },
 {
  title: "STOCKS MANAGEMENT",
  items: [
   {
    title: "All Purchase",
    icon: Package,
    href: "/dashboard/purchase/all",
   },
   {
    title: "Add Purchase & Stock",
    icon: Package,
    href: "/dashboard/purchase/create",
   },
  ],
 },
 {
  title: "ORDER MANAGEMENT",
  items: [
   {
    title: "Orders",
    icon: Package,
    href: "/dashboard/orders",
   },
  ],
 },

 {
  title: "OTHERS",
  items: [
   {
    title: "Withdraw",
    icon: CreditCard,
    href: "/dashboard/withdraw",
   },
   {
    title: "Log Out",
    icon: ArrowRight,
    href: "#logout",
   },
  ],
 },
 // {
 //   title: "HELP & SUPPORT",
 //   items: [
 //     {
 //       title: "Setup Guide",
 //       icon: HelpCircle,
 //       href: "/setup",
 //       badge: "4",
 //     },
 //   ],
 // },
 // {
 //   title: "REPORTS & ANALYTICS",
 //   items: [
 //     {
 //       title: "Analytics",
 //       icon: BarChart3,
 //       href: "/analytics",
 //     },
 //   ],
 // },
];
