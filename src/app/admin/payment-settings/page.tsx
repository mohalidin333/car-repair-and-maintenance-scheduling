"use client";

import FormComponent from "@/components/features/form-component";
import { Button } from "@/components/ui/button";
import { useFormWithZod } from "@/hooks/use-form";
import { RotateCw, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PaymentFields } from "./payment-fields";
import { PaymentSchema } from "./payment-schema";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function PaymentSettingsPage() {
  const supabase = createClient();
  const form = useFormWithZod(PaymentSchema, {
    name: "",
    number: "09",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (data: z.infer<typeof PaymentSchema>) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("payment_settings")
        .update(data)
        .eq("id", 1);

      if (error) {
        toast.error(error.message);
      }
      toast.success("Payment settings updated");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPaymentSettings = async () => {
      const {
        data: { name: paymentName, number: paymentNumber },
        error,
      } = await supabase
        .from("payment_settings")
        .select("*")
        .eq("id", 1)
        .single();
      if (error) {
        toast.error(error.message);
      }
      form.setValue("name", paymentName);
      form.setValue("number", paymentNumber);
    };

    fetchPaymentSettings();
  }, []);

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
