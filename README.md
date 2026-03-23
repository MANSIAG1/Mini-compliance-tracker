# LedgersCFO — Mini Compliance Tracker

A full-stack web app to track compliance tasks across multiple clients.
Built for CA firms to manage GST filings, TDS returns, payroll deadlines — all in one place.

## Live Demo
🔗 https://compliance-tracker-two.vercel.app/

## GitHub Repo
🔗 https://github.com/MANSIAG1/Mini-compliance-tracker

---

## Features

- View all clients with overdue badge count and progress bar
- Per-client task management
- Add new compliance tasks with form validation
- Update task status — Pending → In Progress → Completed
- Filter tasks by status and category
- Sort by due date, priority, or status
- Search tasks by title or description
- Overdue tasks auto-highlighted in red
- Summary stats — Total / Pending / In Progress / Completed / Overdue
- Data persists via backend JSON storage

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Backend | Node.js + Express |
| Storage | JSON file (db.json) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git + GitHub |

---

## Project Structure
```
compliance-tracker/
├── backend/
│   ├── data/
│   │   └── db.json              # JSON file storage — clients and tasks
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handler
│   ├── routes/
│   │   ├── clients.js           # GET /api/clients, GET /api/clients/:id
│   │   └── tasks.js             # GET, POST, PATCH /api/tasks
│   ├── .env                     # Environment variables (not committed)
│   ├── package.json
│   └── server.js                # Express app entry point
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top navbar with global stats
│   │   ├── ClientSidebar.jsx    # Client list with search and progress
│   │   ├── StatsRow.jsx         # Summary cards per client
│   │   ├── TaskFilters.jsx      # Filter, search and sort bar
│   │   ├── TaskCard.jsx         # Task card with overdue highlight
│   │   ├── AddTaskModal.jsx     # Modal form to add new task
│   │   └── EmptyState.jsx       # Shown when no client selected
│   ├── data/
│   │   └── seedData.js          # Static enums — categories, statuses
│   ├── hooks/
│   │   └── useCompliance.js     # Central state — fetches from backend API
│   ├── utils/
│   │   └── helpers.js           # isOverdue, formatDate, daysUntil
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── README.md
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## Backend APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/clients` | Get all clients |
| GET | `/api/clients/:id` | Get single client |
| GET | `/api/tasks?client_id=c1` | Get tasks for a client |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update task status |

### Validation Rules
- `client_id`, `title`, `due_date` are required for creating a task
- `status` must be one of: Pending, In Progress, Completed
- `category` must be one of: Tax, Filing, Payroll, Corporate, Audit, Regulatory
- `priority` must be one of: Low, Medium, High, Critical

---

## Local Setup

### Prerequisites
- Node.js v18 or above
- npm v9 or above

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/MANSIAG1/Mini-compliance-tracker.git
cd Mini-compliance-tracker

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Create backend .env file
echo "PORT=5000" > .env

# 5. Start backend (Terminal 1)
node server.js

# 6. Start frontend (Terminal 2 — go back to root)
cd ..
npm run dev
```

Open **http://localhost:5173** in your browser.
Backend runs on **http://localhost:5000**

---

## Deployment

### Frontend — Vercel
```bash
# 1. Build the project
npm run build

# 2. Deploy using Vercel CLI
npx vercel --prod
```

- Login to Vercel with GitHub when prompted
- When asked about multiple services, select **"Set up project with all detected services"**
- You will get a live link after deployment

### Backend — Render

1. Go to **render.com** → Sign up with GitHub
2. Click **New + → Web Service**
3. Connect your GitHub repo
4. Fill in these settings:

| Field | Value |
|---|---|
| Name | compliance-tracker-backend |
| Language | Node |
| Branch | main |
| Root Directory | backend |
| Build Command | npm install |
| Start Command | node server.js |
| Instance Type | Free |

5. Add Environment Variable:
```
KEY:   PORT
VALUE: 5000
```

6. Click **Deploy Web Service**
7. You will get a live URL like: `https://your-app.onrender.com`

### Connect Frontend to Backend (Production)

After backend is deployed, update `src/hooks/useCompliance.js`:
```js
const API = "https://your-render-backend-url.onrender.com/api";
```

Then redeploy frontend:
```bash
npx vercel --prod
```

---

## Seed Data

Pre-loaded with:
- **8 clients** — TCS, Nykaa, Groww, Reliance, Zepto, Razorpay, Ola Electric, CRED
- **30 tasks** across Tax, Filing, Payroll, Corporate, Audit, Regulatory categories
- Mix of Pending, In Progress, Completed and Overdue tasks

To reset seed data — replace `backend/data/db.json` with original content from repo.

---

## Tradeoffs

| Decision | Reason |
|---|---|
| JSON file over PostgreSQL/MongoDB | Keeps setup simple with zero infra cost. Easy to swap for a real DB later. Meets "simple storage is fine" requirement. |
| No authentication | Out of scope for this MVP. Production version would use JWT + bcrypt. |
| Fixed category enum | Simpler UX. Dynamic categories would need extra DB table and UI complexity. |
| Single user | No multi-tenancy needed for demo. Easy to extend with user_id on tasks. |
| Vite over CRA | Faster builds, better DX, industry standard in 2025. |
| Express over Fastify | More widely known, easier to review and understand. |

---

## Assumptions

- One user manages all clients — no login required for demo
- **Overdue** = due_date is in the past AND status is not Completed
- All seed clients are India-based
- Categories are fixed: Tax, Filing, Payroll, Corporate, Audit, Regulatory
- Priority levels: Low, Medium, High, Critical
- Backend and frontend run on separate ports locally (5000 and 5173)

---

## Future Improvements

- PostgreSQL or MongoDB for production-grade storage
- JWT-based user authentication
- Email/SMS reminders for upcoming deadlines
- Export tasks to PDF or Excel
- Multi-user support with role-based access
- Docker setup for easy deployment
- Dashboard with charts — overdue trends, completion rates

---

## Author

Made by **Mansi Agarwal**
[GitHub](https://github.com/MANSIAG1)