import { isOverdue, formatDate, daysUntil } from "../utils/helpers";

const BADGE_COLORS = {
  pending:       "bg-amber-100 text-amber-700 border border-amber-200",
  "in progress": "bg-blue-100 text-blue-700 border border-blue-200",
  completed:     "bg-emerald-100 text-emerald-700 border border-emerald-200",
  overdue:       "bg-red-100 text-red-700 border border-red-200",
  critical:      "bg-red-500 text-white shadow-sm",
  high:          "bg-orange-100 text-orange-700 border border-orange-200",
  medium:        "bg-yellow-100 text-yellow-700 border border-yellow-200",
  low:           "bg-gray-100 text-gray-500 border border-gray-200",
  tax:           "bg-violet-100 text-violet-700",
  filing:        "bg-sky-100 text-sky-700",
  payroll:       "bg-teal-100 text-teal-700",
  corporate:     "bg-indigo-100 text-indigo-700",
  audit:         "bg-rose-100 text-rose-700",
  regulatory:    "bg-fuchsia-100 text-fuchsia-700",
};

function Badge({ children, color }) {
  const cls = BADGE_COLORS[color?.toLowerCase()] || "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}

export default function TaskCard({ task, onStatusChange }) {
  const overdue = isOverdue(task);
  const days    = daysUntil(task.due_date);

  return (
    <div className={`rounded-2xl border p-4 transition-all duration-200 hover:shadow-card-hover hover:scale-[1.01] ${
      overdue
        ? "border-red-200 bg-gradient-to-br from-red-50 to-rose-50 shadow-sm"
        : "border-gray-100 bg-white shadow-card"
    }`}>

      {overdue && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs font-black mb-3 bg-red-100 rounded-xl px-3 py-1.5">
          ⚠️ OVERDUE by {Math.abs(days)} day{Math.abs(days) !== 1 ? "s" : ""}
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm leading-tight">{task.title}</div>
          {task.description && (
            <div className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{task.description}</div>
          )}
        </div>
        <Badge color={task.priority}>{task.priority}</Badge>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <Badge color={task.category}>{task.category}</Badge>
        <Badge color={overdue ? "overdue" : task.status}>
          {overdue ? "Overdue" : task.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className={`text-xs font-semibold flex items-center gap-1 ${
          overdue ? "text-red-500" : days <= 3 ? "text-amber-500" : "text-gray-400"
        }`}>
          📅 {formatDate(task.due_date)}
          {!overdue && task.status !== "Completed" && (
            <span className="ml-1 font-normal">
              ({days === 0 ? "Today!" : days > 0 ? `in ${days}d` : `${Math.abs(days)}d ago`})
            </span>
          )}
        </div>

        {task.status !== "Completed" ? (
          <select
            value={task.status}
            onChange={e => onStatusChange(task.id, e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer font-medium"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        ) : (
          <span className="text-xs text-emerald-600 font-black bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            ✓ Done
          </span>
        )}
      </div>
    </div>
  );
}