export type Category = "Product" | "Part";
export type Inventory = {
  category: Category;
  item: string;
  stock: number;
  price: number;
};
export type InventoryWithIndex = Inventory & { index: number };
