export default function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <section id="product-detail-skeleton" className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/4">
              <div className="sticky top-4 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="aspect-square w-full rounded-lg bg-gray-200" />

                <div className="flex w-full justify-center gap-2">
                  <div className="h-16 w-16 rounded-lg bg-gray-200" />
                  <div className="h-16 w-16 rounded-lg bg-gray-200" />
                  <div className="h-16 w-16 rounded-lg bg-gray-200" />
                  <div className="h-16 w-16 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap gap-2">
                  <div className="h-6 w-24 rounded-full bg-gray-200" />
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>

                <div className="mb-3 space-y-2">
                  <div className="h-7 w-3/4 rounded-lg bg-gray-200" />
                  <div className="h-7 w-1/2 rounded-lg bg-gray-200" />
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>

                <div className="mb-6 flex items-center gap-3">
                  <div className="h-9 w-36 rounded-lg bg-gray-200" />
                  <div className="h-5 w-20 rounded bg-gray-200" />
                </div>

                <div className="mb-6">
                  <div className="h-7 w-24 rounded-full bg-gray-200" />
                </div>

                <div className="mb-6 space-y-2 border-t border-gray-100 pt-5">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-11/12 rounded bg-gray-200" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />
                </div>

                <div className="mb-6">
                  <div className="mb-2 h-4 w-16 rounded bg-gray-200" />
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-36 rounded-lg bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div className="h-5 w-24 rounded bg-gray-200" />
                  <div className="h-8 w-32 rounded bg-gray-200" />
                </div>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                  <div className="h-14 flex-1 rounded-xl bg-gray-200" />
                  <div className="h-14 flex-1 rounded-xl bg-gray-200" />
                </div>

                <div className="mb-6 flex gap-3">
                  <div className="h-12 flex-1 rounded-xl bg-gray-200" />
                  <div className="h-12 w-14 rounded-xl bg-gray-200" />
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-4 w-24 rounded bg-gray-200" />
                          <div className="h-3 w-16 rounded bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-details-tabs-skeleton" className="py-8">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex gap-6">
                <div className="h-6 w-32 rounded bg-gray-200" />
                <div className="h-6 w-28 rounded bg-gray-200" />
                <div className="h-6 w-36 rounded bg-gray-200" />
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <div className="mb-3 h-6 w-48 rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-11/12 rounded bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                  <div className="h-5 w-36 rounded bg-gray-200 mb-4" />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-20 rounded bg-gray-200" />
                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                  <div className="h-5 w-32 rounded bg-gray-200 mb-4" />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-gray-200" />
                      <div className="h-4 w-40 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
