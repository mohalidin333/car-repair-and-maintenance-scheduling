"use client";

import FormComponent from "@/components/features/form-component";
import { Button } from "@/components/ui/button";
import { useFormWithZod } from "@/hooks/use-form";
import { RotateCw, Settings } from "lucide-react";
import React, { useState } from "react";
import { PaymentFields } from "./payment-fields";
import { PaymentSchema } from "./payment-schema";

export default function PaymentSettingsPage() {
  const form = useFormWithZod(PaymentSchema, {
    name: "",
    number: "09",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
  };

  return (
    <div className="bg-white rounded-lg border my-8 space-y-4 p-4 max-w-screen-lg mx-auto">
      <p className="text-xl font-bold flex items-center gap-2">
        <Settings size={20} /> Payment Settings
      </p>

      <FormComponent fields={PaymentFields} form={form} onSubmit={handleSubmit}>
        <div>
          {isLoading ? (
            <Button type="submit" className="cursor-not-allowed">
              <RotateCw size={15} className="animate-spin " /> Saving
            </Button>
          ) : (
            <Button type="submit">Save Changes</Button>
          )}
        </div>
      </FormComponent>
    </div>
  );
}
