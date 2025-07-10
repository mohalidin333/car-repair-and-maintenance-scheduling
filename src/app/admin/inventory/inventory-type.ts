export type InventoryType = {
  id: number;
  category: "Product" | "Part";
  item_name: string;
  stock: number;
  unit_price: number;
  created_at: string;
};

export type InventoryFieldsType = {
  label: string;
  name: "category" | "item_name" | "stock" | "unit_price";
  type: string;
  options?: string[];
};
