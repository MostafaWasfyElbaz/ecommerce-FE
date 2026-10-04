import AddressesSkeleton from "@/src/app/_componnents/Addresses/AddressesSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-gray-200 rounded-md" />
          <div className="h-4 w-60 bg-gray-200 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded-xl" />
      </div>

      <AddressesSkeleton />
    </div>
  );
}
