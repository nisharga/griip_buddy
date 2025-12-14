/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from "./category";
import { TSubCategory } from "./subcategory";

export type TVariantCombination = {
 _id: string;
 attribute_values: {
  [key: string]: string; // e.g., { Size: "M", Color: "Red" }
 };

 regular_price: number;
 sale_price: number;
 sku: string;
 barcode: string;
 //  available_quantity: number;
 image?: string; // optional: image for this variant
};

export interface IProductSaleChannels {
 website?: boolean;
 pos?: boolean;
 [key: string]: boolean | undefined; // dynamic future channels
}

// Main Product interface
export type TProduct = {
 _id: string;
 id: string;

 // Basic Info
 name: string;
 slug: string;
 description: string;
 sale_channels: IProductSaleChannels;
 sku?: string;

 // Images
 thumbnail: string;
 slider_images?: string[];

 // Stock & Order Constraints
 min_order_qty?: number;
 max_order_qty?: number;
 total_sold?: number;

 attributes: string[];
 variants: Array<{
  attributes: string[];
  attribute_values: Record<string, string>;
  regular_price: number;
  sale_price: number;
  sku: string;
  available_quantity: number;
  _id: string;
 }>;

 // Delivery & Offers
 approximately_delivery_time: string; // default is "4 to 5 days"
 is_free_delivery?: boolean;
 coin_per_order?: number;
 shipping_cost?: number;
 shipping_cost_per_unit?: number;

 // Policy
 warranty?: string;
 return_policy?: string;

 // Ratings & Reviews
 total_rating?: number;
 reviews?: {
  rating: number;
  comment: string;
  user: any;
  images?: string[];
 }[];

 // Tags
 search_tags?: string[];
 offer_tags?: string[];

 // Social Links
 social_links?: {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
 };

 // Category Reference
 category: TCategory;
 subcategory: TSubCategory;

 // Visibility
 is_published?: boolean;
 stocks?: any;

 createdAt: string;
 updatedAt: string;
};

export type TProductInventory = {
 _id: string;
 product: string;
 attributes: string[];
 variants: Array<{
  attribute_values: Record<string, string>;
  regular_price: number;
  sale_price: number;
  sku: string;
  available_quantity: number;
  _id: string;
 }>;
 outlet: null;
 warehouse: {
  _id: string;
  name: string;
  slug: string;
  location: {
   latitude: number;
   longitude: number;
   _id: string;
  };
  address: {
   division: string;
   district: string;
   thana: string;
   local_address: string;
   _id: string;
  };
  type: string;
  createdAt: string;
  updatedAt: string;
 };
 createdAt: string;
 updatedAt: string;
};

// === warehouse ===
type Location = {
 latitude: number;
 longitude: number;
 _id: string;
};

type Address = {
 division: string;
 district: string;
 thana: string;
 local_address: string;
 _id: string;
};
export type TWarehouse = {
 _id: string;
 name: string;
 slug: string;
 location: Location;
 address: Address;
 type: "WAREHOUSE";
 createdAt: string;
 updatedAt: string;
};

// === outlet ===
export type TBusinessLocation = {
 _id: string;
 name: string;
 slug: string;
 type: "OUTLET" | "WAREHOUSE";
 location: Location;
 address: Address;
 createdAt: string;
 updatedAt: string;
};

// === invententory ===
export type TInventory = {
 _id: string;
 product: TProduct;
 attributes: string[];
 variants: TVariantCombination[];
 outlet: TBusinessLocation | null;
 warehouse: TWarehouse | null;
 createdAt: string;
 updatedAt: string;
};



// IProduct

 


export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string; // HTML string
  thumbnail?: string;
  slider_images: string[];
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  offer_tags: string[];
  search_tags: string[];
  ratings: {
    average: number;
    total: number;
  };
  warranty: string;
  return_policy: string;
  is_free_delivery: boolean;
  is_pre_order: boolean;
  is_published: boolean;
  approximately_delivery_time: string;
  shipping_cost: number;
  shipping_cost_per_unit: number;
  coin_per_order: number;
  min_order_qty: number;
  max_order_qty: number;
  total_sold: number;
  current_stock_qty?: number;
  variants?: {
    price: number;
    sku: string;
    available_quantity: number;
    discount: number;
    image?: string;
    attribute_values: Record<string, string>;
  }[];
  order_from?: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  id?: string;
}

