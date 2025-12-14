import productImg1 from "@/assets/img/1.png";
import productImg2 from "@/assets/img/2.png";
import productImg3 from "@/assets/img/3.png";
import productImg4 from "@/assets/img/4.png";
import productImg5 from "@/assets/img/5.png";
import productImg6 from "@/assets/img/6.png";
import productImg7 from "@/assets/img/7.png";
import productImg8 from "@/assets/img/8.png";
import productImg9 from "@/assets/img/9.png";
import productImg10 from "@/assets/img/10.png";
import { StaticImageData } from "next/image";
// import { Product, ProductReview } from "@/app/(home)/details/[id]/page";

export interface Product_data {
  id: string;
  name: string;
  img: StaticImageData;
  sku: string;
  priceRegular: number;
  priceDiscount: number;
  availableSizes: number[];
  brand: string;
  status: string;
  rating?: number;
  reviews?: number;
  mdDescription?: string;
}

export const product_data = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    brand: "Sony",
    category: "Audio",
    description:
      "Immersive sound, active noise cancellation, 30h battery life.",
    price: 299.99,
    discountPercentage: 15,
    stock: 50,
    rating: 4.7,
    thumbnail:
      "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg",
    images: [
      "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg",
      "https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg",
    ],
    features: ["Active NC", "30h battery", "Touch control"],
    specs: { Bluetooth: "5.0", Weight: "254 g", Battery: "30 h" },
  },
  {
    id: "2",
    name: "Smart Fitness Band 7",
    brand: "Xiaomi",
    category: "Wearables",
    description: "AMOLED display, heart rate & sleep tracking, 14‑day battery.",
    price: 59.99,
    discountPercentage: 10,
    stock: 200,
    rating: 4.5,
    thumbnail:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    images: [
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    ],
    features: ["AMOLED", "HR monitor", "5 ATM waterproof"],
    specs: { Display: "1.62″", Battery: "14 days", Waterproof: "50 m" },
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker BoomX",
    brand: "JBL",
    category: "Audio",
    description: "Waterproof, compact, 12 h playtime with punchy bass.",
    price: 89.0,
    discountPercentage: 20,
    stock: 120,
    rating: 4.6,
    thumbnail:
      "https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg",
    images: [
      "https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg",
      "https://images.pexels.com/photos/764520/pexels-photo-764520.jpeg",
    ],
    features: ["IPX7 water‑proof", "12 h playtime", "Portable size"],
    specs: { Power: "20 W", Bluetooth: "5.1", Weight: "540 g" },
  },
  {
    id: "4",
    name: "1080p Smart Home Camera",
    brand: "TP‑Link",
    category: "Smart Home",
    description: "Night vision, motion alerts, works with Alexa/Google.",
    price: 39.99,
    discountPercentage: 12,
    stock: 80,
    rating: 4.4,
    thumbnail:
      "https://images.pexels.com/photos/648988/pexels-photo-648988.jpeg",
    images: [
      "https://images.pexels.com/photos/648988/pexels-photo-648988.jpeg",
      "https://images.pexels.com/photos/1050313/pexels-photo-1050313.jpeg",
    ],
    features: ["Night vision", "2‑way audio", "Motion detection"],
    specs: { Resolution: "1080p", Storage: "SD/Cloud", Connectivity: "Wi‑Fi" },
  },
  {
    id: "5",
    name: "Wireless Charging Dock 3‑in‑1",
    brand: "Belkin",
    category: "Accessories",
    description: "Charge phone, earbuds & watch simultaneously, fast 18 W.",
    price: 69.99,
    discountPercentage: 18,
    stock: 60,
    rating: 4.2,
    thumbnail:
      "https://images.pexels.com/photos/1092640/pexels-photo-1092640.jpeg",
    images: [
      "https://images.pexels.com/photos/1092640/pexels-photo-1092640.jpeg",
      "https://images.pexels.com/photos/1092641/pexels-photo-1092641.jpeg",
    ],
    features: ["3‑device charge", "Fast charge", "Sleek design"],
    specs: { Input: "18 W", Compatibility: "iOS/Android", Material: "Alu/ABS" },
  },
  {
    id: "6",
    name: "Smartphone Gimbal Stabilizer Pro",
    brand: "DJI",
    category: "Photography",
    description: "3‑axis gimbal, intelligent tracking, foldable & ergonomic.",
    price: 129.0,
    discountPercentage: 10,
    stock: 70,
    rating: 4.8,
    thumbnail:
      "https://images.pexels.com/photos/621783/pexels-photo-621783.jpeg",
    images: [
      "https://images.pexels.com/photos/621783/pexels-photo-621783.jpeg",
      "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
    ],
    features: ["3‑axis stab", "Gesture control", "Foldable"],
    specs: { Runtime: "15 h", Weight: "405 g", App: "DJI Mimo" },
  },
  {
    id: "7",
    name: "Wireless Mechanical Keyboard RGB",
    brand: "Keychron",
    category: "Computer Accessories",
    description: "75% layout, hot‑swappable switches, ble plus wired mode.",
    price: 89.99,
    discountPercentage: 12,
    stock: 150,
    rating: 4.6,
    thumbnail:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    images: [
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
      "https://images.pexels.com/photos/159292/pexels-photo-159292.jpeg",
    ],
    features: ["RGB backlight", "Hot‑swap", "Dual‑mode"],
    specs: { Switch: "Gateron Brown", Battery: "4000 mAh", Layout: "75%" },
  },
  {
    id: "8",
    name: "Smartwatch S9 Pro",
    brand: "Amazfit",
    category: "Wearables",
    description: "GPS, music control, NFC & 12‑day battery life.",
    price: 129.99,
    discountPercentage: 15,
    stock: 90,
    rating: 4.3,
    thumbnail:
      "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg",
    images: [
      "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg",
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    ],
    features: ["HR monitor", "GPS", "5ATM water"],
    specs: { Display: "1.43″ AMOLED", Battery: "12 days", NFC: "Yes" },
  },
  {
    id: "9",
    name: "USB‑C 10‑in‑1 Hub",
    brand: "Anker",
    category: "Accessories",
    description: "Includes HDMI4K, USB3.0, SD, Ethernet & power passthrough.",
    price: 59.95,
    discountPercentage: 8,
    stock: 130,
    rating: 4.7,
    thumbnail:
      "https://images.pexels.com/photos/5082575/pexels-photo-5082575.jpeg",
    images: [
      "https://images.pexels.com/photos/5082575/pexels-photo-5082575.jpeg",
      "https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg",
    ],
    features: ["4K HDMI", "Gigabit LAN", "SD/TF slots"],
    specs: { HDMI: "4K@30Hz", USB3: "×3", LAN: "1 Gbps" },
  },
  {
    id: "10",
    name: "4K UHD Streaming Stick",
    brand: "Amazon Fire TV",
    category: "Streaming Devices",
    description: "4K/HDR, Dolby Atmos, Alexa voice remote.",
    price: 49.99,
    discountPercentage: 10,
    stock: 140,
    rating: 4.6,
    thumbnail: "https://images.pexels.com/photos/8254/pexels-photo.jpg",
    images: [
      "https://images.pexels.com/photos/8254/pexels-photo.jpg",
      "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg",
    ],
    features: ["4K HDR", "Voice remote", "Dolby Atmos"],
    specs: { Output: "4K UHD", Connectivity: "Wi‑Fi/HDMI", Audio: "Dolby" },
  },
];

export type SearchProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number; // percentage
};

export const mockSearchData: SearchProduct[] = [
  {
    id: "prod001",
    name: "Wireless Earbuds",
    image: "/placeholder.svg?height=60&width=60",
    price: 49.99,
    discount: 10,
  },
  {
    id: "prod002",
    name: "Smart Watch",
    image: "/placeholder.svg?height=60&width=60",
    price: 129.99,
    discount: 15,
  },
  {
    id: "prod003",
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=60&width=60",
    price: 89.99,
    discount: 5,
  },
  {
    id: "prod004",
    name: "Portable Power Bank",
    image: "/placeholder.svg?height=60&width=60",
    price: 39.99,
    discount: 0,
  },
  {
    id: "prod005",
    name: "Noise-Cancelling Headphones",
    image: "/placeholder.svg?height=60&width=60",
    price: 149.99,
    discount: 20,
  },
  {
    id: "prod006",
    name: "USB-C Charging Cable",
    image: "/placeholder.svg?height=60&width=60",
    price: 12.99,
    discount: 0,
  },
  {
    id: "prod007",
    name: "Webcam 1080p HD",
    image: "/placeholder.svg?height=60&width=60",
    price: 79.99,
    discount: 10,
  },
  {
    id: "prod008",
    name: "Smartphone Tripod",
    image: "/placeholder.svg?height=60&width=60",
    price: 29.99,
    discount: 0,
  },
  {
    id: "prod009",
    name: "LED Ring Light",
    image: "/placeholder.svg?height=60&width=60",
    price: 34.99,
    discount: 5,
  },
  {
    id: "prod010",
    name: "Wireless Charging Pad",
    image: "/placeholder.svg?height=60&width=60",
    price: 24.99,
    discount: 0,
  },
  {
    id: "prod011",
    name: "Mini Bluetooth Keyboard",
    image: "/placeholder.svg?height=60&width=60",
    price: 59.99,
    discount: 0,
  },
  {
    id: "prod012",
    name: "USB Flash Drive 128GB",
    image: "/placeholder.svg?height=60&width=60",
    price: 19.99,
    discount: 0,
  },
  {
    id: "prod013",
    name: "Wireless Mouse",
    image: "/placeholder.svg?height=60&width=60",
    price: 14.99,
    discount: 0,
  },
  {
    id: "prod014",
    name: "Smart Home Plug",
    image: "/placeholder.svg?height=60&width=60",
    price: 24.99,
    discount: 10,
  },
  {
    id: "prod015",
    name: "Laptop Cooling Pad",
    image: "/placeholder.svg?height=60&width=60",
    price: 39.99,
    discount: 0,
  },
];

// Hardcoded product data
export const product = {
  id: "prod-001",
  name: "Premium Wireless Bluetooth Headphones",
  brand: "AudioTech Pro",
  price: 199.99,
  originalPrice: 299.99,
  rating: 4.8,
  reviewCount: 1247,
  description:
    "Experience unparalleled sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, premium materials, and all-day comfort. Perfect for music enthusiasts, professionals, and anyone who demands the best audio experience. These headphones combine cutting-edge technology with elegant design to deliver an exceptional listening experience that will transform how you enjoy music, podcasts, and calls.",
  features: [
    "Active Noise Cancellation (ANC)",
    "40-hour battery life",
    "Premium leather ear cushions",
    "Hi-Res Audio certified",
    "Quick charge: 10 min = 5 hours",
    "Multi-device connectivity",
  ],
  specifications: {
    "Driver Size": "40mm dynamic drivers",
    "Frequency Response": "20Hz - 40kHz",
    Impedance: "32 ohms",
    "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
    "Charging Time": "2 hours",
    Weight: "285g",
    Connectivity: "Bluetooth 5.3, USB-C, 3.5mm",
    Warranty: "2 years",
  },
  images: [
    {
      id: "img-1",
      url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      alt: "Main product view",
    },
    {
      id: "img-2",
      url: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
      alt: "Side view",
    },
    {
      id: "img-3",
      url: "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg",
      alt: "Detail view",
    },
    {
      id: "img-4",
      url: "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg",
      alt: "Lifestyle shot",
    },
  ],
  sizes: [{ id: "size-1", name: "Size", value: "One Size", available: true }],
  colors: [
    {
      id: "color-1",
      name: "Color",
      value: "Midnight Black",
      available: true,
    },
    { id: "color-2", name: "Color", value: "Pearl White", available: true },
    { id: "color-3", name: "Color", value: "Rose Gold", available: false },
  ],
  inStock: true,
  stockCount: 27,
  sku: "AT-WH-001",
};

export const reviews = [
  {
    id: "rev-1",
    author: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    rating: 5,
    date: "2024-01-15",
    title: "Exceptional sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is pristine. Perfect for my daily commute and work from home setup.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Michael Chen",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    rating: 5,
    date: "2024-01-10",
    title: "Best purchase I've made this year",
    content:
      "The battery life is amazing - I can go days without charging. The comfort level is outstanding even during long listening sessions.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Emma Davis",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 4,
    date: "2024-01-08",
    title: "Great headphones with minor issues",
    content:
      "Love the sound quality and build. The only minor issue is that the touch controls can be a bit sensitive sometimes. Overall, highly recommended!",
    verified: true,
  },
];
