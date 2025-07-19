import { UserFieldsType } from "./user-type";

export const UserFields: (UserFieldsType | UserFieldsType[])[] = [
  {
    label: "Role",
    name: "role",
    type: "select",
    options: ["Admin", "Staff"],
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