import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React, { useState } from "react";
import { UserSchema } from "./user-schema";
import { UserType } from "./user-type";
import { RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { UserFields } from "./user-fields";
import { toast } from "sonner";
import axios from "axios";

export default function EditUserModalComponent({
  user,
}: {
  user: UserType | null;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const params = useSearchParams();
  const id = params?.get("id");
  const form = useFormWithZod(UserSchema, {
    role: user?.role as "Admin" | "Staff",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    password: "",
  });

  const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`/api/user/`, {...values, id: id});
      const resData = res.data as { error: string };
      if (res.status === 400) {
        toast.error(resData.error);
      }
      toast.success("User updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
      router.push("/admin/user-management");
    }
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
            fields={UserFields}
            onSubmit={(values) => handleSubmit(values)}
          >
            <div className="flex gap-2 items-center justify-end">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push("/admin/user-management")}
              >
                Cancel
              </Button>
              {!isLoading ? (
                <Button type="submit">Save</Button>
              ) : (
                <Button type="submit">
                  <RotateCw size={15} className="animate-spin" />
                  Saving..
                </Button>
              )}
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  );
}
