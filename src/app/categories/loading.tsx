export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
          >
            <div className="mb-4 aspect-square rounded-xl bg-gray-200" />
            <div className="mx-auto h-5 w-24 rounded bg-gray-200" />
            <div className="mx-auto mt-2 h-3.5 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
