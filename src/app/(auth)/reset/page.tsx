"use client";
import React, { useState } from "react";
import { useFormWithZod } from "@/hooks/use-form";
import { ResetSchema } from "./reset-schema";
import { ResetFieldsType } from "./reset-type";
import FormComponent from "@/components/features/form-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";

const fields: ResetFieldsType[] = [
  {
    label: "New Password",
    name: "password",
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];

export default function ResetPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useFormWithZod(ResetSchema, {
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (credentials: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { password, confirmPassword } = credentials;
      if (password.trim() !== confirmPassword.trim()) {
        return toast.error("Passwords do not match");
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      const navigateTo =
        user?.user_metadata?.role === "Admin" ||
        user?.user_metadata?.role === "Staff"
          ? "/dashboard"
          : "/customer";

      toast.success("Password updated successfully");
      router.push(navigateTo);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <div className="gap-8 flex-1 flex flex-col items-center p-8 justify-center">
      <div className="text-center">
        <h1 className="title">Reset Password</h1>
        <p className="sub-title">Reset your password with new password.</p>
      </div>

      <div className="w-full max-w-[400px]">
        <FormComponent fields={fields} form={form} onSubmit={handleSubmit}>
          {!loading ? (
            <Button type="submit" className="w-full">
              Reset
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full cursor-not-allowed opacity-70"
            >
              Reset <RotateCw className="animate-spin" />
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
