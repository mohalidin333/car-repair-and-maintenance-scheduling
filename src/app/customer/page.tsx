"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import SearchComponent from "@/components/features/search-component";
import FilterComponent from "@/components/features/filter-component";
import { UserColumns } from "./user-column";
import { UserData } from "./user-data";
import { UserType } from "./user-type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import AddUserModalComponent from "./add-user-modal-component";
import { useRouter, useSearchParams } from "next/navigation";
import EditUserModalComponent from "./edit-user-modal-component";

function UserManagement() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id");
  const [user, setUser] = useState<UserType | null>(null);

  const handleEdit = (row: UserType) => {
    router.push(`/admin/user-management?id=${row.id}`);
    setUser(row);
  };
  const handleDelete = (row: UserType) => {
    console.log(row);
  };

  const columns = UserColumns({ handleEdit, handleDelete });

  return (
    <div className="space-y-8  py-8 max-w-screen-lg mx-auto">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <span className="font-bold text-lg">User Management</span>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* search */}
          <SearchComponent
            onChange={(e) => handleFilter("search", e.target.value)}
          />
          {/* filter */}
          <FilterComponent title="Status">
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "")}
              className="p-1 cursor-pointer"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "admin")}
              className="p-1 cursor-pointer"
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "user")}
              className="p-1 cursor-pointer"
            >
              User
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "Editor")}
              className="p-1 cursor-pointer"
            >
              Editor
            </DropdownMenuItem>
          </FilterComponent>
          {/* add user */}
          <Button onClick={() => setModalOpen(true)}>
            <Plus /> Add User
          </Button>
        </div>
      </header>
      {/* table */}
      <TableComponent
        data={UserData}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {/* add user modal */}
      {modalOpen && <AddUserModalComponent isOpenModal={setModalOpen} />}
      {id && <EditUserModalComponent user={user} />}
    </div>
  );
}


export default function UserManagementPage() {
  return <Suspense fallback={<div>Loading...</div>}>
    <UserManagement />
  </Suspense>
}