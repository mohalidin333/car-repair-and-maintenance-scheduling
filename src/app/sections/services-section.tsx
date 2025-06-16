import { Wrench } from "lucide-react";
import { PiScrewdriverBold } from "react-icons/pi";
import React from "react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Wrench size={30} />,
      title: "Repair Services",
      description:
        "From engine issues to brake problems, we provide professional car repair solutions for every need.",
    },
    {
      icon: <PiScrewdriverBold size={30} />,
      title: "Preventive Maintenance",
      description:
        "Keep your car in top shape with scheduled checkups, fluid top-ups, and inspections.",
    },
  ];

  return (
    <section id="services" className="border-y px-8 bg-gray-50 py-[5rem] flex flex-col gap-[5rem]">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center items-center">
        <p className="bg-white px-2 py-1 rounded-full border text-gray-500 text-sm font-semibold">
          Services
        </p>
        <h1 className="title">Reliable Repair & Maintenance Services</h1>
        <p className="sub-title">
          We offer essential car care services to keep your vehicle running
          smoothly and safely — from expert repairs to routine maintenance.
        </p>
      </div>

      <div className="md:flex-nowrap flex-wrap flex w-full max-w-5xl mx-auto gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-white"
          >
            <div className="text-[#f0b100] mb-3">{service.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
