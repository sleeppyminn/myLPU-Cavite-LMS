/* ===== SETTINGS: welcome banner picture =====
   Put an image path or URL here (e.g. "images/campus.jpg") to set the default banner background. */
const welcomeBackground = "";

/* Optional faint building picture at the bottom of the sidebar (e.g. "images/building.png") */
const sidebarBackground = "images/sidebar-building.png";

/* ===== DATA ===== */
const today = new Date(2026, 8, 7); // Sept 7, 2026

const tasks = [
  { code: "ITEN01C", name: "Activity 1: Web Development", due: "Sep 8, 2026 (Tue)", status: "Completed" },
  { code: "HCI", name: "Design Prototype (Final)", due: "Sep 10, 2026 (Thu)", status: "In Progress" },
  { code: "DCSN03C", name: "Python Project – Module 3", due: "Sep 12, 2026 (Sat)", status: "Pending" },
];
const schedule = [{ month: "SEP", day: 8, title: "ITEN01C - Web Development", time: "8:00 AM - 11:00 AM | Room 302" }];
const announcements = [
  { title: "Class Suspension on Sept. 10, 2026", text: "Due to the university event, all classes will be...", date: "Sep 6, 2026" },
  { title: "Deadline Extension for HCI Activity", text: "", date: "" }
];
const general = { completed: 6, pending: 4 };
const academic = [
  { label: "Attendance", value: "92%", pct: 92 },
  { label: "GPA", value: "1.75", pct: 55 },
  { label: "Tasks Completed", value: "6/10", pct: 60 }
];

/* ===== SECTION: Welcome banner – today's date ===== */
function renderWelcomeDate() {
  document.getElementById("today-date").textContent =
    today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  document.getElementById("today-day").textContent =
    today.toLocaleDateString("en-US", { weekday: "long" });
}

/* ===== SECTION: Current Tasks list ===== */
function renderCurrentTasks() {
  const cls = { "Completed": "completed", "In Progress": "in-progress", "Pending": "pending" };
  const mark = { "Completed": ["done", '<svg viewBox="0 0 12 12" width="11" height="11"><polyline points="2.2,6.3 4.9,9 9.8,3.2" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>'], "In Progress": ["progress", "◔"], "Pending": ["", ""] };
  const stIcon = { "Completed": "✔", "In Progress": "◔", "Pending": "⊖" };
  document.getElementById("task-list").innerHTML = tasks.map(t => `
    <div class="task">
      <div class="check ${mark[t.status][0]}">${mark[t.status][1]}</div>
      <div class="task-info"><span class="tag">${t.code}</span><b>${t.name}</b>
        <small>${t.code} • Due: ${t.due}</small></div>
      <span class="status ${cls[t.status]}">${stIcon[t.status]} ${t.status}</span><span>›</span>
    </div>`).join("");
}

/* ===== SECTION: Upcoming Schedule ===== */
function renderUpcomingSchedule() {
  document.getElementById("schedule-list").innerHTML = schedule.map(s => `
    <div class="sched"><div class="day"><small>${s.month}</small>${s.day}</div>
      <div><b>${s.title}</b><small>${s.time}</small></div><span>›</span></div>`).join("");
}

/* ===== SECTION: Recent Announcements ===== */
function renderRecentAnnouncements() {
  document.getElementById("announcement-list").innerHTML = announcements.map(a => `
    <div class="ann"><div><b>${a.title}</b><small>${a.text}</small></div><small>${a.date}</small></div>`).join("");
}

/* ===== SECTION: General Tasks – donut chart and legend ===== */
function renderGeneralTasks() {
  const total = general.completed + general.pending;
  const pct = Math.round((general.completed / total) * 100);
  document.getElementById("donut").style.background =
    `conic-gradient(var(--red) 0 ${pct}%, #d9d0d2 ${pct}% 100%)`;
  document.getElementById("donut-pct").textContent = pct + "%";
  document.getElementById("donut-legend").innerHTML = `
    <li><span class="dot" style="background:var(--red)"></span>Completed<b>${general.completed}</b></li>
    <li><span class="dot" style="background:#d9d0d2"></span>Pending<b>${general.pending}</b></li>
    <li class="total">Total<b>${total}</b></li>`;
}

/* ===== SECTION: Academic Progress bars ===== */
function renderAcademicProgress() {
  document.getElementById("progress-bars").innerHTML = academic.map(p => `
    <div class="pbar"><div class="top"><span>${p.label}</span><b>${p.value}</b></div>
      <div class="track"><div class="fill" style="width:${p.pct}%"></div></div></div>`).join("");
}

/* ===== SECTION: Welcome banner – background picture (set via welcomeBackground above) ===== */
function setWelcomeImage(url) {
  document.querySelector(".welcome").style.setProperty("--welcome-img", url ? `url("${url}")` : "none");
}
function setupWelcomeBackground() {
  if (welcomeBackground) setWelcomeImage(welcomeBackground);
}

/* ===== SECTION: Sidebar – mobile menu toggle (hamburger button) ===== */
function setupMobileMenu() {
  if (sidebarBackground) document.querySelector(".sidebar").style.setProperty("--sidebar-img", `url("${sidebarBackground}")`);
  const btn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  btn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "✕ Close" : "☰ Menu";
  });
}

/* ===== INIT ===== */
setupMobileMenu();
setupWelcomeBackground();
renderWelcomeDate();
renderCurrentTasks();
renderUpcomingSchedule();
renderRecentAnnouncements();
renderGeneralTasks();
renderAcademicProgress();
