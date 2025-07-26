import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const TrackButton = ({ productId, isTracked, onClick, text, className }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(productId);
      }}
      className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors z-10 ${className}`}
      aria-label="Add to wishlist"
    >
      <span className="flex items-center gap-2">
        {isTracked ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartIconOutline className="w-6 h-6 text-red-500" />
        )}
        {text}
      </span>
    </button>
  );
};

export default TrackButton;
