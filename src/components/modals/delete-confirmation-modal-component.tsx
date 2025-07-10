import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";

export default function DeleteConfirmationModalComponent({
  setDeleteModalOpen,
  handleDelete,
}: {
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleYes = () => {
    setIsLoading(true);
    handleDelete();
    setDeleteModalOpen(false);
  };

  const handleNo = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="z-20 items-start flex justify-center px-4 py-[5rem] fixed top-0 left-0 right-0 bottom-0 bg-black/50">
      <div className="bg-white rounded w-[500px]">
        <header className=" p-4 border-b">
          <h1>Delete Confirmation</h1>
        </header>

        <main className="flex flex-col gap-4 p-4 border-b">
          <p>Are you sure you want to delete this?</p>

          <div className="flex justify-end gap-2">
            {!isLoading ? (
              <Button onClick={() => handleYes()} variant={"destructive"}>
                Yes
              </Button>
            ) : (
              <Button
                onClick={() => handleYes()}
                variant={"destructive"}
                className="cursor-not-allowed "
              >
                <RotateCw size={15} className="animate-spin " />
                Yes
              </Button>
            )}
            <Button onClick={() => handleNo()} variant={"outline"}>
              No
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
