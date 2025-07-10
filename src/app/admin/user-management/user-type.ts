export type UserType = {
  id: number;
  role: "Admin" | "Staff" | "Customer";
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
};

export type UserFieldsType = {
  label: string;
  name: "role" | "firstname" | "lastname" | "email" | "password";
  type: string;
  options?: string[];
};
