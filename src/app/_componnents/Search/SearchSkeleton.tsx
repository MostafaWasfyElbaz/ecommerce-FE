
export default function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 animate-pulse">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
          <div className="h-12 max-w-2xl bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-6 h-96" />
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded-lg mb-6 w-full" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 h-80 p-4" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}