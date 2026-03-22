import { useState, useEffect, useMemo } from "react";
import { CLIENTS, TASKS, PRIORITIES } from "../data/seedData";
import { isOverdue, loadFromStorage, saveToStorage } from "../utils/helpers";

export function useCompliance() {
  const [data, setData] = useState(() => {
    const saved = loadFromStorage();
    return saved || { clients: CLIENTS, tasks: TASKS };
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterStatus,   setFilterStatus]   = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [search,         setSearch]         = useState("");
  const [sortBy,         setSortBy]         = useState("due_date");
  const [clientSearch,   setClientSearch]   = useState("");

  useEffect(() => { saveToStorage(data); }, [data]);

  const updateTaskStatus = (taskId, newStatus) =>
    setData(d => ({
      ...d,
      tasks: d.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t),
    }));

  const addTask = (task) =>
    setData(d => ({ ...d, tasks: [...d.tasks, task] }));

  const selectClient = (client) => {
    setSelectedClient(client);
    setFilterStatus("All");
    setFilterCategory("All");
    setSearch("");
  };

  const clientTasks = useMemo(
    () => data.tasks.filter(t => t.client_id === selectedClient?.id),
    [data.tasks, selectedClient]
  );

  const filteredTasks = useMemo(() => {
    let tasks = clientTasks;
    if (filterStatus   !== "All") tasks = tasks.filter(t => t.status   === filterStatus);
    if (filterCategory !== "All") tasks = tasks.filter(t => t.category === filterCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      );
    }
    return [...tasks].sort((a, b) => {
      if (sortBy === "due_date") return new Date(a.due_date) - new Date(b.due_date);
      if (sortBy === "priority") return PRIORITIES.indexOf(b.priority) - PRIORITIES.indexOf(a.priority);
      if (sortBy === "status")   return a.status.localeCompare(b.status);
      return 0;
    });
  }, [clientTasks, filterStatus, filterCategory, search, sortBy]);

  const stats = useMemo(() => ({
    total:      clientTasks.length,
    pending:    clientTasks.filter(t => t.status === "Pending").length,
    inProgress: clientTasks.filter(t => t.status === "In Progress").length,
    completed:  clientTasks.filter(t => t.status === "Completed").length,
    overdue:    clientTasks.filter(isOverdue).length,
  }), [clientTasks]);

  const globalStats = useMemo(() => ({
    clients:    data.clients.length,
    totalTasks: data.tasks.length,
    overdue:    data.tasks.filter(isOverdue).length,
    pending:    data.tasks.filter(t => t.status === "Pending").length,
  }), [data]);

  const filteredClients = useMemo(() =>
    data.clients.filter(c =>
      c.company_name.toLowerCase().includes(clientSearch.toLowerCase())
    ), [data.clients, clientSearch]);

  return {
    data, selectedClient, filterStatus, filterCategory,
    search, sortBy, clientSearch, clientTasks, filteredTasks,
    stats, globalStats, filteredClients,
    setFilterStatus, setFilterCategory, setSearch,
    setSortBy, setClientSearch, selectClient,
    updateTaskStatus, addTask,
  };
}