import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/(auth)/action";

export default function ProfileComponent() {

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border rounded-full focus:outline-none mt-auto sticky z-10 bottom-0 bg-primary-foreground hover:bg-muted cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            <User2 color="black" /> Profile
          </DropdownMenuItem>
        </Link>
        <button onClick={handleLogout} className="w-full">
          <DropdownMenuItem className="cursor-pointer">
            <LogOut color="black" /> Log out
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
