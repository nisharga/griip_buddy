/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICategoryFull {
  _id: string;
  name: string;
  image: string;
  slug: string;
  serial: number;
  status: string;
  created_by: string;
  subcategories: string[];
  products: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubcategoryFull {
  _id: string;
  name: string;
  description: string;
  serial: number;
  slug: string;
  category: string;
  created_by: string;
  products: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IVariantFull {
  _id: string;
  attributes: string[];
  attribute_values: Record<string, string>; // key-value pair
  regular_price: number;
  sale_price: number;
  sku: string;
  barcode: string;
  product: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductFull {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: ICategoryFull;
  subcategory: ISubcategoryFull;
  min_order_qty: number;
  max_order_qty: number;
  total_sold: number;
  approximately_delivery_time: string;
  is_free_delivery: boolean;
  coin_per_order: number;
  shipping_cost: number;
  shipping_cost_per_unit: number;
  warranty: string;
  return_policy: string;
  search_tags: string[];
  offer_tags: string[];
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  variants: IVariantFull[];
  min_price: number;
  max_price: number;
}
