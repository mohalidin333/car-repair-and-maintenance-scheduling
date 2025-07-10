import { Category } from "./page";

export type Inventory = {
  category: Category;
  item: string;
  stock: number;
  price: number;
};
