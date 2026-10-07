/* ===== DATA: tasks (same three tasks as the homepage; edit this to change the table) =====
   status:   "Completed" | "In Progress" | "Pending"   (shown as Done | In Progress | To Do)
             The student can change it by clicking the status pill. Changes are saved in this browser.
   priority: "High" (red) | "Medium" (yellow) | "Low" (green)
   icon:     "code" | "pen" | "cube"      color: "blue" | "purple" | "coral"
   href:     the activity page the row opens */
const tasks = [
  { code: "ITEN01C", subject: "Introduction to Human-Computer Interaction", name: "Activity 1: Web Development", due: "Sep 8, 2026", priority: "Medium", status: "Completed", icon: "code", color: "blue", href: "../../my-courses/subjects/submission%20bin/web-dev-activity.html" },
  { code: "ITEN01C", subject: "Introduction to Human-Computer Interaction", name: "Design Prototype (Final)", due: "Sep 10, 2026", priority: "High", status: "In Progress", icon: "pen", color: "purple", href: "../../my-courses/subjects/submission%20bin/hci-activity.html" },
  { code: "CSCN02C", subject: "Object-Oriented Programming", name: "Python Project – Module 3", due: "Sep 12, 2026", priority: "High", status: "Pending", icon: "cube", color: "coral", href: "../../my-courses/subjects/submission%20bin/oop-activity.html" }
];
const PERCENT = 40;   // ring number shown until the student changes a status (same as the homepage). Set to null to always calculate it (1 of 3 = 33%)
const STATUS_KEY = "lms-task-status";

const STATUS_ORDER = ["Completed", "In Progress", "Pending"];
const STATUS_LABEL = { "Completed": "Done", "In Progress": "In Progress", "Pending": "To Do" };
const STATUS_CLASS = { "Completed": "done", "In Progress": "inprogress", "Pending": "todo" };
let changed = false;   // true once a saved or new status change exists: the ring is then calculated from the tasks

/* Row icons (drawn with SVG) */
const icons = {
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M10 10l-3 2 3 2M14 10l3 2-3 2"/></svg>',
  pen:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>'
};
const checkCircle = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><polyline points="4.5,8.3 7,10.8 11.5,5.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

/* ===== Saved statuses (kept in this browser only) ===== */
function loadStatuses() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATUS_KEY) || "null");
    if (!saved) return;
    tasks.forEach(t => { if (STATUS_ORDER.includes(saved[t.name])) t.status = saved[t.name]; });
    changed = true;
  } catch (e) { /* storage blocked: keep the defaults */ }
}
function saveStatuses() {
  try { localStorage.setItem(STATUS_KEY, JSON.stringify(Object.fromEntries(tasks.map(t => [t.name, t.status])))); } catch (e) { /* storage blocked: change still shows until the page is closed */ }
}

/* ===== SECTION: Logged-in student – sidebar name and section (accounts live in ../../auth/auth.js) ===== */
function renderUser() {
  const user = requireLogin();            // not logged in? sends the visitor to login.html
  if (!user) return;
  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-section").textContent = user.section;
  document.title = `View Tasks | ${user.name} | LPU Cavite LMS`;
}

/* ===== SECTION: Log out button – clears the saved session first ===== */
function setupLogout() {
  const link = document.getElementById("logout-link");
  if (!link) return;
  link.addEventListener("click", e => { e.preventDefault(); logout(); });
}

/* ===== SECTION: Sidebar – mobile menu toggle (hamburger button) ===== */
function setupMobileMenu() {
  const btn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  btn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "✕ Close" : "☰ Menu";
  });
}

/* ===== SECTION: Task progress – ring and legend ===== */
function renderProgress() {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const total = tasks.length;
  const pending = total - completed;
  const pct = (!changed && PERCENT != null) ? PERCENT : Math.round((completed / total) * 100);
  const donut = document.getElementById("donut");
  donut.style.background = `conic-gradient(var(--ring) 0 ${pct}%, #dedade ${pct}% 100%)`;
  donut.setAttribute("aria-label", `${pct}% of tasks completed`);
  document.getElementById("donut-pct").textContent = pct + "%";
  document.getElementById("donut-legend").innerHTML = `
    <li><span class="dot" style="background:var(--ring)"></span>Completed<b>${completed}</b></li>
    <li><span class="dot" style="background:#dedade"></span>Pending<b>${pending}</b></li>
    <li class="total">Total<b>${total}</b></li>`;
}

/* ===== SECTION: Task table ===== */
function statusButton(t, i) {
  const inner = t.status === "Completed" ? `Done ${checkCircle}`
              : t.status === "In Progress" ? `${checkCircle} In Progress`
              : `To Do <span class="box"></span>`;
  return `<button type="button" class="st ${STATUS_CLASS[t.status]}" data-i="${i}" aria-haspopup="menu" aria-expanded="false" title="Change status">${inner}</button>`;
}
function renderTasks() {
  document.getElementById("task-rows").innerHTML = tasks.map((t, i) => `
    <div class="t-row">
      <span class="c-name"><a class="row-link" href="${esc(t.href)}"><b>${esc(t.name)}</b></a><small>${esc(t.code)} • ${esc(t.subject)}</small></span>
      <span class="c-due">${esc(t.due)}</span>
      <span class="c-pri"><span class="pri ${t.priority.toLowerCase()}">${t.priority}</span></span>
      <span class="c-st">${statusButton(t, i)}</span>
      <span class="c-go" aria-hidden="true"><svg class="ic"><use href="#i-chev"/></svg></span>
    </div>`).join("");
}

/* ===== SECTION: Status menu (click a status pill to pick Done, In Progress or To Do) ===== */
function closeMenu() {
  document.querySelectorAll(".st-menu").forEach(m => m.remove());
  document.querySelectorAll(".c-st.open").forEach(c => c.classList.remove("open"));
  document.querySelectorAll(".st[aria-expanded='true']").forEach(b => b.setAttribute("aria-expanded", "false"));
}
function openMenu(btn) {
  closeMenu();
  const cell = btn.parentElement, current = tasks[Number(btn.dataset.i)].status;
  const menu = document.createElement("ul");
  menu.className = "st-menu";
  menu.setAttribute("role", "menu");
  menu.innerHTML = STATUS_ORDER.map(s => `
    <li role="none"><button type="button" role="menuitemradio" aria-checked="${s === current}" data-status="${s}"><span class="mdot ${STATUS_CLASS[s]}"></span>${STATUS_LABEL[s]}</button></li>`).join("");
  cell.appendChild(menu);
  cell.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  if (menu.getBoundingClientRect().bottom > window.innerHeight) menu.classList.add("up");   // not enough room below: open upward
  menu.querySelector('[aria-checked="true"]').focus();
}
function setupStatusMenu() {
  const rows = document.getElementById("task-rows");
  document.addEventListener("click", e => {
    const pill = e.target.closest(".st");
    const choice = e.target.closest(".st-menu button");
    if (pill) {
      const wasOpen = pill.getAttribute("aria-expanded") === "true";
      if (wasOpen) closeMenu(); else openMenu(pill);
    } else if (choice) {
      const i = Number(choice.closest(".c-st").querySelector(".st").dataset.i);
      tasks[i].status = choice.dataset.status;
      changed = true;
      saveStatuses();
      renderTasks();
      renderProgress();
      rows.querySelector(`.st[data-i="${i}"]`).focus();
    } else {
      closeMenu();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const open = document.querySelector(".st[aria-expanded='true']");
    closeMenu();
    if (open) open.focus();
  });
}

/* ===== INIT ===== */
renderUser();
setupLogout();
setupMobileMenu();
loadStatuses();
renderProgress();
renderTasks();
setupStatusMenu();
