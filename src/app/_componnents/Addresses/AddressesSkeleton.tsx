export default function AddressesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />

              <div className="flex-1 min-w-0 space-y-2.5">
                <div className="h-5 w-32 bg-gray-200 rounded-md" />

                <div className="space-y-1.5">
                  <div className="h-3.5 w-full bg-gray-200 rounded-md" />
                  <div className="h-3.5 w-3/4 bg-gray-200 rounded-md" />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="h-3.5 w-24 bg-gray-200 rounded-md" />
                  <div className="h-3.5 w-20 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gray-200" />
              <div className="w-9 h-9 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
