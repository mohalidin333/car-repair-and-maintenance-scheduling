"use client";

import { useFormWithZod } from "@/hooks/use-form";
import React, { useEffect, useRef, useState } from "react";
import { ProfileSchema } from "./profile-schema";
import FormComponent from "@/components/features/form-component";
import { ProfileFieldsType } from "./profile-type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pen, RotateCw, X } from "lucide-react";
import { handleChangeImage } from "@/app/customer/profile-ts/handle-change-image";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import axios from "axios";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();
  const form = useFormWithZod(ProfileSchema, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const {data: userData} = await supabase.auth.getSession()
    console.log(userData)
   if (!userData.session?.user.id) return;
   const userId = userData.session?.user.id

      setIsLoading(true);
    try {
      const res = await axios.put(`/api/user/`, {...values, id: userId});
      const resData = res.data as { error: string };
      if (res.status === 400) {
        toast.error(resData.error);
      }
      toast.success("User updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
      close();
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const {data: user} = await supabase.auth.getSession()
      if (!user.session?.user.id) return;

      const userData = {
        id: user.session.user.id,
        email: user.session.user.email,
        role: user.session.user.user_metadata?.role || null,
        firstname: user.session.user.user_metadata?.firstname || null,
        lastname: user.session.user.user_metadata?.lastname || null,
        created_at: user.session.user.created_at,
      }

      form.setValue("firstname", userData.firstname || "");
      form.setValue("lastname", userData.lastname || "");
      form.setValue("email", userData.email || "");

      const {data: avatarURL} = await supabase.from("avatars").select("avatar").eq("user_id", userData.id).single()

      setImageUrl(avatarURL?.avatar || null)
    }
    getUser()
  },[])

  return (
    <div className="flex justify-center py-[5rem] z-20 fixed left-0 top-0 right-0 bottom-0 bg-black/10">
      <div className="bg-white rounded w-[500px] self-start">
        <header className="flex items-center justify-between gap-4 p-4 border-b">
          <h1>Edit profile</h1>
          <button onClick={close} className="cursor-pointer"><X size={15} /></button>
        </header>
        <div className="p-4">
          <div className="flex items-end gap-2 mb-4">
            <div className="relative">
              <Image
                src={imageUrl || "/img/avatar.png"}
                width={70}
                height={70}
                alt="avatar"
                className="w-[70px] h-[70px] rounded-full object-cover"
              />

              {!imageUrl && (
                <div className="absolute top-0 inset-0 bg-gray-100/80 flex items-center justify-center rounded-full">
                  <RotateCw size={20} className="animate-spin" />
                </div>
              )}
            </div>

            <input
              ref={inputFileRef}
              onChange={(e) => handleChangeImage(e, setImageUrl)}
              type="file"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => inputFileRef.current?.click()}
              className="cursor-pointer"
            >
              <Pen size={15} />
            </button>
          </div>

          <FormComponent form={form} fields={fields} onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center justify-end">
              <Button onClick={close} variant={"outline"} type="button">
                Cancel
              </Button>
             {
              !isLoading ? ( <Button type="submit">Save changes</Button>) : ( <Button type="submit"><RotateCw size={15} className="animate-spin" />Saving..</Button>)
             }
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  );
}
