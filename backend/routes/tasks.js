import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../data/db.json");

const readDB  = () => JSON.parse(readFileSync(dbPath, "utf-8"));
const writeDB = (db) => writeFileSync(dbPath, JSON.stringify(db, null, 2));

const VALID_STATUSES   = ["Pending", "In Progress", "Completed"];
const VALID_CATEGORIES = ["Tax", "Filing", "Payroll", "Corporate", "Audit", "Regulatory"];
const VALID_PRIORITIES = ["Low", "Medium", "High", "Critical"];

// GET /api/tasks?client_id=c1 — get tasks for a client
router.get("/", (req, res, next) => {
  try {
    const { client_id } = req.query;
    if (!client_id) return res.status(400).json({ success: false, error: "client_id is required" });

    const db = readDB();
    const client = db.clients.find(c => c.id === client_id);
    if (!client) return res.status(404).json({ success: false, error: "Client not found" });

    const tasks = db.tasks.filter(t => t.client_id === client_id);
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks — create new task
router.post("/", (req, res, next) => {
  try {
    const { client_id, title, description, category, due_date, status, priority } = req.body;

    // Validation
    if (!client_id)      return res.status(400).json({ success: false, error: "client_id is required" });
    if (!title?.trim())  return res.status(400).json({ success: false, error: "title is required" });
    if (!due_date)       return res.status(400).json({ success: false, error: "due_date is required" });
    if (category  && !VALID_CATEGORIES.includes(category))  return res.status(400).json({ success: false, error: `category must be one of: ${VALID_CATEGORIES.join(", ")}` });
    if (status    && !VALID_STATUSES.includes(status))      return res.status(400).json({ success: false, error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
    if (priority  && !VALID_PRIORITIES.includes(priority))  return res.status(400).json({ success: false, error: `priority must be one of: ${VALID_PRIORITIES.join(", ")}` });

    const db = readDB();
    const client = db.clients.find(c => c.id === client_id);
    if (!client) return res.status(404).json({ success: false, error: "Client not found" });

    const newTask = {
      id:          "t" + Date.now(),
      client_id,
      title:       title.trim(),
      description: description?.trim() || "",
      category:    category  || "Tax",
      due_date,
      status:      status    || "Pending",
      priority:    priority  || "Medium",
    };

    db.tasks.push(newTask);
    writeDB(db);

    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/tasks/:id — update task status
router.patch("/:id", (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, error: "status is required" });
    if (!VALID_STATUSES.includes(status)) return res.status(400).json({ success: false, error: `status must be one of: ${VALID_STATUSES.join(", ")}` });

    const db = readDB();
    const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ success: false, error: "Task not found" });

    db.tasks[taskIndex].status = status;
    writeDB(db);

    res.json({ success: true, data: db.tasks[taskIndex] });
  } catch (err) {
    next(err);
  }
});

export default router;