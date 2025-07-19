import FormComponent from "@/components/features/form-component";
import { useFormWithZod } from "@/hooks/use-form";
import React, { Dispatch, SetStateAction } from "react";
import { UserSchema } from "./user-schema";
import { RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import axios from "axios";
import { UserFields } from "./user-fields";
import { toast } from "sonner";

export default function AddUserModalComponent({
  isOpenModal,
}: {
  isOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useFormWithZod(UserSchema, {
    role: "" as "Admin" | "Staff",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/user", values);
      const resData = res.data as { error: string };
      if (res.status === 400) {
        toast.error(resData.error);
      }
      toast.success("User added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
      isOpenModal(false);
    }
  };

  return (
    <div className="items-start flex justify-center px-4 py-[5rem] fixed z-20 bg-black/50 left-0 top-0 right-0 bottom-0">
      <div className="bg-white rounded w-[500px]">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>New user</h1>

          <button
            type="button"
            onClick={() => isOpenModal(false)}
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
                onClick={() => isOpenModal(false)}
              >
                Cancel
              </Button>
              {!isLoading ? (
                <Button type="submit">Save</Button>
              ) : (
                <Button type="submit">
                  <RotateCw size={15} className="animate-spin" /> Saving..
                </Button>
              )}
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  );
}
