export default function CategoriesSkeleton() {
  return (
    <section className="bg-white py-16 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gray-200" />
            <div className="h-8 w-48 rounded bg-gray-200" />
          </div>
          <div className="h-5 w-36 rounded bg-gray-200" />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200" />
              <div className="mx-auto h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
