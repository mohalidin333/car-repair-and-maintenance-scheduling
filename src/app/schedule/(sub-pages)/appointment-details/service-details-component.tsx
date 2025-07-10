import { Pen, User2 } from "lucide-react";
import React from "react";
import { Service } from "./service-type";

export default function ServiceDetailsSomponent({
  handleEditService,
  service,
}: {
  handleEditService: () => void;
  service: Service | undefined;
}) {
  return (
    <div className="border rounded-md p-4 space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 text-purple-500 p-4 rounded-full">
            <User2 size={15} />
          </div>
          <p className="font-bold text-lg">Service Details</p>
        </div>
        <button
          onClick={handleEditService}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <Pen size={15} />
        </button>
      </div>

      {/* service type */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          SERVICE TYPE
        </p>
        <p className="font-semibold text-lg">{service?.service_type}</p>
      </div>
      {/* service and fee */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">SERVICE</p>
          <p className="font-semibold text-lg">{service?.service}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            SERVICE FEE
          </p>
          <p className="font-semibold text-lg">
            ₱{service?.service_fee.toLocaleString()}
          </p>
        </div>
      </div>

      {/* inventory selection method */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          SELECTED PARTS / PRODUCTS
        </p>

        {service?.inventory_selection === 0 && (
          <p className="font-semibold text-lg">&quot;I will let the shop select&quot;</p>
        )}

        {service?.inventory_selection === 1 && (
          // inventory
          <div className="divide-y">
            {service.inventory.map((inv, idx) => (
              <div key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{inv.item}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {inv.quantity}
                  </p>
                </div>
                <p className="font-semibold ">
                  ₱{inv.total_price.toLocaleString()}
                </p>
              </div>
            ))}
            {/* service fee */}
            <div className="py-2 flex justify-between">
              <p className="font-semibold">Service Fee</p>
              <p className="font-semibold">
                ₱{service.service_fee.toLocaleString()}
              </p>
            </div>

            {/* total */}
            <div className="py-2 flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">
                ₱
                {(
                  service.service_fee +
                  service.inventory.reduce(
                    (acc, inv) => acc + inv.total_price,
                    0
                  )
                ).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
