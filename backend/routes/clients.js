import express from "express";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../data/db.json");

const readDB = () => JSON.parse(readFileSync(dbPath, "utf-8"));

// GET /api/clients — get all clients
router.get("/", (req, res, next) => {
  try {
    const db = readDB();
    res.json({ success: true, data: db.clients });
  } catch (err) {
    next(err);
  }
});

// GET /api/clients/:id — get single client
router.get("/:id", (req, res, next) => {
  try {
    const db = readDB();
    const client = db.clients.find(c => c.id === req.params.id);
    if (!client) return res.status(404).json({ success: false, error: "Client not found" });
    res.json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
});

export default router;