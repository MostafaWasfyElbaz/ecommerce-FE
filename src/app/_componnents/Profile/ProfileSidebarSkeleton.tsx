export default function ProfileSidebarSkeleton() {
  return (
    <aside className="w-full lg:w-72 shrink-0 animate-pulse">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="h-5 w-28 bg-gray-200 rounded-md" />
        </div>

        <ul className="p-2 space-y-1">
          {[...Array(2)].map((_, i) => (
            <li key={i}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0" />

                <div className="h-4 w-28 bg-gray-200 rounded-md flex-1" />

                <div className="w-2.5 h-3.5 bg-gray-200 rounded-xs shrink-0" />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
