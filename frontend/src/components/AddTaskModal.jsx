import { useState } from "react";
import { CATEGORIES, PRIORITIES, STATUSES } from "../data/seedData";

const d = (days) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().split("T")[0];
};

export default function AddTaskModal({ clientId, onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "", description: "", category: "Tax",
    due_date: d(7), status: "Pending", priority: "Medium",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.due_date)     e.due_date = "Due date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ ...form, id: "t" + Date.now(), client_id: clientId });
    onClose();
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">Add New Task</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-lg">×</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Task Title *</label>
            <input
              value={form.title} onChange={set("title")}
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 ${errors.title ? "border-red-400" : "border-gray-200"}`}
              placeholder="e.g. GST Filing Q1"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
            <textarea
              value={form.description} onChange={set("description")} rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
              placeholder="Optional details..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select value={form.category} onChange={set("category")} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white">
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
              <select value={form.priority} onChange={set("priority")} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white">
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Due Date *</label>
              <input
                type="date" value={form.due_date} onChange={set("due_date")}
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 ${errors.due_date ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.due_date && <p className="text-xs text-red-500 mt-1">{errors.due_date}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={set("status")} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white">
                {STATUSES.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 bg-slate-900 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-700 transition-colors">Add Task</button>
        </div>
      </div>
    </div>
  );
}