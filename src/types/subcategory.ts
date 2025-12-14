import { TCategory } from "./category";
import { TProduct } from "./product";

export type TSubCategory = {
 _id: string;
 id: string; // convenience id from API
 name: string;
 description?: string;
 serial: number;
 slug: string;
 category: string | TCategory; // API returns id string; keep union for flexibility
 products: TProduct[];
 created_by: string;
 createdAt: string;
 updatedAt: string;
};
