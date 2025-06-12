"use client";
import React, { useState } from "react";
import { useFormWithZod } from "@/hooks/use-form";
import { LoginSchema } from "./login-schema";
import { LoginFieldsType } from "./login-type";
import FormComponent from "@/components/features/form-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { login } from "../action";
import { RotateCw } from "lucide-react";

const fields: LoginFieldsType[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export default function LoginPage() {
  const form = useFormWithZod(LoginSchema, {
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    const form = new FormData();
    form.append("email", credentials.email);
    form.append("password", credentials.password);
    login(form);
  };

  return (
    <div className="gap-8 flex-1 flex flex-col items-center p-8 justify-center">
      <div className="text-center">
        <h1 className="title">Welcome Back!</h1>
        <p className="sub-title">Login with email and password.</p>
      </div>

      <div className="w-full max-w-[400px]">
        <FormComponent fields={fields} form={form} onSubmit={handleSubmit}>
          {isLoading ? (
            <Button type="submit" className="cursor-not-allowed">
              <RotateCw size={15} className="animate-spin " /> Login
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}
        </FormComponent>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/forgot" className="text-center underline">
          Forgot password
        </Link>

        <Link href="/register" className="text-center underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
