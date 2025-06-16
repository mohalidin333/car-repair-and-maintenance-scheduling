import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-white px-8 pt-[7rem] pb-[5rem]">
      <div className="max-w-5xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="max-w-xl flex flex-col gap-4 items-start">
          <h1 className="title">
            Reliable Car Care, Just a Click Away
          </h1>

          <p className="sub-title">
           Book repairs, schedule maintenance, and keep your car running smoothly — anytime, anywhere.
          </p>

           <Link href="/schedule" className="cta">Start Scheduling</Link>
        </div>

        <Image
          src={"/svg/schedule.svg"}
          alt={"Proud Coder"}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
