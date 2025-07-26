import React, { useEffect, useState } from "react";
import { Car, Bell, X, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FollowUpNotification {
  id: number;
  car_name: string;
  plate_number: string;
  follow_up_date: string;
  follow_up_for: string;
  status: "overdue" | "due" | "upcoming";
}

export default function NotificationComponent({
  close,
}: {
  close: () => void;
}) {
  const [notifications, setNotifications] = useState<FollowUpNotification[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Get notifications for this user
        const { data, error } = await supabase
          .from("appointments")
          .select("id, car_name, plate_number, follow_up_date, follow_up_for")
          .not("follow_up_date", "is", null)
          .neq("follow_up_date", "")
          .eq("user_id", user.id)
          .order("follow_up_date", { ascending: true });

        if (error) throw error;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const processedData = (data || [])
          .filter((item) => item.follow_up_date)
          .map((item) => {
            const followUpDate = new Date(item.follow_up_date);
            followUpDate.setHours(0, 0, 0, 0);

            const diffTime = followUpDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let status: "overdue" | "due" | "upcoming" = "upcoming";
            if (diffDays < 0) status = "overdue";
            else if (diffDays <= 3) status = "due";

            return {
              id: item.id,
              car_name: item.car_name,
              plate_number: item.plate_number,
              follow_up_date: item.follow_up_date,
              follow_up_for: item.follow_up_for || "General Checkup",
              status,
            };
          });

        setNotifications(processedData);

        // Set up real-time updates
        const channel = supabase
          .channel(`user_${user.id}_notifications`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "appointments",
              filter: `user_id=eq.${user.id}`,
            },
            () => fetchData()
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div
        onClick={close}
        className="bg-black/50 fixed inset-0 z-20 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-30 flex items-center justify-center"
        >
          <p>Loading follow-up notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={close}
      className="bg-black/50 fixed inset-0 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-30"
      >
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
          <button
            onClick={close}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-1"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(500px-80px)] p-4">
          {notifications.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No follow-up appointments scheduled
            </div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getIconColor(
                      notification.status
                    )}`}
                  >
                    <Car className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.car_name}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                          notification.status
                        )}`}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono mb-1">
                      {notification.plate_number}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {notification.follow_up_for}
                      </p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.follow_up_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
