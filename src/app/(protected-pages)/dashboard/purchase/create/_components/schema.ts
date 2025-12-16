import { z } from "zod";

export enum PURCHASE_STATUS_ENUM {
  DRAFT = "draft",
  ORDERED = "ordered",
  RECEIVED = "received",
  CANCELLED = "cancelled",
}

const purchaseItemSchema = z.object({
  variant: z.string().min(1, "Variant ID is required"),
  product: z.string().min(1, "Product ID is required"),
  qty: z.number().min(1, "Quantity must be at least 1").default(1),
  unit_cost: z.coerce.number().nonnegative("Unit cost must be ≥ 0"),
  discount: z.coerce.number().min(0, "Discount must be ≥ 0"),
});

const expenseAppliedSchema = z.object({
  type: z.string().min(1, "Expense type is required"),
  amount: z.number().nonnegative("Expense amount must be ≥ 0"),
  note: z.string().optional(),
});

export const PurchaseSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),

  items: z.array(purchaseItemSchema).min(1, "At least one item is required"),

  expenses_applied: z.array(expenseAppliedSchema).optional(),

  attachments: z.array(z.string().url()).optional(),

  status: z.nativeEnum(PURCHASE_STATUS_ENUM),

  total_cost: z.coerce.number().optional(),

  /* purchase_date: z.coerce.date({
    invalid_type_error: "Invalid purchase date",
  }), */
});
