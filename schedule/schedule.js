/* ===== SCHEDULE PAGE: edit the DATA below to change classes, deadlines and school events ===== */
const TODAY = new Date();                    // the real date, so the schedule always opens on this week
const FIRST_HOUR = 7, LAST_HOUR = 20;        // the time grid runs 7 AM to 8 PM

const CLASSES = [   // d: 1 = Mon ... 6 = Sat; from/to are hours in 24h time (10.5 = 10:30); room = venue code
  { d: 2, code: "ITEN03C", name: "Fundamentals of Database Systems", from: 7, to: 9, room: "C608" },
  { d: 2, code: "LVTN01C", name: "Living in the IT Era", from: 10, to: 11.5, room: "C609" },
  { d: 2, code: "ELECL1C", name: "ICT Elective 1 (Data Communications)", from: 13, to: 16, room: "C204" },
  { d: 2, code: "OPMN03C", name: "Project Management", from: 16, to: 17.5, room: "C609" },
  { d: 4, code: "ITEN03C", name: "Fundamentals of Database Systems", from: 7, to: 10, room: "L203" },
  { d: 4, code: "LVTN01C", name: "Living in the IT Era", from: 10, to: 11.5, room: "C609" },
  { d: 4, code: "ELECL1C", name: "ICT Elective 1 (Data Communications)", from: 13, to: 15, room: "C607" },
  { d: 4, code: "OPMN03C", name: "Project Management", from: 16, to: 17.5, room: "C609" },
  { d: 5, code: "ITEN01C", name: "Introduction to Human Computer Interaction", from: 7, to: 10, room: "L202" },
  { d: 5, code: "ITEN01C", name: "Introduction to Human Computer Interaction", from: 10.5, to: 12.5, room: "C606" },
  { d: 5, code: "PSTN01C", name: "Probability and Statistics", from: 13, to: 14.5, room: "C613" },
  { d: 5, code: "ETHN01G", name: "Ethics", from: 14.5, to: 16, room: "C610" },
  { d: 5, code: "CSCN02C", name: "Object Oriented Programming", from: 16.5, to: 18.5, room: "C607" },
  { d: 6, code: "PATHFIT3", name: "Physical Activities Toward Health-Fit 3", from: 9, to: 11, room: "SRDB1" },
  { d: 6, code: "PSTN01C", name: "Probability and Statistics", from: 13, to: 14.5, room: "C613" },
  { d: 6, code: "ETHN01G", name: "Ethics", from: 14.5, to: 16, room: "C610" },
  { d: 6, code: "CSCN02C", name: "Object Oriented Programming", from: 16.5, to: 19.5, room: "C302" }
];
const DEADLINES = [ // date: "YYYY-MM-DD"
  { date: "2026-09-10", name: "HCI Design Prototype (Final)", from: 16, to: 17 },
  { date: "2026-09-12", name: "Python Project, Module 3",     from: 16, to: 17 }
];
const NO_CLASS = { "2026-09-10": "No classes" };   // class suspension days
const TASKS = [
  { name: "Activity 1: Web Development", sub: "ITEN01C", done: true },
  { name: "Design Prototype (Final)",    sub: "Due Sep 10", done: false },
  { name: "Python Project, Module 3",    sub: "Due Sep 12", done: false }
];
const OTHER = [
  { name: "Class suspension (university event)", sub: "Sep 10, 2026" },
  { name: "Deadline extension for HCI Activity", sub: "See Announcements" }
];

/* ===== helpers ===== */
if (typeof requireLogin === "function" && !requireLogin()) throw new Error("Not logged in");
const MON = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const key = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const monday = d => addDays(d, -((d.getDay() + 6) % 7));
const same = (a, b) => key(a) === key(b);
const hr = h => { const H = Math.floor(h), m = Math.round((h - H) * 60); return `${(H + 11) % 12 + 1}:${pad(m)} ${H < 12 ? "AM" : "PM"}`; };
const colorOf = code => (CLASSES.map(c => c.code).filter((c, i, a) => a.indexOf(c) === i).indexOf(code) % 2 ? "b" : "a");
function eventsOn(d) {
  const k = key(d);
  const cls = CLASSES.filter(c => c.d === d.getDay()).map(c => ({ ...c, kind: colorOf(c.code), title: c.name, sub: `${c.code} \u2022 ${c.room}` }));
  const due = DEADLINES.filter(x => x.date === k).map(x => ({ ...x, kind: "due", title: "Due: " + x.name, sub: "Deadline" }));
  return cls.concat(due).sort((a, b) => a.from - b.from);
}

const state = { view: "weekly", date: new Date(TODAY) };

/* ===== calendar board ===== */
function renderRange() {
  const d = state.date, m = monday(d);
  $("range").textContent =
    state.view === "daily" ? d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) :
    state.view === "monthly" ? `${MON[d.getMonth()]} ${d.getFullYear()}` :
    `${MON[m.getMonth()].slice(0, 3)} ${pad(m.getDate())} \u2013 ${MON[addDays(m, 5).getMonth()].slice(0, 3)} ${pad(addDays(m, 5).getDate())}, ${addDays(m, 5).getFullYear()}`;
}
function renderTimeGrid(days) {
  const rows = LAST_HOUR - FIRST_HOUR;
  const times = Array.from({ length: rows }, (_, i) => `<span>${hr(FIRST_HOUR + i).replace(":00", "")}</span>`).join("");
  const heads = days.map(d => `<div class="hd ${same(d, TODAY) ? "today" : ""}">${DOW[(d.getDay() + 6) % 7]}<b>${pad(d.getDate())}</b><i>${NO_CLASS[key(d)] || ""}</i></div>`).join("");
  const cols = days.map(d => `<div class="dcol ${same(d, TODAY) ? "today" : ""} ${NO_CLASS[key(d)] ? "off" : ""}">` +
    eventsOn(d).map(e => `<div class="ev ${e.kind}" style="top:${(e.from - FIRST_HOUR) * 60}px;height:${(e.to - e.from) * 60 - 4}px">
      <b>${e.title}</b><small>${hr(e.from)} \u2013 ${hr(e.to)}</small><small>${e.sub}</small></div>`).join("") + `</div>`).join("");
  $("grid").innerHTML = `<div class="tg" style="--cols:${days.length};--rows:${rows}">
    <div class="tg-head"><div class="hd"></div>${heads}</div><div class="tg-body"><div class="times">${times}</div>${cols}</div></div>`;
}
function renderMonth() {
  const d = state.date, first = new Date(d.getFullYear(), d.getMonth(), 1), start = monday(first);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const last = cells.slice(35).every(c => c.getMonth() !== d.getMonth()) ? 35 : 42;
  $("grid").innerHTML = `<div class="mg">${DOW.map(x => `<div class="hd">${x}</div>`).join("")}` + cells.slice(0, last).map(c => {
    const ev = eventsOn(c).slice(0, 3);
    return `<div class="c ${c.getMonth() !== d.getMonth() ? "out" : ""} ${same(c, TODAY) ? "today" : ""}"><span class="n">${c.getDate()}</span>` +
      (NO_CLASS[key(c)] ? `<span class="off-tag">${NO_CLASS[key(c)]}</span>` : ev.map(e => `<span class="chip ${e.kind}">${e.kind === "due" ? "Due" : e.code}</span>`).join("")) + `</div>`;
  }).join("") + `</div>`;
}
function renderBoard() {
  renderRange();
  if (state.view === "monthly") renderMonth();
  else renderTimeGrid(state.view === "daily" ? [state.date] : Array.from({ length: 6 }, (_, i) => addDays(monday(state.date), i)));
  document.querySelectorAll("#views button").forEach(b => b.classList.toggle("on", b.dataset.view === state.view));
}

/* ===== numbers, mini calendar, side lists ===== */
function renderStats() {
  const m = monday(state.date);
  const week = Array.from({ length: 6 }, (_, i) => addDays(m, i)).filter(d => !NO_CLASS[key(d)]);
  const list = week.flatMap(d => CLASSES.filter(c => c.d === d.getDay()));
  $("st-classes").textContent = list.length;
  $("st-hours").innerHTML = `${Math.round(list.reduce((s, c) => s + c.to - c.from, 0) * 10) / 10} <small>hrs</small>`;
}
function renderMini() {
  const d = state.date, first = new Date(d.getFullYear(), d.getMonth(), 1), start = monday(first), wk = monday(d);
  $("mini-title").textContent = `${MON[d.getMonth()]} ${d.getFullYear()}`;
  $("mini-grid").innerHTML = DOW.map(x => `<span class="dow">${x}</span>`).join("") + Array.from({ length: 42 }, (_, i) => {
    const c = addDays(start, i), inWeek = state.view !== "monthly" && c >= wk && c <= addDays(wk, 6);
    return `<button class="d ${c.getMonth() !== d.getMonth() ? "out" : ""} ${inWeek ? "wk" : ""} ${same(c, d) ? "sel" : ""} ${same(c, TODAY) ? "today" : ""}" data-date="${key(c)}">${c.getDate()}</button>`;
  }).join("");
}
function renderLists() {
  $("task-checks").innerHTML = TASKS.map((t, i) => `<li class="${t.done ? "done" : ""}" data-i="${i}" role="checkbox" aria-checked="${t.done}" tabindex="0">
    <span class="box">${t.done ? "\u2713" : ""}</span><span class="t">${t.name}<small>${t.sub}</small></span></li>`).join("");
  $("other-cal").innerHTML = OTHER.map(o => `<li><span class="dot"></span><span class="t">${o.name}<small>${o.sub}</small></span></li>`).join("");
}
function render() { renderBoard(); renderStats(); renderMini(); }

/* ===== events ===== */
function step(dir) {
  const d = state.date;
  state.date = state.view === "daily" ? addDays(d, dir) : state.view === "weekly" ? addDays(d, 7 * dir) : new Date(d.getFullYear(), d.getMonth() + dir, 1);
  render();
}
$("prev").onclick = () => step(-1);
$("next").onclick = () => step(1);
$("today-btn").onclick = () => { state.date = new Date(TODAY); render(); };
$("views").onclick = e => { const b = e.target.closest("button"); if (b) { state.view = b.dataset.view; render(); } };
$("mini-prev").onclick = () => { const d = state.date; state.date = new Date(d.getFullYear(), d.getMonth() - 1, 1); render(); };
$("mini-next").onclick = () => { const d = state.date; state.date = new Date(d.getFullYear(), d.getMonth() + 1, 1); render(); };
$("mini-grid").onclick = e => { const b = e.target.closest(".d"); if (b) { const [y, m, d] = b.dataset.date.split("-").map(Number); state.date = new Date(y, m - 1, d); render(); } };
function toggleTask(li) { if (!li) return; TASKS[li.dataset.i].done = !TASKS[li.dataset.i].done; renderLists(); }
$("task-checks").onclick = e => toggleTask(e.target.closest("li"));
$("task-checks").onkeydown = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleTask(e.target.closest("li")); } };
/* ===== SECTION: Sidebar – student name, section, log out and mobile menu (same as the other pages) ===== */
function renderUser() {
  const user = typeof requireLogin === "function" ? requireLogin() : null;
  if (!user) return;
  $("user-name").textContent = user.name;
  $("user-section").textContent = user.section;
  document.title = `Schedule | ${user.name} | LPU Cavite LMS`;
}
function setupLogout() {
  const link = $("logout-link");
  if (link) link.addEventListener("click", e => { e.preventDefault(); logout(); });
}
function setupMobileMenu() {
  const btn = $("menu-toggle"), sidebar = document.querySelector(".sidebar");
  btn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "\u2715 Close" : "\u2630 Menu";
  });
}
if (window.matchMedia("(max-width:560px)").matches) state.view = "daily";   // phones start on the day view
renderUser(); setupLogout(); setupMobileMenu();
renderLists(); render();