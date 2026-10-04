import ProductsContentSkeleton from "@/src/app/_componnents/Products/ProductsContentSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white animate-pulse">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-white/30" />
            <div className="h-4 w-3 rounded bg-white/20" />
            <div className="h-4 w-24 rounded bg-white/30" />
          </div>
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/20 ring-1 ring-white/30" />
            <div className="space-y-2">
              <div className="h-8 w-48 rounded bg-white/30" />
              <div className="h-4 w-64 rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <ProductsContentSkeleton />
    </div>
  );
}
