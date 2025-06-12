import { Brush, MonitorCog, Plane } from "lucide-react";
import React from "react";

export default function ServicesSection() {
  return (
    <section className="px-8 bg-white py-[5rem] flex flex-col gap-8">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center">
        <h1 className="title">
          We offer a wide range of services to help you achieve your goals
        </h1>

        <p className="sub-title">
          From designing intuitive user interfaces to deploying full-scale web
          applications, our team ensures each solution is tailored to your
          specific needs.
        </p>
      </div>

      <div className=" bg-white p-10 rounded-md">
        <div className="md:flex-row flex-col max-w-5xl mx-auto flex gap-[5rem] text-center">
          <div className="items-center flex flex-col gap-4 flex-1">
            <Brush size={30} />
            <span className="title font-bold">UI/UX Design</span>
            <p className="sub-title">
              Crafting intuitive and visually appealing designs that enhance
              user experience.
            </p>
          </div>

          <div className="items-center flex flex-col gap-4 flex-1">
            <MonitorCog size={30} />
            <span className="title font-bold">Web Development</span>
            <p className="sub-title">
              Building responsive and high-performance websites with modern
              technologies.
            </p>
          </div>

          <div className="items-center flex flex-col gap-4 flex-1">
          <Plane size={30} />
            <span className="title font-bold">Deployment</span>
            <p className="sub-title">
              Ensuring your application is securely hosted, optimized, and ready
              for users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
