import { useState } from "react";
import { Star, Send, CheckCircle, X } from "lucide-react";

export default function CarRepairFeedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      // Here you would typically send data to your API
      console.log("Feedback submitted:", { rating, comment });
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment("");
      }, 3000);
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
              Your feedback has been submitted successfully.
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
            Rate Our Service
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
            disabled={rating === 0}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
              rating > 0
                ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
