import { useState, useEffect } from "react";
import { Star, Send, CheckCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function CarRepairFeedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [existingFeedback, setExistingFeedback] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserFeedback = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error("User not authenticated");
        }

        // Check if user already has feedback
        const { data, error } = await supabase
          .from("feedbacks")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setExistingFeedback(data);
          setRating(data.ratings);
          setComment(data.comment || "");
        }
      } catch (error) {
        console.error("Error fetching user feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFeedback();
  }, [supabase]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (rating > 0) {
      try {
        setIsLoading(true);
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error("User not authenticated");
        }

        // Get user's name
        const userName =
          user.user_metadata?.firstname + " " + user.user_metadata?.lastname ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Anonymous";

        if (existingFeedback) {
          // Update existing feedback
          const { error } = await supabase
            .from("feedbacks")
            .update({
              name: userName,
              ratings: rating,
              comment: comment || null,
            })
            .eq("id", existingFeedback.id);

          if (error) {
            throw error;
          }
        } else {
          // Insert new feedback
          const { error } = await supabase.from("feedbacks").insert([
            {
              user_id: user.id,
              name: userName,
              ratings: rating,
              comment: comment || null,
            },
          ]);

          if (error) {
            throw error;
          }
        }

        // Show success
        console.log("Feedback submitted:", { rating, comment });
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          setComment("");
          setIsOpen(false);
        }, 3000);
      } catch (error) {
        toast.error(`Failed to submit feedback: ${(error as Error).message}`);
        console.error("Feedback submission error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const StarRating = ({
    rating,
    hoverRating,
    onRate,
    onHover,
    onLeave,
  }: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
            className="transition-all duration-200 hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Loading your feedback...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border relative">
          <button
            onClick={handleClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600">
              Your feedback has been{" "}
              {existingFeedback ? "updated" : "submitted"} successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border relative">
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {existingFeedback ? "Update Your Feedback" : "Rate Our Service"}
          </h2>
          <p className="text-gray-600">How was your car repair experience?</p>
        </div>

        <div className="space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Rating
            </label>
            <StarRating
              rating={rating}
              hoverRating={hoverRating}
              onRate={setRating}
              onHover={setHoverRating}
              onLeave={() => setHoverRating(0)}
            />
            <div className="mt-2 text-sm text-gray-500">
              {rating > 0 && (
                <span>
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Comments (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Tell us about your experience with our car repair service..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0 || isLoading}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
              rating > 0 && !isLoading
                ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                {existingFeedback ? "Update Feedback" : "Submit Feedback"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
