export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white animate-pulse">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-white/30" />
            <div className="h-4 w-3 rounded bg-white/20" />
            <div className="h-4 w-16 rounded bg-white/30" />
          </div>
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/20 ring-1 ring-white/30" />
            <div className="space-y-2">
              <div className="h-8 w-44 rounded bg-white/30" />
              <div className="h-4 w-56 rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 animate-pulse">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="mb-3 aspect-square rounded-xl bg-gray-200" />
              <div className="mx-auto h-4 w-20 rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-3 w-14 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
