export default function ProductsContentSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-8 w-36 rounded-full bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>

      <div className="mb-6 h-4 w-36 rounded bg-gray-200" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="h-52 w-full bg-gray-200 sm:h-60" />
            <div className="space-y-2.5 p-3">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="h-8 w-8 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
