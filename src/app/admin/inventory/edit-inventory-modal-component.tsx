import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React from "react";
import { InventorySchema } from "./inventory-schema";
import { InventoryType } from "./inventory-type";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { InventoryFields } from "./inventory-fields";

export default function EditInventoryModalComponent({
  inventory,
}: {
  inventory: InventoryType | null;
}) {
  const router = useRouter();
  const form = useFormWithZod(InventorySchema, {
    category: inventory?.category || "Product",
    item_name: inventory?.item_name || "",
    stock: inventory?.stock || 0,
    unit_price: inventory?.unit_price || 0,
  });

  const handleSubmit = (values: z.infer<typeof InventorySchema>) => {
    console.log(values);
  };

  return (
    <div className="items-start flex justify-center px-4 py-[5rem] fixed z-20 bg-black/50 left-0 top-0 right-0 bottom-0">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>Edit item</h1>

          <button
            type="button"
            onClick={() => router.push("/admin/inventory")}
            className="cursor-pointer"
          >
            <X size={15} />
          </button>
        </header>
        <div className="p-4">
          <FormComponent
            form={form}
            fields={InventoryFields}
            onSubmit={(values) => handleSubmit(values)}
          >
            <div className="flex gap-2 items-center justify-end">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push("/admin/inventory")}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  );
}
