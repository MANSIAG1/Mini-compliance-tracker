function StatCard({ label, value, accent, icon }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 border shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02] ${accent}`}>
      <div className="text-3xl font-black tracking-tight">{value}</div>
      <div className="text-xs font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{label}</div>
      <div className="absolute right-3 top-3 text-3xl opacity-15">{icon}</div>
    </div>
  );
}

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      <StatCard label="Total"       value={stats.total}      accent="border-gray-200 bg-white"                    icon="📊" />
      <StatCard label="Pending"     value={stats.pending}    accent="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"   icon="⏳" />
      <StatCard label="In Progress" value={stats.inProgress} accent="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50"     icon="🔄" />
      <StatCard label="Completed"   value={stats.completed}  accent="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50" icon="✅" />
      <StatCard
        label="Overdue" value={stats.overdue}
        accent={`border-red-200 ${stats.overdue > 0 ? "bg-gradient-to-br from-red-50 to-rose-50" : "bg-white"}`}
        icon="⚠️"
      />
    </div>
  );
}