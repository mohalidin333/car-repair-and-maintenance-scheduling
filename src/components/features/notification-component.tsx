import React from "react";

const notifications = [
  {
    id: 1,
    title: "Notification 1",
    content: "This is the content of notification 1",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    title: "Notification 2",
    content: "Your profile has been updated successfully.",
    timestamp: "2023-10-02T09:15:00Z",
  },
  {
    id: 3,
    title: "Notification 3",
    content: "A new message has been received from John Doe.",
    timestamp: "2023-10-03T14:22:00Z",
  },
  {
    id: 4,
    title: "Notification 4",
    content: "Password changed successfully.",
    timestamp: "2023-10-04T16:40:00Z",
  },
  {
    id: 5,
    title: "Notification 5",
    content: "System maintenance scheduled for October 10 at 02:00 AM.",
    timestamp: "2023-10-05T08:00:00Z",
  },
  {
    id: 6,
    title: "Notification 6",
    content: "Your subscription is about to expire in 3 days.",
    timestamp: "2023-10-06T18:30:00Z",
  },
  {
    id: 7,
    title: "Notification 7",
    content: "A new comment was posted on your article.",
    timestamp: "2023-10-07T11:45:00Z",
  },
  {
    id: 8,
    title: "Notification 8",
    content: "Welcome to our platform! Let’s get started.",
    timestamp: "2023-10-08T07:10:00Z",
  },
  {
    id: 9,
    title: "Notification 9",
    content: "Your order #12345 has been shipped.",
    timestamp: "2023-10-09T13:55:00Z",
  },
  {
    id: 10,
    title: "Notification 10",
    content: "Reminder: Your appointment is scheduled for tomorrow at 3 PM.",
    timestamp: "2023-10-10T10:20:00Z",
  },
];

export default function NotificationComponent() {
  return (
    <div className="space-y-8 w-[500px] overflow-y-auto h-[500px] z-20 absolute top-6 right-0 bg-white border rounded-md p-4">
      <h1>Notifications</h1>

      <ul className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div>
              <p>{notification.content}</p>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
