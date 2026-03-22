import { useState } from "react";
import { useCompliance } from "./hooks/useCompliance";
import Header        from "./components/Header";
import ClientSidebar from "./components/ClientSidebar";
import StatsRow      from "./components/StatsRow";
import TaskFilters   from "./components/TaskFilters";
import TaskCard      from "./components/TaskCard";
import AddTaskModal  from "./components/AddTaskModal";
import EmptyState    from "./components/EmptyState";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    data, selectedClient, filterStatus, filterCategory,
    search, sortBy, clientSearch, filteredTasks,
    stats, globalStats, filteredClients,
    setFilterStatus, setFilterCategory, setSearch,
    setSortBy, setClientSearch, selectClient,
    updateTaskStatus, addTask,
  } = useCompliance();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header globalStats={globalStats} />
      <div className="flex h-[calc(100vh-64px)]">
        <ClientSidebar
          clients={filteredClients}
          allTasks={data.tasks}
          selectedClient={selectedClient}
          onSelect={selectClient}
          search={clientSearch}
          onSearch={setClientSearch}
        />
        <main className="flex-1 overflow-y-auto">
          {!selectedClient ? (
            <EmptyState globalStats={globalStats} />
          ) : (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">{selectedClient.company_name}</h1>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {selectedClient.entity_type} · {selectedClient.country}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg leading-none">+</span> Add Task
                </button>
              </div>
              <StatsRow stats={stats} />
              <TaskFilters
                filterStatus={filterStatus}
                filterCategory={filterCategory}
                search={search}
                sortBy={sortBy}
                onStatus={setFilterStatus}
                onCategory={setFilterCategory}
                onSearch={setSearch}
                onSort={setSortBy}
              />
              <div className="text-xs text-gray-400 font-semibold mb-3">
                Showing {filteredTasks.length} tasks
                {filteredTasks.filter(t => t.status !== "Completed" && new Date(t.due_date) < new Date()).length > 0 && (
                  <span className="ml-2 text-red-500">
                    · {filteredTasks.filter(t => t.status !== "Completed" && new Date(t.due_date) < new Date()).length} overdue
                  </span>
                )}
              </div>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">🎉</div>
                  <div className="font-bold">No tasks found</div>
                  <div className="text-sm mt-1">Try adjusting filters or add a new task.</div>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} onStatusChange={updateTaskStatus} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      {showAddModal && (
        <AddTaskModal
          clientId={selectedClient?.id}
          onAdd={addTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}