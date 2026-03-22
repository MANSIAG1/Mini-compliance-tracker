import express from "express";
import cors from "cors";
import clientsRouter from "./routes/clients.js";
import tasksRouter from "./routes/tasks.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/clients", clientsRouter);
app.use("/api/tasks", tasksRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "LedgersCFO Compliance Tracker API is running!" });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});