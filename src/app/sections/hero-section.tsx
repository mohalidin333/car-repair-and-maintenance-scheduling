import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-white px-8 py-[5rem]">
      <div className="max-w-5xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="max-w-xl flex flex-col gap-4 items-start">
          <h1 className="title">
            Maximize QSoftX Template App to Focus Building Your App&apos;s Core
            Features
          </h1>

          <p className="sub-title">
            The QSoftX Template App is a powerful web app that is designed to
            help you build your app faster than before.
          </p>

          <Button>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        <Image
          src={"/svg/proud-coder.svg"}
          alt={"Proud Coder"}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
