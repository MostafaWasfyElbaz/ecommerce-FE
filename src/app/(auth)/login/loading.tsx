export default function Loading() {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 py-16 animate-pulse">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="hidden lg:block space-y-6">
            <div className="h-96 w-full rounded-2xl bg-gray-200" />
            <div className="space-y-3">
              <div className="mx-auto h-8 w-3/4 rounded bg-gray-200" />
              <div className="mx-auto h-8 w-1/2 rounded bg-gray-200" />
            </div>
            <div className="mx-auto h-4 w-2/3 rounded bg-gray-200" />
            <div className="flex items-center justify-center gap-8 pt-2">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="h-5 w-24 rounded bg-gray-200" />
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white p-8 shadow-xl lg:p-12">
            <div className="space-y-3 text-center mb-8">
              <div className="mx-auto h-8 w-32 rounded bg-gray-200" />
              <div className="mx-auto h-6 w-44 rounded bg-gray-200" />
              <div className="mx-auto h-4 w-60 rounded bg-gray-200" />
            </div>

            <div className="mb-6 space-y-3">
              <div className="h-12 w-full rounded-xl bg-gray-200" />
              <div className="h-12 w-full rounded-xl bg-gray-200" />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>

              <div className="h-4 w-32 rounded bg-gray-200" />

              <div className="h-12 w-full rounded-xl bg-gray-200" />
            </div>

            <div className="my-6 h-px bg-gray-200" />

            <div className="mx-auto h-4 w-48 rounded bg-gray-200" />

            <div className="mt-6 flex justify-center gap-5">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
