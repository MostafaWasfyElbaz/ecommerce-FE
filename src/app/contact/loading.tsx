export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-36 rounded bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 h-4 w-20 rounded bg-gray-200" />
            <div className="flex items-center gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />
              <div className="space-y-2">
                <div className="h-6 w-44 rounded bg-gray-200" />
                <div className="h-4 w-56 rounded bg-gray-200" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-12 w-full rounded-xl bg-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-12 w-full rounded-xl bg-gray-200" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-32 w-full rounded-xl bg-gray-200" />
              </div>

              <div className="h-12 w-40 rounded-xl bg-gray-200" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 rounded bg-gray-200" />
                <div className="h-3 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-32 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
