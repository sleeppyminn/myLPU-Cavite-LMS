/* oop-activity.js – loads AFTER courses.js, which already provides: courses[], and runs the sidebar setup
   (student name/section, log out, hamburger menu). This file only builds the activity / submission page. */

/* ===== SETTINGS ===== */
const SUBJECT_CODE = "CSCN02C";                       // the subject this activity belongs to (OOP)
const SUBJECT_BANNER = "../../images/oop-banner.png";    // same file as oop.js uses: images/oop-banner.png
const USE_REAL_CLOCK = false;                         // false = use NOW below (matches the homepage's "today"); true = use the visitor's real clock
const NOW = new Date(2026, 8, 7, 8, 0);               // Sept 7, 2026, 8:00 AM
const DUE = new Date(2026, 8, 12, 23, 59);            // Due date: Sept 12, 2026, 11:59 PM (same as the homepage task)
const MAX_FILES = 3;
const MAX_MB = 50;
const ALLOWED = ["py", "zip", "pdf", "docx", "txt", "ipynb", "png", "jpg"];
const STORAGE_KEY = "lms-submission:CSCN02C:python-project-module-3";   // oop.js reads this same key to show the green "Submitted" tag

/* ===== DATA: the activity text (edit this to change the instructions) ===== */
const activity = {
  module: "Module 3: Abstraction and Interfaces",
  title: "Python Project - Module 3",
  intro: [
    "As students continue to develop their programming skills, they are expected to create programs that are not only functional but also organized, reusable, and easier to maintain. In real-world software development, programmers often work with systems that contain different types of objects, each with their own attributes and behaviors. Object-Oriented Programming (OOP) provides a way to organize these systems by using classes and objects.",
    "For this activity, students are tasked to develop a Python-based project that demonstrates the concepts of Object-Oriented Programming. The project should represent a real-world situation or problem and use appropriate classes, objects, attributes, methods, and relationships between objects to create a functional program.",
    "Students are expected to apply the OOP concepts discussed in Module 3, such as classes and objects, constructors, encapsulation, inheritance, and polymorphism, where appropriate. The program should demonstrate how these concepts can work together to solve a specific problem or simulate a real-world system.",
    "The project should not only focus on producing the correct output but should also demonstrate proper program structure, logical organization, code reusability, and meaningful use of OOP concepts."
  ]
};

/* ===== Helpers ===== */
const subject = courses.find(c => c.code === SUBJECT_CODE);
const clock = () => (USE_REAL_CLOCK ? new Date() : NOW);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const fmtDate = d => new Date(d).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
function spanText(ms) {                                  // 273600000 -> "3 days 4 hours 0 mins"
  const m = Math.floor(Math.abs(ms) / 60000), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mi = m % 60;
  return [d ? plural(d, "day") : "", d || h ? plural(h, "hour") : "", plural(mi, "min")].filter(Boolean).join(" ");
}
const validLink = v => /^https?:\/\/\S+\.\S+/i.test(v.trim());

/* ===== Saved submission (kept in this browser only) ===== */
function loadSaved() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (e) { return null; } }
function writeSaved(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) { /* storage blocked: submission still shows until the page is closed */ } }

let saved = loadSaved();       // { files:[{name,size}], link, time } or null
let pending = [];              // files chosen but not yet submitted
let link = saved ? saved.link || "" : "";
let editing = false;
let message = { text: "", type: "" };

/* ===== SECTION: Breadcrumb, banner, title and the chips under it ===== */
function renderPage() {
  document.title = `${activity.title} | ${subject.code} | LPU Cavite LMS`;
  document.getElementById("crumb-subject").textContent = subject.code;
  document.getElementById("crumb-name").textContent = activity.title;
  document.getElementById("banner-code").textContent = subject.code;
  document.getElementById("banner-title").textContent = subject.title;
  const b = document.getElementById("banner");
  b.style.backgroundImage = `url("${SUBJECT_BANNER}")`;
  b.classList.add("has-photo");
  document.getElementById("act-module").textContent = activity.module;
  document.getElementById("act-title").textContent = activity.title;
  renderChips();
}
function renderChips() {
  const overdue = clock() > DUE;
  document.getElementById("meta-due").textContent = "Due: " + DUE.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • 11:59 PM";
  const st = document.getElementById("meta-state");
  st.textContent = saved ? "✔ Submitted" : overdue ? "Overdue" : "Not Submitted";
  st.className = "meta-chip " + (saved ? "ok" : "bad");
}

/* ===== SECTION: Instructions ===== */
function renderInstructions() {
  document.getElementById("act-body").innerHTML = activity.intro.map(p => `<p>${esc(p)}</p>`).join("");
}

/* ===== SECTION: Submission status table ===== */
function renderStatus() {
  const ms = DUE - clock();
  let remaining;
  if (saved) {
    const early = DUE - new Date(saved.time);
    remaining = `Assignment was submitted ${spanText(early)} ${early >= 0 ? "early" : "late"}`;
  } else if (ms < 0) {
    remaining = `<span class="late">Overdue by ${spanText(ms)}</span>`;
  } else {
    remaining = `<span class="${ms < 86400000 ? "late" : ""}">${spanText(ms)} remaining</span>`;
  }
  const rows = [
    ["Submission status", saved ? '<span class="chip ok">Submitted for grading</span>' : "No submissions have been made yet"],
    ["Grading status", "Not graded"],
    ["Due date", fmtDate(DUE)],
    ["Time remaining", remaining],
    ["Last modified", saved ? fmtDate(saved.time) : "-"]
  ];
  if (saved) {
    const items = saved.files.map(f => `<li><svg class="ic"><use href="#i-file"/></svg>${esc(f.name)} <small>${fmtSize(f.size)}</small></li>`);
    if (saved.link) items.push(`<li><svg class="ic"><use href="#i-file"/></svg><a href="${esc(saved.link)}" target="_blank" rel="noopener">${esc(saved.link)}</a></li>`);
    rows.push(["File submissions", `<ul class="sub-files">${items.join("")}</ul>`]);
  }
  document.getElementById("status-rows").innerHTML = rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join("");
}

/* ===== SECTION: Submission bin ===== */
function setMessage(text, type = "") {
  message = { text, type };
  const el = document.getElementById("bin-msg");
  if (el) { el.textContent = text; el.className = "bin-msg " + type; }
}
function renderFiles() {
  const list = document.getElementById("file-list");
  if (!list) return;
  list.innerHTML = pending.map((f, i) => `
    <li><svg class="ic"><use href="#i-file"/></svg><span class="fname">${esc(f.name)}</span><small>${fmtSize(f.size)}</small>
      <button type="button" class="rm" data-i="${i}" aria-label="Remove ${esc(f.name)}"><svg class="ic"><use href="#i-close"/></svg></button></li>`).join("");
}
function updateActions() {
  const btn = document.getElementById("submit-btn");
  if (!btn) return;
  btn.disabled = pending.length === 0;      // Submit unlocks once at least one file is added
}
function addFiles(list) {
  const errors = [];
  [...list].forEach(f => {
    const ext = f.name.split(".").pop().toLowerCase();
    if (!ALLOWED.includes(ext)) { errors.push(`"${f.name}" is not an accepted file type.`); return; }
    if (f.size > MAX_MB * 1048576) { errors.push(`"${f.name}" is larger than ${MAX_MB} MB.`); return; }
    if (pending.some(p => p.name === f.name && p.size === f.size)) return;
    if (pending.length >= MAX_FILES) { errors.push(`You can upload up to ${MAX_FILES} files.`); return; }
    pending.push(f);
  });
  setMessage(errors.join(" "), errors.length ? "err" : "");
  renderFiles();
  updateActions();
}
function submit() {
  const files = pending.length ? pending.map(f => ({ name: f.name, size: f.size })) : (saved ? saved.files : []);
  saved = { files, link: link.trim(), time: clock().toISOString() };
  writeSaved(saved);
  pending = [];
  editing = false;
  message = { text: "Your submission has been saved.", type: "ok" };
  renderChips();
  renderStatus();
  renderBin();
}
function renderBin() {
  const bin = document.getElementById("bin");
  const closed = clock() > DUE;

  /* Already submitted: show a summary (and an Edit button until the due date) */
  if (saved && !editing) {
    bin.innerHTML = `
      <div class="bin-done">
        <svg class="ic ok"><use href="#i-check"/></svg>
        <div><b>Your work has been submitted.</b>
          <small>${closed ? "The due date has passed, so this submission can no longer be changed." : "You can edit your submission until the due date."}</small>
          ${message.text ? `<p class="bin-msg ${message.type}" role="status">${esc(message.text)}</p>` : ""}</div>
        ${closed ? "" : '<button type="button" class="btn ghost" id="edit-btn">Edit submission</button>'}
      </div>`;
    const edit = document.getElementById("edit-btn");
    if (edit) edit.addEventListener("click", () => { editing = true; pending = []; message = { text: "", type: "" }; renderBin(); });
    return;
  }

  /* Past the due date and nothing submitted: the bin is closed */
  if (closed) {
    bin.innerHTML = `<div class="bin-closed"><b>Submissions are closed.</b><small>The due date for this activity has passed.</small></div>`;
    return;
  }

  /* Open bin */
  bin.innerHTML = `
    <div class="drop" id="drop" tabindex="0" role="button" aria-label="Choose files to upload">
      <svg class="ic up"><use href="#i-upload"/></svg>
      <p><b>Drag and drop</b> your files here, or <u>browse</u></p>
      <small>Up to ${MAX_FILES} files • ${MAX_MB} MB each • ${ALLOWED.map(e => e.toUpperCase()).join(", ")}</small>
      <input type="file" id="file-input" multiple hidden accept="${ALLOWED.map(e => "." + e).join(",")}">
    </div>
    <ul class="files" id="file-list"></ul>
    <p class="bin-msg ${message.type}" id="bin-msg" role="status" aria-live="polite">${esc(message.text)}</p>
    <div class="bin-actions">
      <button type="button" class="btn primary" id="submit-btn" disabled>Submit</button>
      <button type="button" class="btn ghost" id="clear-btn">${editing ? "Cancel" : "Clear"}</button>
    </div>`;

  const drop = document.getElementById("drop"), input = document.getElementById("file-input");
  drop.addEventListener("click", () => input.click());
  drop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
  ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
  drop.addEventListener("drop", e => addFiles(e.dataTransfer.files));
  input.addEventListener("change", () => { addFiles(input.files); input.value = ""; });
  document.getElementById("file-list").addEventListener("click", e => {
    const rm = e.target.closest(".rm");
    if (!rm) return;
    pending.splice(Number(rm.dataset.i), 1);
    setMessage("");
    renderFiles();
    updateActions();
  });
  document.getElementById("submit-btn").addEventListener("click", submit);
  document.getElementById("clear-btn").addEventListener("click", () => {
    pending = [];
    message = { text: "", type: "" };
    if (editing) { editing = false; link = saved ? saved.link || "" : ""; } else { link = ""; }
    renderBin();
  });
  renderFiles();
  updateActions();
}

/* ===== INIT ===== */
if (subject) {
  renderPage();
  renderInstructions();
  renderStatus();
  renderBin();
}
