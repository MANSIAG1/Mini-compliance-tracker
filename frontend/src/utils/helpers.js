export const isOverdue = (task) =>
  task.status !== "Completed" &&
  new Date(task.due_date) < new Date(new Date().toDateString());

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

export const daysUntil = (d) => {
  const diff = new Date(d) - new Date(new Date().toDateString());
  return Math.round(diff / 86400000);
};

export const STORAGE_KEY = "compliance_tracker_v1";

export const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};