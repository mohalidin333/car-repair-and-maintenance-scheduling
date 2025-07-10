import React from "react";
import { Inventory } from "./inventory-type";
import { InventoryWithIndex } from "./inventory-with-index-type";
import { PackageCheck, Plus, X } from "lucide-react";

const inventory: Inventory[] = [
  {
    category: "Product",
    item: "Engine Oil",
    stock: 25,
    price: 185.0,
  },
  {
    category: "Product",
    item: "Coolant",
    stock: 18,
    price: 130.5,
  },
  {
    category: "Product",
    item: "Brake Fluid",
    stock: 12,
    price: 95.75,
  },
  {
    category: "Product",
    item: "Transmission Fluid",
    stock: 20,
    price: 310.0,
  },
  {
    category: "Product",
    item: "Power Steering Fluid",
    stock: 15,
    price: 105.0,
  },
  {
    category: "Part",
    item: "Brake Pads",
    stock: 40,
    price: 650.0,
  },
  {
    category: "Part",
    item: "Spark Plug",
    stock: 60,
    price: 110.25,
  },
  {
    category: "Part",
    item: "Air Filter",
    stock: 30,
    price: 450.0,
  },
  {
    category: "Part",
    item: "Oil Filter",
    stock: 45,
    price: 220.0,
  },
  {
    category: "Part",
    item: "Timing Belt",
    stock: 8,
    price: 1850.5,
  },
];

export default function InventoryComponent({
  isItemSelected,
  handleSelectInventory,
  handleRemoveInventory,
  handleQuantityChange,
}: {
  isItemSelected: (itemIndex: number) => boolean;
  handleSelectInventory: (item: InventoryWithIndex) => void;
  handleRemoveInventory: (itemIndex: number) => void;
  handleQuantityChange: (itemIndex: number, quantity: number) => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Products</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {inventory.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className={`${
              isItemSelected(itemIndex) && "ring-2 ring-primary"
            } border p-4 rounded-md cursor-pointer hover:scale-102 duration-300 ease-in-out flex flex-col gap-2 items-start transition-all`}
          >
            <div className="w-full flex items-center justify-between gap-4">
              <p
                className={`${
                  item.category === "Part" ? "bg-green-100" : "bg-blue-100"
                } font-semibold text-xs rounded-lg px-2 py-1`}
              >
                {item.category}
              </p>

              {!isItemSelected(itemIndex) ? (
                <button
                  onClick={() =>
                    handleSelectInventory({
                      ...item,
                      index: itemIndex,
                    } as InventoryWithIndex)
                  }
                  className="bg-gray-100 p-2 rounded-full cursor-pointer"
                >
                  <Plus size={15} />
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveInventory(itemIndex)}
                  className="bg-gray-100 p-2 rounded-full cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-4 justify-between w-full">
              <p className="font-bold text-lg">{item.item}</p>
              <p className="font-semibold">₱{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4 justify-between w-full">
              <p className="flex items-center gap-2">
                <PackageCheck size={15} /> {item.stock}
              </p>

              <input
                type="number"
                min={1}
                defaultValue={1}
                onChange={(e) =>
                  handleQuantityChange(itemIndex, +e.target.value)
                }
                className={`${
                  isItemSelected(itemIndex) ? "block" : "hidden"
                } border max-w-[80px] px-2 rounded`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
