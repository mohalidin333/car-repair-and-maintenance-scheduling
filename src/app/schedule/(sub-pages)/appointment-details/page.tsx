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

export default function AppointmentDetailsPage() {
  const [schedule, setSchedule] = useState<string>();
  const [details, setDetails] = useState<Details>();
  const [service, setService] = useState<Service>();
  const [images, setImages] = useState<string[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
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
    const indexedDbDexieImages: { file: Blob }[] = (
      await indexedDbDexie.images.toArray()
    ).map((img) => ({ file: img.file }));

    const imageUrls = indexedDbDexieImages.map((img) =>
      URL.createObjectURL(img.file)
    );

    setImages(imageUrls);
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

  const handleFinish = () => {
    if (!isAuth) {
      router.push("/register");
      setIsAuth(true);
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
        <Button onClick={handleFinish} className="btn">
          Finish
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
