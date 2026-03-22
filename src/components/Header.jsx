export default function Header({ globalStats }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl border-b border-purple-900/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-slate-900 font-black text-lg shadow-lg">
          L
        </div>
        <div>
          <div className="font-black text-base tracking-tight font-display">LedgersCFO</div>
          <div className="text-xs text-purple-300">Compliance Tracker</div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <StatPill label="Clients"   value={globalStats.clients}    color="bg-white/10" />
        <StatPill label="Tasks"     value={globalStats.totalTasks} color="bg-white/10" />
        <StatPill label="Overdue"   value={globalStats.overdue}
          color={globalStats.overdue > 0 ? "bg-red-500/80" : "bg-emerald-500/80"} />
      </div>
    </header>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div className={`${color} backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 border border-white/10`}>
      <span className="text-white font-black text-sm">{value}</span>
      <span className="text-white/60 text-xs">{label}</span>
    </div>
  );
}