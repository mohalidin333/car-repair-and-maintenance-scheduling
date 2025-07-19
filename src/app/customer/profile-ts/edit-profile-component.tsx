"use client";

import { useFormWithZod } from "@/hooks/use-form";
import React from "react";
import { ProfileSchema } from "./profile-schema";
import FormComponent from "@/components/features/form-component";
import { ProfileFieldsType } from "./profile-type";
import { Button } from "@/components/ui/button";

const fields: (ProfileFieldsType[] | ProfileFieldsType)[] = [
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

export default function EditProfileComponent({ close }: { close: () => void }) {
  const form = useFormWithZod(ProfileSchema, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (credentials: {
    firstname: string;
    lastname: string;
  }) => {
    console.log(credentials);
  };
  return (
    <div className="flex justify-center py-[5rem] z-20 fixed left-0 top-0 right-0 bottom-0 bg-black/10">
      <div className="bg-white rounded w-[500px] self-start">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>Edit profile</h1>
        </header>
        <div className="p-4">
          <FormComponent form={form} fields={fields} onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center justify-end">
              <Button onClick={close} variant={"outline"} type="button">
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
