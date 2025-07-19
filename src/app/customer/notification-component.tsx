import React from "react";
import { Car, Bell, X, Clock } from "lucide-react";

const notifications = [
  {
    id: 1,
    car_name: "Toyota Camry",
    plate_number: "ABC123",
    date: "2024-12-15",
    status: "due",
    checkType: "Oil Change"
  },
  {
    id: 2,
    car_name: "Honda Civic",
    plate_number: "XYZ789",
    date: "2024-12-20",
    status: "overdue",
    checkType: "Brake Inspection"
  },
  {
    id: 3,
    car_name: "Ford Focus",
    plate_number: "LMN456",
    date: "2024-12-25",
    status: "upcoming",
    checkType: "Tire Rotation"
  },
  {
    id: 4,
    car_name: "Chevrolet Malibu",
    plate_number: "JKL321",
    date: "2024-12-18",
    status: "due",
    checkType: "Engine Check"
  },
  {
    id: 5,
    car_name: "Nissan Altima",
    plate_number: "QWE987",
    date: "2024-12-22",
    status: "upcoming",
    checkType: "Battery Test"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800";
      case "due":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-600";
      case "due":
        return "bg-yellow-100 text-yellow-600";
      case "upcoming":
        return "bg-green-100 text-green-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div onClick={close} className="bg-black/50 fixed inset-0 z-20 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-30">
        {/* Header */}
        <div className="justify-between flex items-center gap-2 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Follow Up Checks
            </h2>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.length}
            </span>
          </div>
          <button onClick={close} className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
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
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getIconColor(notification.status)}`}>
                  <Car className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {notification.car_name}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono mb-1">
                    {notification.plate_number}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {notification.checkType}
                    </p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {formatDate(notification.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}