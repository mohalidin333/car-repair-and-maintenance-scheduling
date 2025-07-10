import { Category } from "./page";

export type SelectedInventory = {
  index: number;
  category: Category;
  item: string;
  stock: number;
  price: number;
  quantity: number;
  total_price: number;
};