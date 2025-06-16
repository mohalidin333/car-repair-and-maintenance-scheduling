import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="border-y bg-gray-50 py-[5rem] px-8">
      <div className="md:flex-row flex-col flex justify-between gap-[5rem] max-w-5xl mx-auto">
        <div className="md:pb-0 pb-[5rem] border-b md:border-b-0 md:border-r pr-[5rem] w-full flex flex-col gap-4 items-start">
          <p className="bg-white px-2 py-1 rounded-full border text-gray-500 text-sm font-semibold">
            About Us
          </p>

          <h1 className="title">
            Your trusted partner in seamless, stress-free car care.
          </h1>

          <p className="sub-title">
            We make it easy to take care of your vehicle without the usual
            hassle. With our simple and intuitive online platform, you can
            schedule repairs and routine maintenance anytime, anywhere — no
            phone calls, no waiting in line. Whether it’s an oil change, brake
            check, or a major repair, we connect you with reliable service
            providers and help you stay on top of your car’s health. Fast,
            convenient, and dependable — because your time and safety matter.
          </p>
        </div>

        <div className="flex flex-col gap-[5rem] text-center">
          <div className=" flex flex-col gap-2 flex-1 ">
            <span className="title font-bold">28+</span>
            <label className="font-semibold text-muted-foreground">Clients Served</label>
          </div>

          <div className="border-t pt-[5rem] flex flex-col gap-2 flex-1 ">
            <span className="title font-bold">30+</span>
            <label className="font-semibold text-muted-foreground">
              Total Appointments
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
