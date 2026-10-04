export default function OrdersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          <span className="text-gray-300">/</span>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-200 animate-pulse shrink-0" />
            <div className="space-y-2">
              <div className="h-7 sm:h-8 w-36 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-9 w-36 bg-gray-100 rounded-xl animate-pulse self-start sm:self-auto" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm animate-pulse"
          >
            <div className="flex gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-2">
                    <div className="h-6 w-24 bg-gray-100 rounded-lg" />
                    <div className="h-6 w-28 bg-gray-200 rounded" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0" />
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                  <div className="h-10 w-24 bg-gray-100 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
