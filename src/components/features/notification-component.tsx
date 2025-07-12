import React from "react";
import { Car, Bell, X } from "lucide-react";

const notifications = [
  {
    id: 1,
    car_name: "Toyota",
    plate_number: "ABC123",
    date: "2022-01-01",
  },
  {
    id: 2,
    car_name: "Honda",
    plate_number: "XYZ789",
    date: "2022-02-15",
  },
  {
    id: 3,
    car_name: "Ford",
    plate_number: "LMN456",
    date: "2022-03-20",
  },
  {
    id: 4,
    car_name: "Chevrolet",
    plate_number: "JKL321",
    date: "2022-04-10",
  },
  {
    id: 5,
    car_name: "Nissan",
    plate_number: "QWE987",
    date: "2022-05-05",
  },
];

export default function NotificationComponent({
  close,
}: {
  close: () => void;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div onClick={close} className="bg-black/50 fixed inset-0 z-20 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-30">
        {/* Header */}
        <div className="justify-between flex items-center gap-2 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <button onClick={close} className="cursor-pointer">
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(500px-80px)] p-4">
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
              >
                {/* Icon */}
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {notification.car_name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono">
                    {notification.plate_number}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
