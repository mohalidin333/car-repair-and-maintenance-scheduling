import {
  DatabaseBackup,
  FileChartColumn,
  FileSearch,
  Inbox,
  LayoutDashboard,
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
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: Users2,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileChartColumn,
  },
  {
    title: "Backup & Restore",
    url: "/backup-restore",
    icon: DatabaseBackup,
  },
  {
    title: "Audit Logs",
    url: "/audit-logs",
    icon: FileSearch,
  },
];
