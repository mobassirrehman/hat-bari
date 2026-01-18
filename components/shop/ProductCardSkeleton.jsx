export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative bg-gray-100 p-6 flex items-center justify-center aspect-square">
        <div className="w-32 h-32 bg-gray-200 rounded-full skeleton"></div>
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-gray-200 rounded-lg skeleton"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Rating Skeleton */}
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 bg-gray-200 rounded skeleton"
              ></div>
            ))}
          </div>
          <div className="w-12 h-4 bg-gray-200 rounded skeleton ml-2"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded skeleton w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded skeleton w-1/2"></div>
        </div>

        {/* Stock Skeleton */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded skeleton w-1/3"></div>
          <div className="h-1.5 bg-gray-200 rounded-full skeleton"></div>
        </div>

        {/* Price & Button Skeleton */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-6 bg-gray-200 rounded skeleton w-16"></div>
            <div className="h-3 bg-gray-200 rounded skeleton w-12"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-xl skeleton"></div>
        </div>
      </div>
    </div>
  );
}
