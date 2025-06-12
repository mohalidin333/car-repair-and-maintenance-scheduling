import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function HeaderSection() {
  return (
    <header className="p-4 bg-white">
      <div className="flex items-center justify-between p-4 max-w-5xl mx-auto shadow-sm rounded-md">
        <span className="font-bold text-xl">QSoftX</span>

        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}
