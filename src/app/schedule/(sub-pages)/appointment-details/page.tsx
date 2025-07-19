"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { indexedDbDexie } from "../../indexedDb/indexedDb-dexie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import IndicatorComponent from "./indicator-component";
import { Details } from "./details-type";
import SchedulePersonalComponent from "./schedule-personal-component";
import CarDetailsComponent from "./car-details-component";
import { Service } from "./service-type";
import ServiceDetailsSomponent from "./service-details-component";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Inventory } from "../select-service/inventory-type";

export default function AppointmentDetailsPage() {
  const [schedule, setSchedule] = useState<string>();
  const [details, setDetails] = useState<Details>();
  const [service, setService] = useState<Service>();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<Blob[]>([]);
  const supabase = createClient();
  const router = useRouter();

  function getAppointmentDetails() {
    const appointmentSchedule: { date: string } = JSON.parse(
      localStorage.getItem("appointment_schedule")!
    );
    const appointmentDetails: Details = JSON.parse(
      localStorage.getItem("appointment_details")!
    );
    const appointmentService: Service = JSON.parse(
      localStorage.getItem("appointment_service")!
    );

    setSchedule(appointmentSchedule?.date);
    setDetails(appointmentDetails);
    setService(appointmentService);
  }

  // get images on indexedDb
  async function getImageFiles() {
    const indexedDbDexieImages: Blob[] = (
      await indexedDbDexie.images.toArray()
    ).map((img) => img.file);

    const imageUrls = indexedDbDexieImages.map((img) =>
      URL.createObjectURL(img)
    );
    setImages(imageUrls);
    setImageFiles(indexedDbDexieImages);
  }

  const handleEditSchedule = () => {
    router.push("/schedule");
  };

  const handleEditAppointment = () => {
    router.push("/schedule/appointment");
  };

  const handleEditService = () => {
    router.push("/schedule/select-service");
  };

  const handleFinish = async () => {
    const { data: userData } = await createClient().auth.getSession();
    if (!userData.session?.user.id) {
      router.push("/register");
      return;
    }

    try {
      const carImagesURL = await Promise.all(
        imageFiles.map(async (img, index) => {
          const filePath = `images/${index + Date.now()}`;
          const { error } = await supabase.storage
            .from("cars")
            .upload(filePath, img);
          if (error) {
            throw error;
          }

          const { data: imageUrlData } = supabase.storage
            .from("cars")
            .getPublicUrl(filePath);

          return imageUrlData.publicUrl;
        })
      );

      const parsedInventory: Inventory[] = JSON.parse(
        JSON.stringify(service?.inventory)
      );

      const inventory_fee = parsedInventory.reduce(
        (total, item) => total + (item.price || 0),
        0
      );

      console.log(inventory_fee);

      await supabase.from("appointments").insert({
        user_id: userData.session?.user.id,
        firstname: details?.firstname,
        lastname: details?.lastname,
        contact: details?.contact,
        address: details?.address,
        car_name: details?.car_name,
        plate_number: details?.plate_number,
        issue_description: details?.issue_description,
        car_images: JSON.stringify(carImagesURL),
        schedule: schedule,
        service_type: service?.service_type,
        service_name: service?.service,
        service: JSON.stringify(service),
        service_fee: service?.service_fee,
        inventory: JSON.stringify(service?.inventory),
        inventory_fee: inventory_fee,
        total_fee: Number(service?.service_fee || 0) + inventory_fee,
        appointment_type: "Online",
        status: "Pending",
        follow_up_for: "",
        follow_up_date: "",
      });

      toast.success("Appointment added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    getAppointmentDetails();
    getImageFiles();
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  return (
    <div className="space-y-8 px-4 py-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl text-center">Appointment Details</h1>

      {/* indicator */}
      <IndicatorComponent />

      {/* schedule / personal details */}
      <SchedulePersonalComponent
        handleEditSchedule={handleEditSchedule}
        schedule={schedule}
        handleEditAppointment={handleEditAppointment}
        details={details}
      />

      {/* car details */}
      <CarDetailsComponent
        handleEditAppointment={handleEditAppointment}
        details={details}
        images={images}
      />

      {/* service details */}
      <ServiceDetailsSomponent
        handleEditService={handleEditService}
        service={service}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={() => handleFinish()} className="btn">
          Finish
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
