import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React from "react";
import { UserSchema } from "./user-schema";
import { UserFieldsType, UserType } from "./user-type";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";

const fields: (UserFieldsType | UserFieldsType[])[] = [
  {
    label: "Role",
    name: "role",
    type: "select",
    options: ["admin", "user"],
  },
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

export default function EditUserModalComponent({
  user,
}: {
  user: UserType | null;
}) {
  const router = useRouter();
  const form = useFormWithZod(UserSchema, {
    role: user?.role as "admin" | "user",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    password: "",
  });

  const handleSubmit = (values: z.infer<typeof UserSchema>) => {
    console.log(values);
  };

  return (
    <div className="items-start flex justify-center px-4 py-[5rem] fixed z-20 bg-black/50 left-0 top-0 right-0 bottom-0">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>Edit user</h1>

          <button
            type="button"
            onClick={() => router.push("/user-management")}
            className="cursor-pointer"
          >
            <X size={15} />
          </button>
        </header>
        <div className="p-4">
          <FormComponent
            form={form}
            fields={fields}
            onSubmit={(values) => handleSubmit(values)}
          >
            <div className="flex gap-2 items-center justify-end">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push("/user-management")}
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
