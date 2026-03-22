# LedgersCFO — Compliance Tracker

A lightweight web app to track compliance tasks across multiple clients.  
Built for CA firms to manage GST filings, TDS returns, payroll deadlines — all in one place.

## Live Demo
🔗 [Add Vercel link here after deployment]

## GitHub Repo
🔗 https://github.com/MANSIAG1/Mini-compliance-tracker

---

## Features

- View all clients with overdue badge count
- Per-client task management
- Add new compliance tasks with validation
- Update task status — Pending → In Progress → Completed
- Filter tasks by status and category
- Sort by due date, priority, or status
- Search tasks by title or description
- Overdue tasks auto-highlighted in red
- Progress bar per client
- Summary stats — Total / Pending / In Progress / Completed / Overdue
- Data persists via localStorage (survives page refresh)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Storage | localStorage |
| Hosting | Vercel (free tier) |
| Version Control | Git + GitHub |

---

## Project Structure
```
compliance-tracker/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ClientSidebar.jsx
│   │   ├── StatsRow.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskCard.jsx
│   │   ├── AddTaskModal.jsx
│   │   └── EmptyState.jsx
│   ├── data/
│   │   └── seedData.js
│   ├── utils/
│   │   └── helpers.js
│   ├── hooks/
│   │   └── useCompliance.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── README.md
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## Local Setup

### Prerequisites
- Node.js v18 or above
- npm v9 or above

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/MANSIAG1/Mini-compliance-tracker.git

# 2. Go into the folder
cd Mini-compliance-tracker

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Seed Data

The app comes pre-loaded with:
- **5 clients** — TCS, Nykaa, Groww, Reliance, Zepto
- **13 tasks** across categories like Tax, Filing, Payroll, Audit
- Mix of Pending, In Progress, Completed and Overdue tasks

Data is stored in **localStorage** so it persists across page refreshes.  
To reset to seed data — clear localStorage from browser DevTools.

---

## Tradeoffs

| Decision | Reason |
|---|---|
| localStorage over a real DB | Keeps it deployable as a zero-cost static site. No backend needed. Easy to swap for an API later. |
| No backend / no auth | Out of scope for this MVP. Production version would use Node/Express + JWT. |
| Fixed category enum | Simpler UX for now. Dynamic categories would need extra UI complexity. |
| Single user | No multi-tenancy needed for demo scope. |
| Vite over CRA | Faster builds, better DX, industry standard in 2025. |

---

## Assumptions

- One user manages all clients — no login required for demo
- **Overdue** = due_date is in the past AND status is not Completed
- All seed clients are India-based (easily extendable)
- Categories are a fixed set: Tax, Filing, Payroll, Corporate, Audit, Regulatory
- Priority levels: Low, Medium, High, Critical

---

## Future Improvements

- Backend API with Node.js + Express
- Database — PostgreSQL or MongoDB
- User authentication — JWT based
- Email reminders for upcoming deadlines
- Export tasks to PDF / Excel
- Multi-user with role-based access

---

## Author

Made by **Mansi Agarwal**  
[GitHub](https://github.com/MANSIAG1)