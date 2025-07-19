import React from "react";
import { Star } from "lucide-react";

export default function FeedbacksSection() {
  const feedbacks = [
    {
      name: "Mark Dela Cruz",
      comment:
        "Super convenient! I was able to book a repair in just a few clicks. The service center was professional and quick!",
      rating: 5,
    },
    {
      name: "Ana Reyes",
      comment:
        "Great platform for car maintenance. I love how easy it is to schedule appointments without calling anyone.",
      rating: 4,
    },
    {
      name: "Jomar Santos",
      comment:
        "It saved me a lot of time! Highly recommend this to anyone tired of waiting in line at the shop.",
      rating: 5,
    },
  ];

  return (
    <section
      id="feedback"
      className="bg-white py-[5rem] px-8 flex flex-col gap-[5rem]"
    >
      <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center items-center">
        <p className="bg-white px-2 py-1 rounded-full border text-gray-500 text-sm font-semibold">
          Feedback
        </p>
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 text-base">
          Real stories from real car owners who trust us to keep their vehicles
          running smoothly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {feedbacks.map((fb, index) => (
          <div
            key={index}
            className="gap-4 flex flex-col p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-white"
          >
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(fb.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 text-sm italic">
              &quot;{fb.comment}&quot;
            </p>
            <span className="text-sm font-semibold text-gray-800 mt-auto">
              — {fb.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
