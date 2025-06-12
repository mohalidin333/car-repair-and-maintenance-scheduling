import React from "react";

export default function AboutSection() {
  return (
    <section className="py-[5rem] flex flex-col gap-[5rem]">
      <div className="px-8 flex flex-col gap-4 max-w-2xl mx-auto text-center">
        <h1 className="title">
          We are a team of developers who are passionate about building web apps
        </h1>

        <p className="sub-title">
          Priorities quality, speed, and simplicity in our work. We are
          committed to delivering high-quality web applications that meet the
          needs of our clients.
        </p>
      </div>

      <div className="px-8 bg-white py-[5rem] rounded-md">
        <div className="md:flex-row flex-col max-w-5xl mx-auto flex gap-[5rem] text-center">
          <div className="flex flex-col gap-2 flex-1 ">
            <span className="title font-bold">30+</span>
            <label className="sub-title font-semibold">
              Developed Projects
            </label>
          </div>

          <div className="flex flex-col gap-2 flex-1 ">
            <span className="title font-bold">28</span>
            <label className="sub-title font-semibold">Satisfied Clients</label>
          </div>

          <div className="flex flex-col gap-2 flex-1 ">
            <span className="title font-bold">3+</span>
            <label className="sub-title font-semibold">Years Experience</label>
          </div>
        </div>
      </div>
    </section>
  );
}
