const today = new Date();
const d = (days) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().split("T")[0];
};

export const CLIENTS = [
  { id: "c1", company_name: "Tata Consultancy Services", country: "India", entity_type: "Public Ltd" },
  { id: "c2", company_name: "Nykaa Fashion Pvt Ltd",     country: "India", entity_type: "Private Ltd" },
  { id: "c3", company_name: "Groww Investments",          country: "India", entity_type: "Startup" },
  { id: "c4", company_name: "Reliance Retail Ltd",        country: "India", entity_type: "Public Ltd" },
  { id: "c5", company_name: "Zepto Inc.",                 country: "India", entity_type: "Startup" },
];

export const TASKS = [
  { id: "t1",  client_id: "c1", title: "GST Filing Q4",           description: "File quarterly GST returns for Q4 FY2025",       category: "Tax",        due_date: d(-5), status: "Pending",     priority: "High" },
  { id: "t2",  client_id: "c1", title: "TDS Return March",         description: "Submit TDS deduction returns for March",         category: "Tax",        due_date: d(3),  status: "Completed",   priority: "Medium" },
  { id: "t3",  client_id: "c1", title: "Annual ROC Filing",        description: "File ROC annual compliance report with MCA",     category: "Filing",     due_date: d(-2), status: "Pending",     priority: "Critical" },
  { id: "t4",  client_id: "c1", title: "ESIC Monthly Return",      description: "Submit employee state insurance contribution",   category: "Payroll",    due_date: d(7),  status: "In Progress", priority: "Medium" },
  { id: "t5",  client_id: "c2", title: "GST Reconciliation",       description: "Reconcile GSTR-2A with purchase register",      category: "Tax",        due_date: d(-1), status: "Pending",     priority: "High" },
  { id: "t6",  client_id: "c2", title: "PF Challan April",         description: "Deposit provident fund contribution for April",  category: "Payroll",    due_date: d(2),  status: "Pending",     priority: "High" },
  { id: "t7",  client_id: "c2", title: "Board Meeting Minutes",    description: "Prepare and file board meeting minutes",        category: "Corporate",  due_date: d(10), status: "In Progress", priority: "Low" },
  { id: "t8",  client_id: "c3", title: "Startup India Renewal",    description: "Renew Startup India recognition certificate",   category: "Filing",     due_date: d(-8), status: "Pending",     priority: "Critical" },
  { id: "t9",  client_id: "c3", title: "Income Tax Advance Q1",    description: "Pay Q1 advance income tax installment",         category: "Tax",        due_date: d(5),  status: "Pending",     priority: "High" },
  { id: "t10", client_id: "c4", title: "Quarterly Audit Report",   description: "Submit internal audit findings to board",       category: "Audit",      due_date: d(15), status: "In Progress", priority: "High" },
  { id: "t11", client_id: "c4", title: "SEBI Compliance Filing",   description: "File periodic SEBI compliance certificate",     category: "Regulatory", due_date: d(-3), status: "Pending",     priority: "Critical" },
  { id: "t12", client_id: "c5", title: "DPIIT Registration",       description: "Complete DPIIT startup registration",           category: "Filing",     due_date: d(1),  status: "Completed",   priority: "High" },
  { id: "t13", client_id: "c5", title: "GST Registration Renewal", description: "Renew GST registration for new financial year", category: "Tax",        due_date: d(-4), status: "Pending",     priority: "High" },
];

export const CATEGORIES = ["All", "Tax", "Filing", "Payroll", "Corporate", "Audit", "Regulatory"];
export const STATUSES   = ["All", "Pending", "In Progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High", "Critical"];