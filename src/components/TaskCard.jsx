import { isOverdue, formatDate, daysUntil } from "../utils/helpers";

const BADGE_COLORS = {
  pending:       "bg-amber-100 text-amber-800 border border-amber-200",
  "in progress": "bg-blue-100 text-blue-800 border border-blue-200",
  completed:     "bg-emerald-100 text-emerald-800 border border-emerald-200",
  overdue:       "bg-red-100 text-red-800 border border-red-200",
  critical:      "bg-red-500 text-white",
  high:          "bg-orange-100 text-orange-800 border border-orange-200",
  medium:        "bg-yellow-100 text-yellow-800 border border-yellow-200",
  low:           "bg-gray-100 text-gray-600 border border-gray-200",
  tax:           "bg-violet-100 text-violet-800",
  filing:        "bg-sky-100 text-sky-800",
  payroll:       "bg-teal-100 text-teal-800",
  corporate:     "bg-indigo-100 text-indigo-800",
  audit:         "bg-rose-100 text-rose-800",
  regulatory:    "bg-fuchsia-100 text-fuchsia-800",
};

function Badge({ children, color }) {
  const cls = BADGE_COLORS[color?.toLowerCase()] || "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}

export default function TaskCard({ task, onStatusChange }) {
  const overdue = isOverdue(task);
  const days    = daysUntil(task.due_date);

  return (
    <div className={`rounded-2xl border p-4 transition-all hover:shadow-md ${
      overdue ? "border-red-200 bg-red-50/60" : "border-gray-100 bg-white"
    }`}>
      {overdue && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold mb-2">
          ⚠ OVERDUE by {Math.abs(days)} day{Math.abs(days) !== 1 ? "s" : ""}
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm leading-tight truncate">{task.title}</div>
          {task.description && (
            <div className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</div>
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
        <div className={`text-xs font-medium ${
          overdue ? "text-red-600" : days <= 3 ? "text-amber-600" : "text-gray-500"
        }`}>
          📅 {formatDate(task.due_date)}
          {!overdue && task.status !== "Completed" && (
            <span className="ml-1">
              ({days === 0 ? "Today" : days > 0 ? `in ${days}d` : `${Math.abs(days)}d ago`})
            </span>
          )}
        </div>
        {task.status !== "Completed" ? (
          <select
            value={task.status}
            onChange={e => onStatusChange(task.id, e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        ) : (
          <span className="text-xs text-emerald-600 font-semibold">✓ Done</span>
        )}
      </div>
    </div>
  );
}