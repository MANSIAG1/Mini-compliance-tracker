export default function Header({ globalStats }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center text-slate-900 font-black text-lg">
          L
        </div>
        <div>
          <div className="font-black text-base tracking-tight">LedgersCFO</div>
          <div className="text-xs text-slate-400">Compliance Tracker</div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-6 text-xs text-slate-400">
        <span>
          <span className="text-white font-bold text-sm">{globalStats.clients}</span> Clients
        </span>
        <span>
          <span className="text-white font-bold text-sm">{globalStats.totalTasks}</span> Tasks
        </span>
        <span>
          <span className={`font-bold text-sm ${globalStats.overdue > 0 ? "text-red-400" : "text-emerald-400"}`}>
            {globalStats.overdue}
          </span> Overdue
        </span>
      </div>
    </header>
  );
}