import React from "react";

export default function FooterSection() {
  return (
    <footer className="p-8 bg-gray-500 border-t flex flex-col gap-8">

      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gray-100">
          © {new Date().getFullYear()} Car Repair and Maintenance Scheduling
          System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
