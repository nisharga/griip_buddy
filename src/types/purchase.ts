/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TBusinessLocation, TProduct, TVariantCombination } from "./product";
// import { TSupplier } from "./supplier";
// import { TUser } from "./user";
 
import { IProduct, TBusinessLocation } from "./product";
import { TSupplier } from "./supplier";

export interface IPurchase {
 _id: string;
 created_by: any; // "User" // req.user.id same
 received_by: any; // "User" // req.user.id same
 received_at: Date;
 location: TBusinessLocation;
 purchase_number: number; // incremental
 supplier: TSupplier;
 status: PURCHASE_STATUS_ENUM;
 total_cost: number;
 items: IPurchaseItem[];
 expenses_applied: IExpenseApplied[];
 attachments?: string[];
 created_at: Date;
 updated_at: Date;
 purchase_date: Date;
}

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


export interface IPurchaseItem {
 variant: TVariantCombination; // "VariantCombination"
 product: IProduct;
 qty: number;
 unit_cost: number;
 discount: number;
 tax: number;
 lot_number?: string;
 expiry_date?: Date;
}

export interface IExpenseApplied {
 type: string;
 amount: number;
 note: string;
}

export enum PURCHASE_STATUS_ENUM {
 DRAFT = "draft",
 ORDERED = "ordered",
 RECEIVED = "received",
 CANCELLED = "cancelled",
}

export const PURCHASE_STATUSES = [
 PURCHASE_STATUS_ENUM.DRAFT,
 PURCHASE_STATUS_ENUM.ORDERED,
 PURCHASE_STATUS_ENUM.RECEIVED,
 PURCHASE_STATUS_ENUM.CANCELLED,
];
