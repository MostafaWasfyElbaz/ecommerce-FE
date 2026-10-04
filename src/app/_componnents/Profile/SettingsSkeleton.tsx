export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="mb-6 space-y-2">
        <div className="h-6 w-44 bg-gray-200 rounded-md" />
        <div className="h-4 w-80 max-w-full bg-gray-200 rounded-md" />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded-md" />
              <div className="h-3.5 w-48 bg-gray-200 rounded-md" />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div>
              <div className="h-4 w-28 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div className="pt-4">
              <div className="h-12 w-36 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50">
          <div className="h-5 w-44 bg-gray-200 rounded-md mb-4" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 bg-gray-200 rounded-md" />
              <div className="h-4 w-32 bg-gray-200 rounded-md" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-12 bg-gray-200 rounded-md" />
              <div className="h-6 w-16 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-36 bg-gray-200 rounded-md" />
              <div className="h-3.5 w-52 bg-gray-200 rounded-md" />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div>
              <div className="h-4 w-28 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div>
              <div className="h-4 w-40 bg-gray-200 rounded-md mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            <div className="pt-4">
              <div className="h-12 w-44 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
