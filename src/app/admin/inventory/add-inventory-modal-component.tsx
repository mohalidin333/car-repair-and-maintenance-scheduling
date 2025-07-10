import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React, { Dispatch, SetStateAction } from "react";
import { InventorySchema } from "./inventory-schema";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import axios from "axios";
import { InventoryFields } from "./inventory-fields";

export default function AddInventoryModalComponent({
  isOpenModal,
}: {
  isOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useFormWithZod(InventorySchema, {
    category: "Product" as "Product" | "Part",
    item_name: "",
    stock: 0,
    unit_price: 0,
  })

  const handleSubmit = async (values: z.infer<typeof InventorySchema>) => {
    try {
      await axios.post("http://localhost:3000/api/user", values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="items-start flex justify-center px-4 py-[5rem] fixed z-20 bg-black/50 left-0 top-0 right-0 bottom-0">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>New item</h1>

          <button
            type="button"
            onClick={() => isOpenModal(false)}
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
                onClick={() => isOpenModal(false)}
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
