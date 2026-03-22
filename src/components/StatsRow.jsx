function StatCard({ label, value, accent, icon }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 border ${accent}`}>
      <div className="text-2xl font-black tracking-tight">{value}</div>
      <div className="text-xs font-medium text-gray-500 mt-0.5">{label}</div>
      <div className="absolute right-3 top-3 text-2xl opacity-20">{icon}</div>
    </div>
  );
}

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      <StatCard label="Total"       value={stats.total}      accent="border-gray-200 bg-white"        icon="📊" />
      <StatCard label="Pending"     value={stats.pending}    accent="border-amber-200 bg-amber-50"     icon="⏳" />
      <StatCard label="In Progress" value={stats.inProgress} accent="border-blue-200 bg-blue-50"       icon="🔄" />
      <StatCard label="Completed"   value={stats.completed}  accent="border-emerald-200 bg-emerald-50" icon="✅" />
      <StatCard
        label="Overdue" value={stats.overdue}
        accent={`border-red-200 ${stats.overdue > 0 ? "bg-red-50" : "bg-white"}`}
        icon="⚠️"
      />
    </div>
  );
}