export interface LeatherProduct {
  id: number;
  name: string;
  brand: string;
  img: string;
  rating: number;
  reviews: number;
  priceRegular: number;
  priceDiscount: number;
  sku: string;
  category: string;
  isTrending?: boolean;
}

export const leatherProducts: LeatherProduct[] = [
  // Leather Bags
  {
    id: 1,
    name: "Handmade Leather Handbag",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 234,
    priceRegular: 3500,
    priceDiscount: 2800,
    sku: "DL001",
    category: "bag",
    isTrending: true
  },
  {
    id: 2,
    name: "Premium Leather Backpack",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
    rating: 4.7,
    reviews: 189,
    priceRegular: 4200,
    priceDiscount: 3600,
    sku: "BC002",
    category: "bag"
  },
  {
    id: 4,
    name: "Vintage Leather Messenger Bag",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 178,
    priceRegular: 3800,
    priceDiscount: 3200,
    sku: "HL004",
    category: "bag"
  },

  // Leather Wallets
  {
    id: 5,
    name: "Genuine Leather Wallet",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 342,
    priceRegular: 1200,
    priceDiscount: 950,
    sku: "DL005",
    category: "wallet"
  },
  {
    id: 6,
    name: "RFID Protected Wallet",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 267,
    priceRegular: 1500,
    priceDiscount: 1200,
    sku: "BC006",
    category: "wallet"
  },
  {
    id: 7,
    name: "Compact Card Holder",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.5,
    reviews: 123,
    priceRegular: 800,
    priceDiscount: 650,
    sku: "HL007",
    category: "wallet"
  },
  {
    id: 8,
    name: "Bifold Leather Wallet",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.9,
    reviews: 445,
    priceRegular: 1400,
    priceDiscount: 1100,
    sku: "DL008",
    category: "wallet",
    isTrending: true
  },

  // Leather Belts
  {
    id: 9,
    name: "Classic Leather Belt",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 298,
    priceRegular: 1800,
    priceDiscount: 1500,
    sku: "BC009",
    category: "belt"
  },
  {
    id: 10,
    name: "Formal Black Belt",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 234,
    priceRegular: 2000,
    priceDiscount: 1700,
    sku: "HL010",
    category: "belt"
  },
  {
    id: 11,
    name: "Brown Casual Belt",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 187,
    priceRegular: 1600,
    priceDiscount: 1350,
    sku: "DL011",
    category: "belt"
  },

  // Leather Shoes
  {
    id: 12,
    name: "Handcrafted Oxford Shoe",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.9,
    reviews: 456,
    priceRegular: 6500,
    priceDiscount: 5800,
    sku: "BC012",
    category: "shoes",
    isTrending: true
  },
  {
    id: 13,
    name: "Casual Leather Loafer",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 278,
    priceRegular: 4800,
    priceDiscount: 4200,
    sku: "HL013",
    category: "shoes"
  },
  {
    id: 14,
    name: "Boot Style Formal Shoe",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 334,
    priceRegular: 5500,
    priceDiscount: 4900,
    sku: "DL014",
    category: "shoes"
  },
  {
    id: 15,
    name: "Sports Leather Sneaker",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.5,
    reviews: 198,
    priceRegular: 4200,
    priceDiscount: 3700,
    sku: "BC015",
    category: "shoes"
  },

  // Leather Jackets
  {
    id: 16,
    name: "Vintage Leather Jacket",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.9,
    reviews: 567,
    priceRegular: 12000,
    priceDiscount: 10500,
    sku: "HL016",
    category: "jacket",
    isTrending: true
  },
  {
    id: 17,
    name: "Motorcycle Jacket",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 289,
    priceRegular: 15000,
    priceDiscount: 13200,
    sku: "DL017",
    category: "jacket"
  },
  {
    id: 18,
    name: "Classic Bomber Jacket",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 345,
    priceRegular: 11000,
    priceDiscount: 9500,
    sku: "BC018",
    category: "jacket"
  },

  // More Accessories
  {
    id: 19,
    name: "Leather Key Chain",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.4,
    reviews: 123,
    priceRegular: 450,
    priceDiscount: 350,
    sku: "DL019",
    category: "accessory"
  },
  {
    id: 20,
    name: "Hand-Stitched Gloves",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 167,
    priceRegular: 1800,
    priceDiscount: 1500,
    sku: "HL020",
    category: "accessory"
  },
  {
    id: 21,
    name: "Leather Phone Case",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.5,
    reviews: 234,
    priceRegular: 1200,
    priceDiscount: 980,
    sku: "BC021",
    category: "accessory"
  },
  {
    id: 22,
    name: "Travel Document Holder",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 145,
    priceRegular: 2200,
    priceDiscount: 1900,
    sku: "DL022",
    category: "accessory"
  },
  {
    id: 23,
    name: "Leather Watch Strap",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 189,
    priceRegular: 900,
    priceDiscount: 750,
    sku: "HL023",
    category: "accessory"
  },
  {
    id: 24,
    name: "Jewelry Pouch",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 267,
    priceRegular: 1500,
    priceDiscount: 1200,
    sku: "BC024",
    category: "accessory"
  },

  // Additional Bags
  {
    id: 25,
    name: "Laptop Bag Pro",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
    rating: 4.9,
    reviews: 378,
    priceRegular: 4500,
    priceDiscount: 3900,
    sku: "DL025",
    category: "bag",
    isTrending: true
  },
  {
    id: 26,
    name: "Women's Crossbody Bag",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 298,
    priceRegular: 2800,
    priceDiscount: 2400,
    sku: "HL026",
    category: "bag"
  },
  {
    id: 28,
    name: "Mini Backpack",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
    rating: 4.6,
    reviews: 189,
    priceRegular: 2500,
    priceDiscount: 2100,
    sku: "DL028",
    category: "bag"
  },

  // Additional Wallets & Accessories
  {
    id: 29,
    name: "Long Wallet with Chain",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.5,
    reviews: 156,
    priceRegular: 1800,
    priceDiscount: 1500,
    sku: "HL029",
    category: "wallet"
  },
  {
    id: 30,
    name: "Compact Coin Purse",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.4,
    reviews: 134,
    priceRegular: 650,
    priceDiscount: 520,
    sku: "BC030",
    category: "wallet"
  },
  {
    id: 31,
    name: "Premium Card Case",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.7,
    reviews: 198,
    priceRegular: 1100,
    priceDiscount: 900,
    sku: "DL031",
    category: "wallet"
  },
  {
    id: 32,
    name: "Handmade Book Cover",
    brand: "Heritage Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.8,
    reviews: 167,
    priceRegular: 1600,
    priceDiscount: 1350,
    sku: "HL032",
    category: "accessory"
  },
  {
    id: 33,
    name: "iPad Case Pro",
    brand: "Bengal Craft",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.6,
    reviews: 223,
    priceRegular: 2800,
    priceDiscount: 2400,
    sku: "BC033",
    category: "accessory"
  },
  {
    id: 34,
    name: "Visiting Card Holder",
    brand: "Dhaka Leather",
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    rating: 4.5,
    reviews: 145,
    priceRegular: 800,
    priceDiscount: 650,
    sku: "DL034",
    category: "accessory"
  }
];
