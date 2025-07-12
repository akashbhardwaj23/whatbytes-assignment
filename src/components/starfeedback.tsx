import { Star } from "lucide-react"
import { useState } from "react"



export function StarFeedbackSystem(){
    const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex)
  }

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Rate your experience</h3>

      <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverRating || rating)

          return (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded"
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                size={32}
                className={`transition-colors ${
                  isActive ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300 hover:text-yellow-400"
                }`}
              />
            </button>
          )
        })}
      </div>

      {rating > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Your rating:</span>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-900">{rating}</span>
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-500">out of 5</span>
          </div>
        </div>
      )}

      {rating > 0 && (
        <div className="space-y-2">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Tell us more about your experience (optional)
          </label>
          <textarea
            id="feedback"
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  )
}