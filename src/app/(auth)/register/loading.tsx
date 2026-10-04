export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto w-full max-w-376 px-5 py-7 sm:py-12 lg:px-8 animate-pulse">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_604px] lg:items-start lg:gap-10">
          <section className="lg:pt-6 space-y-6">
            <div className="space-y-2">
              <div className="h-9 w-64 rounded bg-gray-200" />
              <div className="h-4 w-80 max-w-full rounded bg-gray-200" />
            </div>

            <div className="space-y-4 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-56 max-w-full rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 p-4 shadow-sm sm:p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gray-200" />
                <div className="space-y-1">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          </section>

          <section className="w-full justify-self-end rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="text-center space-y-1.5 mb-6">
              <div className="mx-auto h-6 w-48 rounded bg-gray-200" />
              <div className="mx-auto h-3.5 w-56 rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="h-10 rounded-md bg-gray-200" />
              <div className="h-10 rounded-md bg-gray-200" />
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="h-3.5 w-6 rounded bg-gray-200" />
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-10 w-full rounded-md bg-gray-200" />
                </div>
              ))}

              <div className="h-4 w-60 rounded bg-gray-200" />

              <div className="h-10 w-full rounded-md bg-gray-200" />
            </div>

            <div className="mt-4 mx-auto h-3.5 w-44 rounded bg-gray-200" />
          </section>
        </div>
      </div>
    </main>
  );
}
