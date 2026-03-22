export default function EmptyState({ globalStats }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="text-6xl mb-4">📋</div>
      <div className="text-xl font-black text-gray-700">Select a Client</div>
      <div className="text-gray-400 text-sm mt-2">
        Choose a client from the sidebar to view and manage their compliance tasks.
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 max-w-xs w-full">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
          <div className="text-3xl font-black text-red-600">{globalStats.overdue}</div>
          <div className="text-xs text-red-500 font-semibold mt-1">Overdue Tasks</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
          <div className="text-3xl font-black text-amber-600">{globalStats.pending}</div>
          <div className="text-xs text-amber-500 font-semibold mt-1">Pending Tasks</div>
        </div>
      </div>
    </div>
  );
}