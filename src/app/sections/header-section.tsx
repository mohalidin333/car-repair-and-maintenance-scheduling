import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function HeaderSection() {
  return (
    <header className="p-4 bg-white ">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between p-4 max-w-5xl mx-auto shadow-sm rounded-md">
        <span className="font-bold text-xl">CSU-CRMS</span>
        {/* links */}
        <nav>
          <ul className="flex space-x-6">
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
        </nav>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}
