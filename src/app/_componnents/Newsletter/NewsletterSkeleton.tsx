export default function NewsletterSkeleton() {
  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-16 animate-pulse">
      <div className="container mx-auto">
        <div className="overflow-hidden rounded-[2.5rem] border border-emerald-100/50 bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8 shadow-2xl shadow-emerald-500/10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-32 rounded bg-gray-200" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-9 w-3/4 rounded bg-gray-200" />
                <div className="h-5 w-1/2 rounded bg-gray-200" />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-36 rounded-full bg-gray-200" />
                <div className="h-10 w-40 rounded-full bg-gray-200" />
                <div className="h-10 w-36 rounded-full bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <div className="h-14 flex-1 rounded-2xl bg-gray-200" />
                <div className="h-14 w-36 rounded-2xl bg-gray-200" />
              </div>
            </div>

            <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
              <div className="rounded-3xl bg-gray-800 p-8 space-y-5">
                <div className="h-5 w-24 rounded-full bg-gray-700" />
                <div className="h-7 w-48 rounded bg-gray-700" />
                <div className="h-4 w-60 rounded bg-gray-700" />
                <div className="space-y-3 pt-2">
                  <div className="h-14 w-full rounded-xl bg-gray-700" />
                  <div className="h-14 w-full rounded-xl bg-gray-700" />
                </div>
                <div className="h-4 w-36 rounded bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
