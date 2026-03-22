import { isOverdue } from "../utils/helpers";

export default function ClientSidebar({ clients, allTasks, selectedClient, onSelect, search, onSearch }) {
  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col overflow-hidden flex-shrink-0">
      <div className="p-4 border-b border-gray-100">
        <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Clients</div>
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>
      <div className="overflow-y-auto flex-1 p-3 space-y-1">
        {clients.map(client => {
          const cTasks   = allTasks.filter(t => t.client_id === client.id);
          const cOverdue = cTasks.filter(isOverdue).length;
          const isSelected = selectedClient?.id === client.id;
          return (
            <button
              key={client.id}
              onClick={() => onSelect(client)}
              className={`w-full text-left rounded-xl p-3 transition-all ${
                isSelected ? "bg-slate-900 text-white" : "hover:bg-gray-50 text-gray-800"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm leading-tight truncate">{client.company_name}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? "text-slate-400" : "text-gray-400"}`}>
                    {client.entity_type} · {client.country}
                  </div>
                </div>
                {cOverdue > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">
                    {cOverdue}
                  </span>
                )}
              </div>
              <div className={`flex gap-2 mt-2 text-xs ${isSelected ? "text-slate-400" : "text-gray-400"}`}>
                <span>{cTasks.length} tasks</span>
                <span>·</span>
                <span>{cTasks.filter(t => t.status === "Completed").length} done</span>
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