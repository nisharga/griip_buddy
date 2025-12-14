export interface SearchProduct {
  id: string
  name: string
  price: number
  discount: number
  image?: string
}

export interface Category {
  name: string
  path: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  name: string
  path: string
}

export const categoriesData: Category[] = [
  {
    name: "SMARTPHONES",
    path: "/category/smartphones",
    subcategories: [
      { name: "Android Phones", path: "/category/smartphones/android" },
      { name: "iPhones", path: "/category/smartphones/iphone" },
    ],
  },
  {
    name: "LAPTOPS",
    path: "/category/laptops",
    subcategories: [
      { name: "Gaming Laptops", path: "/category/laptops/gaming" },
      { name: "Ultrabooks", path: "/category/laptops/ultrabooks" },
      { name: "MacBooks", path: "/category/laptops/macbooks" },
    ],
  },
  {
    name: "TABLETS",
    path: "/category/tablets",
    subcategories: [
      { name: "Android Tablets", path: "/category/tablets/android" },
      { name: "iPads", path: "/category/tablets/ipads" },
    ],
  },
  {
    name: "ACCESSORIES",
    path: "/category/accessories",
    subcategories: [
      { name: "Chargers & Cables", path: "/category/accessories/chargers-cables" },
      { name: "Power Banks", path: "/category/accessories/power-banks" },
      { name: "Cases & Covers", path: "/category/accessories/cases-covers" },
    ],
  },
  {
    name: "WEARABLES",
    path: "/category/wearables",
    subcategories: [
      { name: "Smartwatches", path: "/category/wearables/smartwatches" },
      { name: "Fitness Bands", path: "/category/wearables/fitness-bands" },
    ],
  },
  {
    name: "AUDIO",
    path: "/category/audio",
    subcategories: [
      { name: "Headphones", path: "/category/audio/headphones" },
      { name: "Earbuds", path: "/category/audio/earbuds" },
      { name: "Speakers", path: "/category/audio/speakers" },
    ],
  },
  {
    name: "COMPUTER ACCESSORIES",
    path: "/category/computer-accessories",
    subcategories: [
      { name: "Keyboards", path: "/category/computer-accessories/keyboards" },
      { name: "Mice", path: "/category/computer-accessories/mice" },
      { name: "External Storage", path: "/category/computer-accessories/storage" },
    ],
  },
  {
    name: "OTHERS",
    path: "/category/others",
    subcategories: [],
  },
]

export const trendingSearches = [
  "iPhone 15 Pro",
  "MacBook Air M3",
  "AirPods Pro",
  "Galaxy S24",
  "Gaming Laptop",
  "Wireless Charger",
]

export const popoverVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export const mobileMenuVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0%",
    opacity: 1,
    transition: {
      stiffness: 80,
      damping: 20,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export const mobileSearchOverlayVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export const searchInputVariants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export const resultsVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
}

export const resultItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}
