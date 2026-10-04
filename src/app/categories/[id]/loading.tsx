export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white animate-pulse">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-white/30" />
            <div className="h-4 w-3 rounded bg-white/20" />
            <div className="h-4 w-20 rounded bg-white/30" />
            <div className="h-4 w-3 rounded bg-white/20" />
            <div className="h-4 w-24 rounded bg-white/30" />
          </div>
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/20 ring-1 ring-white/30" />
            <div className="space-y-2">
              <div className="h-8 w-52 rounded bg-white/30" />
              <div className="h-4 w-64 rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 animate-pulse">
        <div className="mb-6 h-4 w-36 rounded bg-gray-200" />
        <div className="mb-6 h-6 w-60 rounded bg-gray-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 h-14 w-14 rounded-xl bg-gray-200" />
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
