/* eslint-disable @typescript-eslint/no-explicit-any */
// types/IStock.ts

export interface IStock {
  _id: string;
  available_quantity: number;
  qty_reserved: number;
  status: string;
  serial: number;
  image: string;
  name: string;
  slug: string;
  total_sold: number;

  createdAt: string;
  updatedAt: string;
  created_by: string;
  __v: number;

  category?: string;
  subcategories?: string[];
  products?: string[];
  histories?: any[];

  // Nested relations
  location: ILocation;
  product: IProduct;
  variant: IVariant;
  subcategory?: ISubcategory;
}

// ---------- Nested Types ----------

export interface ILocation {
  _id: string;
  name: string;
  slug: string;
  type: string; // warehouse / store / etc.
  description?: string;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAddress {
  division: string;
  district: string;
  thana: string;
  zip_code: string;
  local_address: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  vendor: string;

  status: string; // approved | rejected | pending
  is_free_delivery: boolean;
  is_pre_order: boolean;
  is_published: boolean;

  min_order_qty: number;
  max_order_qty: number;
  coin_per_order: number;
  warranty?: string;
  return_policy?: string;

  thumbnail: string;
  slider_images: string[];
  search_tags: string[];
  offer_tags: string[];
  notes: string[];

  sale_channels: {
    pos: boolean;
    website: boolean;
  };

  ratings: {
    average: number;
    total: number;
  };

  total_sold: number;
  approximately_delivery_time?: string;
  shipping_cost: number;
  shipping_cost_per_unit: number;
  sku: string;

  social_links: string[];

  variants: string[];

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IVariant {
  _id: string;
  product: string;
  sku: string;
  barcode: string;
  regular_price: number;
  sale_price: number;

  attributes: string[];
  attribute_values: Record<string, string>; // dynamic key-value pairs

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  products: string[];
  serial: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
