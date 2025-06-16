import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen">
      {children}
      <div className="flex flex-col justify-between p-8 flex-1 bg-gray-100 md:flex hidden">
        <span className="font-bold text-2xl">
          Car Repair and Maintenance Scheduling
        </span>

        <div className="flex justify-center">
          <Image
            src={"/svg/schedule.svg"}
            alt={"Proud Coder"}
            width={500}
            height={500}
          />
        </div>

        <p className="text-xl leading-10 text-gray-700">
          Welcome to our car repair and maintenance scheduling system.
        </p>
      </div>
    </main>
  );
}
