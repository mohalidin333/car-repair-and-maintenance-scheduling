import z from "zod";

export const InventorySchema = z.object({
  category: z.enum(["Product", "Part"]),
  item_name: z.string().min(1, "Item name is required"),
  stock: z.number().min(1, "Stock is required"),
  unit_price: z.number().min(1, "Unit price is required"),
});
