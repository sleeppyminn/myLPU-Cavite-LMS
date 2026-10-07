/* web-dev-activity.js – loads AFTER courses.js, which already provides: courses[], and runs the sidebar setup
   (student name/section, log out, hamburger menu). This file builds the SUBMITTED version of the activity page:
   no upload area and no Submit button, only the status and the submitted work. */

/* ===== SETTINGS ===== */
const SUBJECT_CODE = "ITEN01C";                       // the subject this activity belongs to (HCI)
const SUBJECT_BANNER = "../../images/hci-banner.png"; // same banner picture as hci.js
const DUE = new Date(2026, 8, 8, 23, 59);             // Due date: Sept 8, 2026, 11:59 PM (same as the homepage task)

/* ===== DATA: the student's submission (edit this to change what is shown) ===== */
const submission = {
  time: new Date(2026, 8, 6, 14, 15).toISOString(),   // Sept 6, 2026, 2:15 PM
  files: [{ name: "web-development-activity.zip", size: 2457600 }],
  link: ""                                            // optional link, e.g. "https://..."
};

/* ===== DATA: the activity text (edit this to change the instructions) ===== */
const activity = {
  module: "Module 1: Foundations of HCI",
  title: "Activity 1: Web Development",
  intro: [
    "In today's digital environment, websites are commonly used to provide information, promote businesses, showcase services, and communicate with users. However, creating an effective website requires more than simply placing text and images on a webpage. A website should have a clear purpose, organized content, appropriate visual design, and easy navigation.",
    "As a Web Development student, you are tasked to design and develop a website for a specific purpose and target audience. You will plan the website's content and structure before implementing your design using HTML and CSS.",
    "Your website should demonstrate how web development concepts can be used to create a functional and visually appealing webpage while considering the needs of its intended users."
  ]
};

/* ===== Helpers ===== */
const subject = courses.find(c => c.code === SUBJECT_CODE);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const fmtDate = d => new Date(d).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
function spanText(ms) {                                  // 273600000 -> "3 days 4 hours 0 mins"
  const m = Math.floor(Math.abs(ms) / 60000), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mi = m % 60;
  return [d ? plural(d, "day") : "", d || h ? plural(h, "hour") : "", plural(mi, "min")].filter(Boolean).join(" ");
}

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
  document.getElementById("meta-due").textContent = "Due: " + DUE.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • 11:59 PM";
  const st = document.getElementById("meta-state");
  st.textContent = "✔ Submitted";
  st.className = "meta-chip ok";
}

/* ===== SECTION: Instructions ===== */
function renderInstructions() {
  document.getElementById("act-body").innerHTML = activity.intro.map(p => `<p>${esc(p)}</p>`).join("");
}

/* ===== SECTION: Submission status table ===== */
function renderStatus() {
  const early = DUE - new Date(submission.time);
  const items = submission.files.map(f => `<li><svg class="ic"><use href="#i-file"/></svg>${esc(f.name)} <small>${fmtSize(f.size)}</small></li>`);
  if (submission.link) items.push(`<li><svg class="ic"><use href="#i-file"/></svg><a href="${esc(submission.link)}" target="_blank" rel="noopener">${esc(submission.link)}</a></li>`);
  const rows = [
    ["Submission status", '<span class="chip ok">Submitted for grading</span>'],
    ["Grading status", "Not graded"],
    ["Due date", fmtDate(DUE)],
    ["Time remaining", `Assignment was submitted ${spanText(early)} ${early >= 0 ? "early" : "late"}`],
    ["Last modified", fmtDate(submission.time)],
    ["File submissions", `<ul class="sub-files">${items.join("")}</ul>`]
  ];
  document.getElementById("status-rows").innerHTML = rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join("");
}

/* ===== SECTION: Submission bin (submitted: nothing to upload, no Submit button) ===== */
function renderBin() {
  document.getElementById("bin").innerHTML = `
    <div class="bin-done">
      <svg class="ic ok"><use href="#i-check"/></svg>
      <div><b>Your work has been submitted.</b>
        <small>Submitted on ${fmtDate(submission.time)}. Your instructor will grade it soon.</small></div>
    </div>`;
}

/* ===== INIT ===== */
if (subject) {
  renderPage();
  renderInstructions();
  renderStatus();
  renderBin();
}
