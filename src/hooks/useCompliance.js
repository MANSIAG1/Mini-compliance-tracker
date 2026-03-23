import { useState, useEffect, useMemo } from "react";
import { PRIORITIES } from "../data/seedData";
import { isOverdue } from "../utils/helpers";

const API = "https://mini-compliance-tracker-i72b.onrender.com/api";

export function useCompliance() {
  const [clients,        setClients]        = useState([]);
  const [allTasks,       setAllTasks]       = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterStatus,   setFilterStatus]   = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [search,         setSearch]         = useState("");
  const [sortBy,         setSortBy]         = useState("due_date");
  const [clientSearch,   setClientSearch]   = useState("");
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    fetch(`${API}/clients`)
      .then(r => r.json())
      .then(res => { if (res.success) setClients(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedClient) return;
    fetch(`${API}/tasks?client_id=${selectedClient.id}`)
      .then(r => r.json())
      .then(res => { if (res.success) setAllTasks(res.data); })
      .catch(() => {});
  }, [selectedClient]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch(`${API}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAllTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      }
    } catch {}
  };

  const addTask = async (task) => {
    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (data.success) setAllTasks(prev => [...prev, data.data]);
    } catch {}
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    setAllTasks([]);
    setFilterStatus("All");
    setFilterCategory("All");
    setSearch("");
  };

  const clientTasks = allTasks;

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
    clients:    clients.length,
    totalTasks: clients.length,
    overdue:    allTasks.filter(isOverdue).length,
    pending:    allTasks.filter(t => t.status === "Pending").length,
  }), [clients, allTasks]);

  const filteredClients = useMemo(() =>
    clients.filter(c =>
      c.company_name.toLowerCase().includes(clientSearch.toLowerCase())
    ), [clients, clientSearch]);

  return {
    data: { clients, tasks: allTasks },
    selectedClient, filterStatus, filterCategory,
    search, sortBy, clientSearch, clientTasks, filteredTasks,
    stats, globalStats, filteredClients, loading,
    setFilterStatus, setFilterCategory, setSearch,
    setSortBy, setClientSearch, selectClient,
    updateTaskStatus, addTask,
  };
}