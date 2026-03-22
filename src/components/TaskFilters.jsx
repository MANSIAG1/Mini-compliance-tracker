import { STATUSES, CATEGORIES } from "../data/seedData";

export default function TaskFilters({ filterStatus, filterCategory, search, sortBy, onStatus, onCategory, onSearch, onSort }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 w-48"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">STATUS</span>
          <div className="flex gap-1">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => onStatus(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterStatus === s
                    ? "bg-slate-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">CATEGORY</span>
          <select
            value={filterCategory}
            onChange={e => onCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-2 py-1.5 text-xs focus:outline-none bg-white"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-semibold text-gray-400">SORT</span>
          <select
            value={sortBy}
            onChange={e => onSort(e.target.value)}
            className="border border-gray-200 rounded-xl px-2 py-1.5 text-xs focus:outline-none bg-white"
          >
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}