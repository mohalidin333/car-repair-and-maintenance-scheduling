"use client";
import React from "react";
import { useFormWithZod } from "@/hooks/use-form";
import { ForgotSchema } from "./forgot-schema";
import { ForgotFieldsType } from "./forgot-type";
import FormComponent from "@/components/features/form-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "../action";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";

const fields: ForgotFieldsType[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
  },
];

export default function ForgotPage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useFormWithZod(ForgotSchema, {
    email: "",
  });
  const handleSubmit = async (credentials: { email: string }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", credentials.email);
      const res = await forgotPassword(formData);

      toast.success(res.message);
    } catch (error) {
      console.error("Error sending reset email:", error);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <div className="gap-8 flex-1 flex flex-col items-center p-8 justify-center">
      <div className="text-center">
        <h1 className="title">Forgot Password</h1>
        <p className="sub-title">
          We&apos;ll send you an email to reset your password.
        </p>
      </div>

      <div className="w-full max-w-[400px]">
        <FormComponent fields={fields} form={form} onSubmit={handleSubmit}>
          {!loading ? (
            <Button type="submit" className="w-full">
              Send
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full cursor-not-allowed opacity-70"
            >
              Send <RotateCw className="animate-spin" />
            </Button>
          )}
        </FormComponent>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/login" className="text-center underline">
          Remembered password
        </Link>
      </div>
    </div>
  );
}
