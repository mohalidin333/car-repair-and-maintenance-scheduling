"use client";
import React, { useState } from "react";
import { useFormWithZod } from "@/hooks/use-form";
import { RegisterSchema } from "./register-schema";
import { RegisterFieldsType } from "./register-type";
import FormComponent from "@/components/features/form-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signup } from "../action";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

const fields: (RegisterFieldsType | RegisterFieldsType[])[] = [
  [
    {
      label: "Firstname",
      name: "firstname",
      type: "text",
    },
    {
      label: "Lastname",
      name: "lastname",
      type: "text",
    },
  ],
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

export default function RegisterPage() {
  const form = useFormWithZod(RegisterSchema, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (credentials: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const form = new FormData();
    form.append("firstname", credentials.firstname);
    form.append("lastname", credentials.lastname);
    form.append("email", credentials.email);
    form.append("password", credentials.password);

    try {
      const error = await signup(form);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Registration successful!");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gap-8 flex-1 flex flex-col items-center p-8 justify-center">
      <div className="text-center">
        <h1 className="title">Create Account</h1>
        <p className="sub-title">Register with email and password.</p>
      </div>

      <div className="w-full max-w-[400px]">
        <FormComponent fields={fields} form={form} onSubmit={handleSubmit}>
          {isLoading ? (
            <Button type="submit" className="cursor-not-allowed">
              <RotateCw size={15} className="animate-spin" /> Register
            </Button>
          ) : (
            <Button type="submit">Register</Button>
          )}
        </FormComponent>
      </div>

      <Link href="/login" className="text-center underline">
        Login here
      </Link>
    </div>
  );
}
