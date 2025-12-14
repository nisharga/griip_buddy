import { z } from "zod";

export const ProductSchema = z.object({
 // Basic Info
 name: z
  .string({
   required_error: "Product Name is required",
  })
  .min(3, { message: "Product Name must be at least 3 characters" }),

 description: z.string().optional(),
 sale_channels: z.object({
  pos: z.boolean(),
  website: z.boolean(),
 }),
 // Images
 //  thumbnail: z
 //   .string()
 //   .url({ message: "Thumbnail must be a valid URL" })
 //   .optional(),
 //  slider_images: z
 //   .array(z.string().url({ message: "Slide image must be a valid URL" }))
 //   .optional(),

 // Shipping
 shipping_cost: z.coerce
  .number({
   required_error: "Shipping cost is required",
  })
  .min(0),

 shipping_cost_per_unit: z.coerce.number().min(0).default(0),

 // Quantity
 min_order_qty: z.coerce.number().min(1).default(1),
 max_order_qty: z.coerce.number().min(1).optional(),

 // Delivery & Incentives
 approximately_delivery_time: z.string({
  required_error: "Delivery time is required",
 }),

 is_free_delivery: z.boolean(),

 //  coin_per_order: z.coerce.number().min(0).optional(),

 // Policies
 warranty: z.string().optional(),
 return_policy: z.string().optional(),

 // Tags
 search_tags: z.array(z.string()).optional(),
 offer_tags: z.array(z.string()).optional(),

 // Attributes (flat structure like from dropdowns or checkboxes)
 //  attributes: z.array(z.string()).optional(),

 //  // Variants
 //  variants: z
 //   .array(
 //    z.object({
 //     attribute_values: z.record(z.string(), z.string()), // e.g. { Size: "M", Color: "Red" }
 //     regular_price: z.coerce.number({
 //      required_error: "Variant regular price is required",
 //     }),
 //     sale_price: z.coerce.number({
 //      required_error: "Variant sale price is required",
 //     }),
 //     sku: z.string({ required_error: "Variant SKU is required" }),
 //     // available_quantity: z.coerce
 //     //  .number({
 //     //   required_error: "Available quantity is required",
 //     //  })
 //     //  .min(0, { message: "Available quantity cannot be negative" }),
 //     image: z.string().url().optional(),
 //    }),
 //   )
 //   .optional(),

 // Social Links
 //  social_links: z
 //   .object({
 //    facebook: z.string().url().optional(),
 //    instagram: z.string().url().optional(),
 //    youtube: z.string().url().optional(),
 //    tiktok: z.string().url().optional(),
 //   })
 //   .optional(),

 // Relations (with ObjectId format)
 category: z.string({
  required_error: "Category ID is required",
 }),

 subcategory: z.string({
  required_error: "Sub-category ID is required",
 }),
});
