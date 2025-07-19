"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import SearchComponent from "@/components/features/search-component";
import FilterComponent from "@/components/features/filter-component";
import { UserColumns } from "./user-column";
import { UserType } from "./user-type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import AddUserModalComponent from "./add-user-modal-component";
import { useRouter, useSearchParams } from "next/navigation";
import EditUserModalComponent from "./edit-user-modal-component";
import DeleteConfirmationModalComponent from "@/components/modals/delete-confirmation-modal-component";
import axios from "axios";
import { toast } from "sonner";

function UserManagement() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id");

  const handleEdit = (row: UserType) => {
    router.push(`/admin/user-management?id=${row.id}`);
    setUser(row);
  };
  const handleDelete = (row: UserType) => {
    setUser(row);
    setDeleteModalOpen(true);
  };

const handleDeleteUser = async () => {
  if (user?.id) {
    try {
      await axios.delete('/api/user/', {
        params: { userId: user.id },
      });
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setDeleteModalOpen(false);
    }
  }
};

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = (await axios.get("/api/user")) as {
          data: { users: UserType[] };
        };
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns = UserColumns({ handleEdit, handleDelete });

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <div>
          <span className="font-bold text-lg">User Management</span>
          <p className="text-sm text-muted-foreground">
            Manage user accounts here.
          </p>
        </div>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* search */}
          <SearchComponent
            onChange={(e) => handleFilter("search", e.target.value)}
          />
          {/* filter */}
          <FilterComponent title="Role">
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "")}
              className="p-1 cursor-pointer"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "Admin")}
              className="p-1 cursor-pointer"
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("role", "User")}
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
        data={users}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {/* modals */}
      {modalOpen && <AddUserModalComponent isOpenModal={setModalOpen} />}
      {id && <EditUserModalComponent user={user} />}
      {deleteModalOpen && (
        <DeleteConfirmationModalComponent
          setDeleteModalOpen={setDeleteModalOpen}
          handleDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserManagement />
    </Suspense>
  );
}
