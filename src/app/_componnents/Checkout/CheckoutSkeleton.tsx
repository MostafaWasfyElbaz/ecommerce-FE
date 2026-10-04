export default function CheckoutSkeleton() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
            <div className="h-4 w-2 bg-gray-200 rounded-md" />
            <div className="h-4 w-10 bg-gray-200 rounded-md" />
            <div className="h-4 w-2 bg-gray-200 rounded-md" />
            <div className="h-4 w-16 bg-gray-200 rounded-md" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-7 w-60 bg-gray-200 rounded-md" />
                <div className="h-4 w-72 bg-gray-200 rounded-md" />
              </div>
            </div>
            <div className="h-9 w-28 bg-gray-200 rounded-lg shrink-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-gray-100/80 border-b border-gray-100">
                <div className="h-5 w-44 bg-gray-200 rounded-md mb-2" />
                <div className="h-3.5 w-64 bg-gray-200 rounded-md" />
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-sm" />
                    <div className="h-4 w-32 bg-gray-200 rounded-md" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded-md" />
                      <div className="h-3.5 w-36 bg-gray-200 rounded-md" />
                      <div className="h-3.5 w-28 bg-gray-200 rounded-md" />
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded-md" />
                      <div className="h-3.5 w-36 bg-gray-200 rounded-md" />
                      <div className="h-3.5 w-28 bg-gray-200 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100 my-4" />

                <div>
                  <div className="h-4 w-28 bg-gray-200 rounded-md mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-xl" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 w-14 bg-gray-200 rounded-md mb-2" />
                    <div className="h-12 w-full bg-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded-md mb-2" />
                    <div className="h-12 w-full bg-gray-200 rounded-xl" />
                  </div>
                </div>

                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded-md mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-xl" />
                </div>

                <div>
                  <div className="h-4 w-28 bg-gray-200 rounded-md mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-gray-100/80 border-b border-gray-100">
                <div className="h-5 w-40 bg-gray-200 rounded-md mb-2" />
                <div className="h-3.5 w-52 bg-gray-200 rounded-md" />
              </div>

              <div className="p-6 space-y-4">
                <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-36 bg-gray-200 rounded-md" />
                    <div className="h-3.5 w-60 bg-gray-200 rounded-md" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
                </div>

                <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 bg-gray-200 rounded-md" />
                    <div className="h-3.5 w-64 bg-gray-200 rounded-md" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-36 bg-gray-200 rounded-md" />
                    <div className="h-3 w-56 bg-gray-200 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
              <div className="px-6 py-4 bg-gray-100/80 border-b border-gray-100">
                <div className="h-5 w-36 bg-gray-200 rounded-md mb-2" />
                <div className="h-3.5 w-20 bg-gray-200 rounded-md" />
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                    >
                      <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="h-3.5 w-3/4 bg-gray-200 rounded-md" />
                        <div className="h-3 w-1/2 bg-gray-200 rounded-md" />
                      </div>
                      <div className="h-4 w-14 bg-gray-200 rounded-md shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-gray-100 my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-16 bg-gray-200 rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 rounded-md" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-gray-200 rounded-md" />
                    <div className="h-4 w-12 bg-gray-200 rounded-md" />
                  </div>
                  <div className="w-full h-px bg-gray-100" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-5 w-14 bg-gray-200 rounded-md" />
                    <div className="h-6 w-28 bg-gray-200 rounded-md" />
                  </div>
                </div>

                <div className="w-full h-14 bg-gray-200 rounded-xl mt-6" />

                <div className="flex items-center justify-around gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="h-3.5 w-16 bg-gray-200 rounded-md" />
                  <div className="h-3.5 w-20 bg-gray-200 rounded-md" />
                  <div className="h-3.5 w-16 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
