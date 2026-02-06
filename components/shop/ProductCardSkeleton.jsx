export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
      <div className="relative bg-gray-200 rounded-xl aspect-[4/3] w-full mb-4">
        <div className="absolute top-3 left-3 w-12 h-5 bg-gray-300 rounded-md"></div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>{" "}
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>{" "}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-5 bg-gray-200 rounded w-16"></div> {/* Price */}
            <div className="h-3 bg-gray-100 rounded w-10"></div>{" "}
          </div>

          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
