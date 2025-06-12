import { Send, Trash2 } from "lucide-react";
import React from "react";

const Conversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hello, how are you?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Are we still on for tonight?",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    name: "Michael Johnson",
    lastMessage: "I sent you the file.",
    timestamp: "10:12 AM",
  },
  {
    id: 4,
    name: "Emily Davis",
    lastMessage: "Thanks for the update!",
    timestamp: "10:20 AM",
  },
  {
    id: 5,
    name: "David Lee",
    lastMessage: "Call me when you're free.",
    timestamp: "10:30 AM",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    lastMessage: "That sounds great!",
    timestamp: "10:45 AM",
  },
  {
    id: 7,
    name: "Chris Brown",
    lastMessage: "Did you finish the report?",
    timestamp: "11:00 AM",
  },
  {
    id: 8,
    name: "Amanda Taylor",
    lastMessage: "Meeting at 3 PM confirmed.",
    timestamp: "11:15 AM",
  },
  {
    id: 9,
    name: "Daniel Martinez",
    lastMessage: "Let’s catch up soon.",
    timestamp: "11:25 AM",
  },
  {
    id: 10,
    name: "Laura Thomas",
    lastMessage: "I'll get back to you.",
    timestamp: "11:40 AM",
  },
  {
    id: 11,
    name: "James White",
    lastMessage: "Where are you?",
    timestamp: "11:55 AM",
  },
  {
    id: 12,
    name: "Olivia Harris",
    lastMessage: "Lunch at noon?",
    timestamp: "12:00 PM",
  },
  {
    id: 13,
    name: "Ethan Lewis",
    lastMessage: "Check your email.",
    timestamp: "12:15 PM",
  },
  {
    id: 14,
    name: "Grace Walker",
    lastMessage: "Almost done with the task.",
    timestamp: "12:30 PM",
  },
  {
    id: 15,
    name: "Matthew Hall",
    lastMessage: "Good morning!",
    timestamp: "8:00 AM",
  },
  {
    id: 16,
    name: "Chloe Young",
    lastMessage: "Can you review this?",
    timestamp: "8:30 AM",
  },
  {
    id: 17,
    name: "Benjamin Allen",
    lastMessage: "Sure, no problem.",
    timestamp: "9:00 AM",
  },
  {
    id: 18,
    name: "Sofia King",
    lastMessage: "I'll send it later.",
    timestamp: "9:30 AM",
  },
  {
    id: 19,
    name: "Alexander Wright",
    lastMessage: "Noted with thanks.",
    timestamp: "9:45 AM",
  },
  {
    id: 20,
    name: "Lily Scott",
    lastMessage: "Can we reschedule?",
    timestamp: "10:15 AM",
  },
];

const chats = [
  { id: 1, sender: "John Doe", message: "Hello, how are you?", timestamp: "10:00 AM" },
  { id: 2, sender: "Me", message: "I'm good, thanks for asking.", timestamp: "10:05 AM" },
  { id: 3, sender: "John Doe", message: "What are you up to today?", timestamp: "10:06 AM" },
  { id: 4, sender: "Me", message: "Just working on a project. You?", timestamp: "10:07 AM" },
  { id: 5, sender: "John Doe", message: "Same here. Lots of meetings.", timestamp: "10:08 AM" },
  { id: 6, sender: "Me", message: "Meetings can be draining.", timestamp: "10:09 AM" },
  { id: 7, sender: "John Doe", message: "Tell me about it!", timestamp: "10:10 AM" },
  { id: 8, sender: "Me", message: "At least it's Friday.", timestamp: "10:11 AM" },
  { id: 9, sender: "John Doe", message: "True. Any weekend plans?", timestamp: "10:12 AM" },
  { id: 10, sender: "Me", message: "Thinking of hiking. You?", timestamp: "10:13 AM" },
  { id: 11, sender: "John Doe", message: "Maybe catching a movie.", timestamp: "10:14 AM" },
  { id: 12, sender: "Me", message: "Sounds like a good plan.", timestamp: "10:15 AM" },
  { id: 13, sender: "John Doe", message: "Any movie recommendations?", timestamp: "10:16 AM" },
  { id: 14, sender: "Me", message: "You could check out the new sci-fi one.", timestamp: "10:17 AM" },
  { id: 15, sender: "John Doe", message: "Oh right, I saw the trailer.", timestamp: "10:18 AM" },
  { id: 16, sender: "Me", message: "Yeah, it looks promising.", timestamp: "10:19 AM" },
  { id: 17, sender: "John Doe", message: "I'll probably watch it tonight.", timestamp: "10:20 AM" },
  { id: 18, sender: "Me", message: "Let me know how it is!", timestamp: "10:21 AM" },
  { id: 19, sender: "John Doe", message: "Will do. Talk later?", timestamp: "10:22 AM" },
  { id: 20, sender: "Me", message: "Sure, take care!", timestamp: "10:23 AM" },
];


export default function InboxPage() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className="font-bold text-lg">Inbox</span>
      <div className="flex gap-4">
        {/* conversations section */}
        <section className="bg-white rounded-md border w-full max-w-[300px]">
          <header className="flex items-center h-[60px] p-4 border-b">
            <span className="font-bold">Conversations</span>
          </header>
          {/* conversations */}
          <ul className="max-h-[calc(100vh-215px)] overflow-y-auto p-4 flex flex-col gap-4">
            {Conversations.map((conversation, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-col flex">
                  <div className="flex items-center gap-2">
                    <span className="font-bold  ">{conversation.name}</span>
                    <span className="text-xs text-gray-600">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate max-w-[200px]">
                    {conversation.lastMessage}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* chat section */}
        <section className="min-w-[300px] relative bg-white rounded-md border w-full w-full">
          <header className="gap-4 justify-between flex items-center h-[60px] p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
              <span className="font-bold  ">John Doe</span>
            </div>

            <button className="cursor-pointer text-red-500">
              <Trash2 size={15} />
            </button>
          </header>

          {/* chats */}
          <ul className="max-h-[calc(100vh-290px)] overflow-y-auto p-4 flex flex-col gap-2">
            {chats.map((chat, index) => (
              <li
                key={index}
                className={`${
                  chat.sender === "Me"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-200"
                }  p-2 rounded-md`}
              >
                <div className="flex flex-col gap-2">
                  <p>{chat.message}</p>
                  <span
                    className={`${
                      chat.sender === "Me"
                        ? "text-right text-gray-200"
                        : "text-gray-600"
                    } text-xs`}
                  >
                    {chat.timestamp}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* input */}
          <div className="bg-white absolute bottom-0 left-0 right-0 left-0 p-4 flex items-center gap-4 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border"
            />
            <button className="cursor-pointer">
              <Send size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
