import { Settings, Wrench } from "lucide-react";
import { Services } from "./service-type";

export const services: Services[] = [
  // 🔧 Repair services
  {
    name: "Brake Pad Replacement",
    category: "Repair",
    icon: Wrench,
    description: "Replace worn-out brake pads for safety and performance.",
    serviceFee: 2500,
  },
  {
    name: "Starter Repair",
    category: "Repair",
    icon: Wrench,
    description: "Repair or replace a faulty starter to fix starting issues.",
    serviceFee: 3500,
  },
  {
    name: "Radiator Repair",
    category: "Repair",
    icon: Wrench,
    description: "Fix cooling system issues to prevent engine overheating.",
    serviceFee: 3000,
  },
  {
    name: "Transmission Repair",
    category: "Repair",
    icon: Wrench,
    description:
      "Diagnose and repair transmission issues affecting gear shifting.",
    serviceFee: 8000,
  },
  {
    name: "Engine Troubleshooting",
    category: "Repair",
    icon: Wrench,
    description: "Investigate and diagnose engine performance issues.",
    serviceFee: 1500,
  },
  {
    name: "Check Engine Light Diagnostics",
    category: "Repair",
    icon: Wrench,
    description:
      "Scan onboard computer and identify the cause of warning lights.",
    serviceFee: 1000,
  },
  {
    name: "Electrical System Diagnostics",
    category: "Repair",
    icon: Wrench,
    description:
      "Identify faults in the vehicle's electrical components and systems.",
    serviceFee: 1200,
  },
  {
    name: "Flat Tire Replacement",
    category: "Repair",
    icon: Wrench,
    description: "Replace or repair a flat tire at the shop or on-site.",
    serviceFee: 600,
  },
  {
    name: "Battery Jumpstart",
    category: "Repair",
    icon: Wrench,
    description: "Provide jumpstart service for dead or weak batteries.",
    serviceFee: 400,
  },
  {
    name: "Towing Service",
    category: "Repair",
    icon: Wrench,
    description:
      "Transport the vehicle to the repair shop in case of immobilization.",
    serviceFee: 1500,
  },
  {
    name: "Air Conditioning Repair",
    category: "Repair",
    icon: Wrench,
    description: "Diagnose and repair the vehicle’s A/C system.",
    serviceFee: 3000,
  },
  {
    name: "Hybrid/Electric Vehicle Service",
    category: "Repair",
    icon: Wrench,
    description:
      "Repair and service tailored for hybrid or electric vehicle systems.",
    serviceFee: 6000,
  },
  {
    name: "Wheel Alignment",
    category: "Repair",
    icon: Wrench,
    description:
      "Adjust the angles of wheels for better handling and tire wear.",
    serviceFee: 1000,
  },

  // ⚙️ Maintenance services
  {
    name: "Oil Change",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace engine oil and oil filter to ensure smooth engine operation.",
    serviceFee: 1200,
  },
  {
    name: "Tire Rotation",
    category: "Maintenance",
    icon: Settings,
    description: "Rotate tires to promote even tire wear and extend tire life.",
    serviceFee: 800,
  },
  {
    name: "Brake Inspection",
    category: "Maintenance",
    icon: Settings,
    description:
      "Inspect brake pads, rotors, and fluid for safety and performance.",
    serviceFee: 500,
  },
  {
    name: "Battery Check",
    category: "Maintenance",
    icon: Settings,
    description:
      "Test battery health and terminals to avoid unexpected failure.",
    serviceFee: 400,
  },
  {
    name: "Fluid Top-Up",
    category: "Maintenance",
    icon: Settings,
    description:
      "Top up essential vehicle fluids like coolant, brake fluid, and wiper fluid.",
    serviceFee: 600,
  },
  {
    name: "Air Filter Replacement",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace dirty air filters to ensure proper airflow and engine efficiency.",
    serviceFee: 700,
  },
  {
    name: "20,000 km Service",
    category: "Maintenance",
    icon: Settings,
    description:
      "Comprehensive maintenance based on manufacturer’s guidelines at 20k km.",
    serviceFee: 3000,
  },
  {
    name: "40,000 km Service",
    category: "Maintenance",
    icon: Settings,
    description:
      "Full service including inspection and replacement of major components.",
    serviceFee: 5000,
  },
  {
    name: "Timing Belt Replacement (Scheduled)",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace the timing belt based on schedule to prevent engine damage.",
    serviceFee: 4500,
  },
];