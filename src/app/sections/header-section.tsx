"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#feedback", label: "Feedback" },
  { href: "#services", label: "Services" },
];

export default function HeaderSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="p-4 bg-white ">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between p-4 max-w-5xl mx-auto shadow-sm rounded-md">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <AlignLeft size={17} />
          </button>

          <span className="font-bold md:text-xl">CRMS</span>
        </div>
        {/* links */}
        <nav>
          <ul className="hidden md:flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-[#f0b100]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-x-2">
          <Button variant={"outline"}>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/schedule">Schedule</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-0 left-0 right-0 z-20 bg-white shadow-md p-4`}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <AlignLeft size={17} />
          </button>

          <span className="font-bold md:text-xl">CSU-CRMS</span>
        </div>
        {/* links */}
        <nav className="mt-4 space-y-4">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-blue-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-x-2">
            <Button variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/schedule">Schedule</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
