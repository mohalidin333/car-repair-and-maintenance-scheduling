"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Feedback {
  name: string;
  comment: string;
  ratings: number;
  created_at?: string;
}

export default function FeedbacksSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("feedbacks")
          .select("name, ratings, comment, created_at")
          .order("created_at", { ascending: false }) // Show newest first
          .limit(3); // Limit to 3 most recent feedbacks

        if (error) throw error;
        setFeedbacks(data || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <section id="feedback" className="bg-white py-[5rem] px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p>Loading feedbacks...</p>
        </div>
      </section>
    );
  }

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

      {feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {feedbacks.map((fb, index) => (
            <div
              key={index}
              className="gap-4 flex flex-col p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-white"
            >
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(fb.ratings)].map((_, i) => (
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
      ) : (
        <div className="max-w-5xl mx-auto text-center text-gray-500">
          No feedbacks available yet
        </div>
      )}
    </section>
  );
}
