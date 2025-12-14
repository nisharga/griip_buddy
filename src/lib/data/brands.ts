/* eslint-disable @typescript-eslint/no-explicit-any */
import appleLogo from "../../assets/brands/apple-black-logo-svgrepo-com.svg";
import samsungLogo from "../../assets/brands/samsung-logo-svgrepo-com.svg";
import sonyLogo from "../../assets/brands/sony-2-logo-svgrepo-com.svg";
import asusLogo from "../../assets/brands/asus-6630-logo-svgrepo-com.svg";
import dellLogo from "../../assets/brands/dell-2-logo-svgrepo-com.svg";
import lenovoLogo from "../../assets/brands/lenovo-1-logo-svgrepo-com.svg";
import nokiaLogo from "../../assets/brands/nokia-3-logo-svgrepo-com.svg";
import vivoLogo from "../../assets/brands/vivo-1-logo-svgrepo-com.svg";
import boseLogo from "../../assets/brands/bose-logo-svgrepo-com.svg";
import jblLogo from "../../assets/brands/jbl-2-logo-svgrepo-com.svg";
import ciscoLogo from "../../assets/brands/cisco-2-logo-svgrepo-com.svg";

export interface Brand {
  name: string;
  image: any; // SVG component type
  description?: string;
  rating: number;
  productCount: number;
  reviewCount: number;
}

export const brands: Brand[] = [
  {
    name: "Apple",
    image: appleLogo,
    description: "Innovative technology and premium design.",
    rating: 4.1,
    reviewCount: 11,
    productCount: 55,
  },
  {
    name: "Samsung",
    image: samsungLogo,
    description: "Leading in mobile and smart home technology.",
    rating: 4.3,
    reviewCount: 15,
    productCount: 68,
  },
  {
    name: "Sony",
    image: sonyLogo,
    description: "Entertainment and electronics with a legacy of quality.",
    rating: 4.0,
    reviewCount: 9,
    productCount: 42,
  },
  {
    name: "Asus",
    image: asusLogo,
    description: "High-performance laptops and gaming hardware.",
    rating: 4.2,
    reviewCount: 8,
    productCount: 35,
  },
  {
    name: "Dell",
    image: dellLogo,
    description: "Business and consumer computing solutions.",
    rating: 4.0,
    reviewCount: 7,
    productCount: 40,
  },
  {
    name: "Lenovo",
    image: lenovoLogo,
    description: "Innovative PCs and smart devices.",
    rating: 3.9,
    reviewCount: 6,
    productCount: 38,
  },
  {
    name: "Nokia",
    image: nokiaLogo,
    description: "Reliable mobile devices and telecommunications.",
    rating: 3.8,
    reviewCount: 5,
    productCount: 25,
  },
  {
    name: "Vivo",
    image: vivoLogo,
    description: "Innovative smartphones with cutting-edge camera technology.",
    rating: 4.0,
    reviewCount: 7,
    productCount: 30,
  },
  {
    name: "Bose",
    image: boseLogo,
    description: "Premium audio equipment and accessories.",
    rating: 4.4,
    reviewCount: 10,
    productCount: 28,
  },
  {
    name: "JBL",
    image: jblLogo,
    description: "High-quality speakers and audio solutions.",
    rating: 4.2,
    reviewCount: 8,
    productCount: 32,
  },
  {
    name: "Cisco",
    image: ciscoLogo,
    description: "Enterprise networking and communication solutions.",
    rating: 4.1,
    reviewCount: 6,
    productCount: 20,
  },
];
