export default function ProductsSkeleton() {
  return (
    <section className="bg-white py-10 sm:py-16 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-3 sm:mb-10">
          <span className="h-8 w-1.5 rounded-full bg-gray-200" />
          <div className="h-8 w-56 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
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
    </section>
  );
}
