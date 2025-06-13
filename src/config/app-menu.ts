import {
  CalendarCheck2,
  CalendarClock,
  CreditCard,
  Handshake,
  LayoutDashboard,
  Package2,
  Users2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type MenuType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const AdminMenu: MenuType[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: CalendarCheck2,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package2,
  },
  {
    title: "Services",
    url: "/services",
    icon: Handshake,
  },
  {
    title: "Schedules",
    url: "/schedules",
    icon: CalendarClock,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: Users2,
  },
  {
    title: "Payment Settings",
    url: "/payment-settings",
    icon: CreditCard,
  },
];
