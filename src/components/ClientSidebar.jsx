import { isOverdue } from "../utils/helpers";

export default function ClientSidebar({ clients, allTasks, selectedClient, onSelect, search, onSearch }) {
  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col overflow-hidden flex-shrink-0 shadow-sm">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Clients</div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
        {clients.map(client => {
          const cTasks   = allTasks.filter(t => t.client_id === client.id);
          const cOverdue = cTasks.filter(isOverdue).length;
          const cDone    = cTasks.filter(t => t.status === "Completed").length;
          const progress = cTasks.length ? Math.round((cDone / cTasks.length) * 100) : 0;
          const isSelected = selectedClient?.id === client.id;

          return (
            <button
              key={client.id}
              onClick={() => onSelect(client)}
              className={`w-full text-left rounded-2xl p-3.5 transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-br from-slate-800 to-purple-900 text-white shadow-lg scale-[1.02]"
                  : "hover:bg-purple-50 text-gray-800 hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm leading-tight truncate">{client.company_name}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? "text-purple-300" : "text-gray-400"}`}>
                    {client.entity_type} · {client.country}
                  </div>
                </div>
                {cOverdue > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black flex-shrink-0 shadow-sm animate-pulse">
                    {cOverdue}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-1 rounded-full mt-2 ${isSelected ? "bg-white/20" : "bg-gray-100"}`}>
                <div
                  className={`h-1 rounded-full transition-all ${isSelected ? "bg-amber-400" : "bg-purple-400"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={`flex justify-between mt-1.5 text-xs ${isSelected ? "text-purple-300" : "text-gray-400"}`}>
                <span>{cTasks.length} tasks</span>
                <span>{progress}% done</span>
              </div>
            </button>
          );
        })}

        {clients.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">No clients found</div>
        )}
      </div>
    </aside>
  );
}