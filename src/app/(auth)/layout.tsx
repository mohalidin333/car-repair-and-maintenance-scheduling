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
      <div className="flex flex-col justify-between p-4 flex-1 bg-primary md:flex hidden">
        <span className="text-white font-bold text-xl">QSoftX</span>

        <div className="flex justify-center">
          <Image
            src={"/svg/auth.svg"}
            alt={"Proud Coder"}
            width={500}
            height={500}
          />
        </div>

        <p className="text-xl text-white">
          Maximize QSoftX Template App to Focus Building Your App&apos;s Core
          Features
        </p>
      </div>
    </main>
  );
}
