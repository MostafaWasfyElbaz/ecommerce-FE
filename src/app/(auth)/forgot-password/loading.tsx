export default function Loading() {
  return (
    <div className="container py-16 mx-auto px-4 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-full h-96 bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 w-64 mx-auto rounded bg-gray-200" />
              <div className="h-4 w-96 max-w-full mx-auto rounded bg-gray-200" />
              <div className="flex items-center justify-center space-x-8 pt-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 space-y-8">
            <div className="text-center space-y-3">
              <div className="h-8 w-32 mx-auto rounded bg-gray-200" />
              <div className="h-6 w-48 mx-auto rounded bg-gray-200" />
              <div className="h-4 w-60 mx-auto rounded bg-gray-200" />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="w-16 h-0.5 mx-2 bg-gray-200" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="w-16 h-0.5 mx-2 bg-gray-200" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            </div>

            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>
              <div className="h-12 w-full rounded-xl bg-gray-200" />
              <div className="h-4 w-32 mx-auto rounded bg-gray-200" />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="h-4 w-52 mx-auto rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
