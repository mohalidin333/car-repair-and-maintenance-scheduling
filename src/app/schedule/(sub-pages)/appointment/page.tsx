"use client";

import { useFormWithZod } from "@/hooks/use-form";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppointmentSchema } from "../../schema/appointment-schema";
import { z } from "zod";
import FormComponent from "@/components/features/form-component";
import { scheduleStore } from "../../store/schedule";
import { useRouter } from "next/navigation";
import { appointmentFields } from "../../fields/appointment-fields";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { indexedDbDexie } from "../../indexedDb/indexedDb-dexie";
import { Button } from "@/components/ui/button";
import IndicatorComponent from "./indicator-component";
import Image from "next/image";

type ImageFiles = {
  id: number | undefined;
  file: Blob;
};

export type Images = {
  id: number | undefined;
  file: string;
};

export default function AppointmentPage() {
  const [images, setImages] = useState<Images[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageFiles[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useFormWithZod(AppointmentSchema, {
    firstname: "",
    lastname: "",
    contact: "09",
    car_name: "",
    address: "",
    plate_number: "",
    issue_description: "",
  });

  // get appointment details
  const getAppointmentDetails = useCallback(() => {
    const getAppointmentDetails = JSON.parse(
      localStorage.getItem("appointment_details")!
    );
    if (getAppointmentDetails) {
      console.log(getAppointmentDetails);
      form.setValue("firstname", getAppointmentDetails?.firstname);
      form.setValue("lastname", getAppointmentDetails?.lastname);
      form.setValue("contact", getAppointmentDetails?.contact);
      form.setValue("car_name", getAppointmentDetails?.car_name);
      form.setValue("address", getAppointmentDetails?.address);
      form.setValue("plate_number", getAppointmentDetails?.plate_number);
      form.setValue(
        "issue_description",
        getAppointmentDetails?.issue_description
      );
    }
  }, []);

  // get images on indexedDb
  async function getImageFiles() {
    const indexedDbDexieImages: ImageFiles[] = (
      await indexedDbDexie.images.toArray()
    ).map((img) => ({ id: img.id, file: img.file }));

    setImageFiles(indexedDbDexieImages);
  }

  // open file handler
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  // change file handler
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);

    for (const file of filesArray) {
      await indexedDbDexie.images.put({
        file,
      });
    }
    getImageFiles();
  };

  // remove image handler
  const handleRemoveImage = async (imageId: number | undefined) => {
    const indexedDbDexieImageToDelete = await indexedDbDexie.images
      .where("id")
      .equals(imageId!)
      .first();

    if (indexedDbDexieImageToDelete?.id !== undefined) {
      console.log(indexedDbDexieImageToDelete?.id);
      await indexedDbDexie.images.delete(indexedDbDexieImageToDelete?.id);
    }

    setImageFiles((prev) => prev.filter((img) => img.id !== imageId));
  };

  // submit handler
  const handleSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
    scheduleStore.setState((prev) => {
      return {
        ...prev,
        firstname: values.firstname,
        lastname: values.lastname,
        contact: values.contact,
        address: values.address,
        car_name: values.car_name,
        plate_number: values.plate_number,
        issue_description: values.issue_description,
      };
    });
    localStorage.setItem(
      "appointment_details",
      JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        contact: values.contact,
        address: values.address,
        car_name: values.car_name,
        plate_number: values.plate_number,
        issue_description: values.issue_description,
      })
    );
    router.push("/schedule/select-service");
  };

  useEffect(() => {
    getAppointmentDetails();
    getImageFiles();
  }, [getAppointmentDetails]);

  useEffect(() => {
    images.forEach((url) => URL.revokeObjectURL(url.file));
    const urls = imageFiles.map((file) => ({
      id: file.id,
      file: URL.createObjectURL(file.file),
    }));
    setImages(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url.file));
    };
  }, [imageFiles, images]);

  return (
    <div className="space-y-8 px-4 py-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl text-center">Fill up details</h1>
      {/* indicator */}
      <IndicatorComponent />

      <div className="flex justify-end">
        <Link href={"/schedule"} className="btn-outline">
          <ArrowLeft size={15} />
          Back
        </Link>
      </div>
      <div>
        <FormComponent
          form={form}
          fields={appointmentFields}
          onSubmit={(values) => handleSubmit(values)}
        >
          <div className="flex gap-2 items-center justify-end">
            <Button type="submit">
              Next
              <ArrowRight size={15} />
            </Button>
          </div>
        </FormComponent>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChangeFile}
            className="hidden"
          />
          <button
            onClick={handleOpenFile}
            className="flex items-center gap-2 border rounded-lg py-2 px-4 cursor-pointer text-sm font-semibold"
          >
            <Plus size={15} />
            Add images
          </button>

          <div className="flex space-x-2">
            {images.map((image, imageIndex) => (
              <div key={imageIndex} className="relative border p-2 rounded">
                <Image
                  alt="image"
                  width={200}
                  height={200}
                  src={image.file}
                  className="w-[200px]"
                />
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-1 right-1 cursor-pointer text-gray-600 "
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
