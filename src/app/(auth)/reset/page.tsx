"use client";
import React from "react";
import { useFormWithZod } from "@/hooks/use-form";
import { ResetSchema } from "./reset-schema";
import { ResetFieldsType } from "./reset-type";
import FormComponent from "@/components/features/form-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fields: ResetFieldsType[] = [
  {
    label: "New Password",
    name: "password",
    type: "password",
  },
];

export default function ResetPage() {
  const form = useFormWithZod(ResetSchema, {
    password: "",
  });
  const handleSubmit = async (credentials: { password: string }) => {
    console.log(credentials);
  };

  return (
    <div className="gap-8 flex-1 flex flex-col items-center p-8 justify-center">
      <div className="text-center">
        <h1 className="title">Reset Password</h1>
        <p className="sub-title">Reset your password with new password.</p>
      </div>

      <div className="w-full max-w-[400px]">
        <FormComponent fields={fields} form={form} onSubmit={handleSubmit}>
          <Button type="submit">Reset</Button>
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
