import React, { useEffect, useState } from "react";
import { Inventory } from "./inventory-type";
import { InventoryWithIndex } from "./inventory-with-index-type";
import { PackageCheck, Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("inventory").select("*");

        console.log(data);

        if (error) {
          throw error;
        }

        if (data) {
          // Transform the data to match your Inventory type
          const formattedInventory = data.map((item) => ({
            category: item.category,
            item: item.item_name,
            stock: item.stock,
            price: item.unit_price,
          }));

          setInventory(formattedInventory);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch inventory"
        );
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [supabase]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl">Products</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-md flex flex-col gap-2 items-start"
            >
              <div className="w-full flex justify-between animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-full flex justify-between animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-full flex justify-between animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl">Products</h1>
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Error loading inventory: {error}
        </div>
      </div>
    );
  }

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
              <p className="font-semibold">₱{item.price}</p>
            </div>
            <div className="flex items-center gap-4 justify-between w-full">
              <p className="flex items-center gap-2">
                <PackageCheck size={15} /> {item.stock}
              </p>

              <input
                type="number"
                min={1}
                max={item.stock}
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
