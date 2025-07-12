import {
  CalendarClock,
  CreditCard,
  FileChartColumn,
  Handshake,
  LayoutDashboard,
  Package2,
  Users,
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
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Inventory",
    url: "/admin/inventory",
    icon: Package2,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Handshake,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileChartColumn,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: Users,
  },
  {
    title: "Scheduling Settings",
    url: "/admin/scheduling-settings",
    icon: CalendarClock,
  },
  {
    title: "Payment Settings",
    url: "/admin/payment-settings",
    icon: CreditCard,
  },
];
