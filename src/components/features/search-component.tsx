import React, { ComponentProps } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchComponent(props: ComponentProps<"input">) {
  return (
    <div className="relative">
      <Input {...props} placeholder="Search" className="pl-8 bg-white" />
      <Search size={15} className="absolute top-1/4 left-3" />
    </div>
  );
}
