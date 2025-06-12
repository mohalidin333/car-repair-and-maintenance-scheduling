"use client";

import { useFormWithZod } from "@/hooks/use-form";
import React from "react";
import { ProfileSchema } from "./profile-schema";
import FormComponent from "@/components/features/form-component";
import { ProfileFieldsType } from "./profile-type";
import { Button } from "react-day-picker";

const fields: ProfileFieldsType[] = [
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
];

export default function EditProfileComponent() {
  const form = useFormWithZod(ProfileSchema, {
    firstname: "",
    lastname: "",
  });
  const handleSubmit = async (credentials: {
    firstname: string;
    lastname: string;
  }) => {
    console.log(credentials);
  };
  return (
    <div className="flex justify-center py-[5rem] z-20 fixed left-0 top-0 right-0 bottom-0 bg-black/10">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>New user</h1>
        </header>
        <FormComponent form={form} fields={fields} onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center justify-end">
            <Button type="submit">Save</Button>
          </div>
        </FormComponent>
      </div>
    </div>
  );
}
