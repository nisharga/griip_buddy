import { TProduct } from "./product";
import { TSubCategory } from "./subcategory";

// types/category.ts
export type TCategory = {
 _id: string;
 id: string; // convenience id from API
 name: string;
 image: string;
 slug: string;
 serial: number;
 status: "pending_approval" | "approved" | "disabled" | "rejected";
 created_by: string;
 subcategories?: TSubCategory[];
 products?: TProduct[];
 createdAt: string;
 updatedAt: string;
 subcategories_count: number;
 products_count: number;
};
