import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React from "react";
import { ServiceSchema } from "./service-schema";
import {  ServiceType } from "./service-type";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ServiceFields } from "./service-fields";

export default function EditServiceModalComponent({
  service,
}: {
  service: ServiceType | null;
}) {
  const router = useRouter();
  const form = useFormWithZod(ServiceSchema, {
    service_type: service?.service_type || "Repair",
    service_name: service?.service_name || "",
    service_fee: service?.service_fee || 0,
    service_description: service?.description || "",
  });

  const handleSubmit = (values: z.infer<typeof ServiceSchema>) => {
    console.log(values);
  };

  return (
    <div className="items-start flex justify-center px-4 py-[5rem] fixed z-20 bg-black/50 left-0 top-0 right-0 bottom-0">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>Edit service</h1>

          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="cursor-pointer"
          >
            <X size={15} />
          </button>
        </header>
        <div className="p-4">
          <FormComponent
            form={form}
            fields={ServiceFields}
            onSubmit={(values) => handleSubmit(values)}
          >
            <div className="flex gap-2 items-center justify-end">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push("/admin/services")}
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
