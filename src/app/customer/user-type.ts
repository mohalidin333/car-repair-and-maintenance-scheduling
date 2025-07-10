export type UserType = {
  id: number;
  role: "admin" | "user" | "editor";
  firstname: string;
  lastname: string;
  email: string;
};

export type UserFieldsType = {
  label: string;
  name: "role" | "firstname" | "lastname" | "email" | "password";
  type: string;
  options?: string[];
};
  