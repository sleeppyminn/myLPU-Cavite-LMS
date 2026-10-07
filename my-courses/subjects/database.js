/* database.js – loads AFTER courses.js, which already provides: courses[], and runs the sidebar setup
   (student name/section, log out, hamburger menu). This file only builds the subject page. */

/* ===== Grading System card (rows: [label, value, optional "head" or "total"]) ===== */
const grading = {
  title: "Grading System", icon: "i-tasks",
  rows: [["Prelim/Midterm/Final Term", "", "head"], ["Creative Academic Performance", "60%"], ["Prelim/Midterm/Final Exam", "40%"], ["Total", "100%", "total"]],
  note: "<b>FINAL GRADE</b> = Prelim-Term Grade x 33.33 + Midterm Grade x 33.33 + Final Grade x 33.34"
};

/* ===== DATA: extra details per subject (edit / add entries here, key = subject code) =====
   banner: optional picture, e.g. "../images/hci-banner.jpg"   photo: optional teacher picture, e.g. "../images/maria-hilsi.jpg" */
const details = {
  ITEN03C: {
    short: "ITEN03C",
    banner: "../images/database-banner.png",
    about: [
      "This course introduces students to the fundamental concepts of database systems and how data is organized, stored, retrieved and protected. Topics include the relational model, entity-relationship design, normalization, and Structured Query Language (SQL) for creating, querying and updating databases. Laboratory activities give students hands-on experience designing and building a small database for a real-world scenario."
    ],
    objectives: [
      "Explain the core concepts and components of a database system.",
      "Design databases using entity-relationship diagrams and normalization.",
      "Write SQL statements to create, query and manage data.",
      "Apply basic data security, integrity and backup practices."
    ],
    facts: [["Units", "3"], ["Term", "1st Semester, 2026–2027"], ["Schedule", "Mon • 1:00 PM – 4:00 PM"], ["Room", "Computer Lab 1"]],
    extra: {
      description: [
        { title: "Course Details", icon: "i-book" },   // rows come from facts above
        grading
      ]
    },
    modules: [
      { title: "Module 1: Introduction to Databases", desc: "What a database is, why it is used, and the parts of a database system.", topics: ["Data, information and databases", "Database management systems (DBMS)", "Database users and applications"] },
      { title: "Module 2: Data Modeling and Design", desc: "Plan a database with the relational model and entity-relationship diagrams.", topics: ["The relational model", "Entity-relationship diagrams", "Keys and relationships"] },
      { title: "Module 3: Normalization and SQL", desc: "Clean up table design and use SQL to work with data.", topics: ["Normalization (1NF to 3NF)", "SQL basics: SELECT, INSERT, UPDATE, DELETE", "Joins and aggregate functions"] },
      { title: "Module 4: Database Administration", desc: "Keep data safe, accurate and available.", topics: ["Data integrity and security", "Backup and recovery", "Introduction to NoSQL and modern databases"] }
    ],
    teacher: {
      name: "Mark Sumbad", role: "Faculty • Database Instructor", photo: "", students: "105 Students", courseCount: "2 Courses",
      bio: [
        "With a background in Information Technology and database systems, Prof. Sumbad is passionate about helping students understand how data powers the applications they use every day. He combines academic expertise with practical experience in designing and managing databases.",
        "He believes that well-organized data is the foundation of every good system, and is committed to guiding students in developing their analytical thinking, query-writing skills, and confidence in working with data."
      ],
      taught: [
        { title: "Fundamentals of Database", meta: "BSIT • 1st Semester, 2026–2027" },
        { title: "Information Management", meta: "BSIT • 2nd Semester, 2026–2027" }
      ],
      quote: "Good data is organized data. Build your foundation well and everything else becomes easier.",
      quoteBy: "— Prof. Mark Sumbad"
    }
  }
};

/* Fallback content for subjects that have no entry in details above */
function defaultDetails(c) {
  return {
    short: c.code,
    banner: "",
    about: [`${c.title} is part of your BSIT curriculum. Your instructor will post the full course outline, readings and activities here.`],
    objectives: ["Understand the key concepts of the subject.", "Apply the concepts in hands-on activities.", "Complete the required projects and assessments."],
    facts: [["Units", "3"], ["Term", "1st Semester, 2026–2027"], ["Students", String(c.students)]],
    extra: {
      description: [
        { title: "Course Details", icon: "i-book" },
        grading
      ]
    },
    modules: [
      { title: "Module 1: Introduction", topics: ["Course overview", "Key terms and concepts"] },
      { title: "Module 2: Core Topics", topics: ["Lessons and discussions", "Hands-on activity"] },
      { title: "Module 3: Application", topics: ["Project work", "Final assessment"] }
    ],
    teacher: {
      name: c.prof.replace(/^(Ms\.|Mr\.|Prof\.|Dr\.)\s*/, ""), role: "Faculty • " + c.title + " Instructor", photo: "",
      students: c.students + " Students", courseCount: "1 Course",
      bio: [`${c.prof} teaches ${c.title}. Teacher information will be updated by the department.`],
      taught: [{ title: c.title, meta: "BSIT • 1st Semester, 2026–2027" }],
      quote: "Learning is a journey we take together.",
      quoteBy: "— " + c.prof
    }
  };
}

/* ===== SECTION: Find the subject from the link (subject.html?code=ITEN01C) ===== */
const PAGE_CODE = "ITEN03C";   // this page is the Fundamentals of Database page; ?code=... can still show another subject
const params = new URLSearchParams(location.search);
const subject = courses.find(c => (c.code || c.title) === (params.get("code") || PAGE_CODE));
if (!subject) { location.replace("../courses.html"); }   // unknown code: back to My Courses
const info = subject ? { ...defaultDetails(subject), ...(details[subject.code] || {}) } : null;

/* ===== SECTION: Breadcrumb, banner and page title ===== */
function renderSubject() {
  document.title = `${info.short} | My Courses | LPU Cavite LMS`;
  document.getElementById("crumb-name").textContent = info.short;
  document.getElementById("banner-code").textContent = subject.code;
  document.getElementById("banner-title").textContent = subject.title;
  if (info.banner) {
    const b = document.getElementById("banner");
    b.style.backgroundImage = `url("${info.banner}")`;
    b.classList.add("has-photo");     // photo is already darkened, so skip the extra dark fade
  }
}

/* ===== SECTION: Description tab ===== */
function renderDescription() {
  document.getElementById("panel-description").innerHTML = `
    <h2>About this Course</h2>
    ${info.about.map(p => `<p>${p}</p>`).join("")}
    <h3>What you will learn</h3>
    <ul>${info.objectives.map(o => `<li>${o}</li>`).join("")}</ul>`;
}

/* A topic is plain text (a lesson) or { activity: true, title, href, submitted } (a clickable activity; submitted: true shows the green "Submitted" tag, submitted: false shows "Not Submitted") */
function topicHtml(t) {
  return typeof t === "string" ? `<li>${t}</li>` : `<li><a href="${t.href || "#"}"><span><b>[ACTIVITY]</b> ${t.title}</span>${t.submitted === true ? '<span class="submitted">✔ Submitted</span>' : t.submitted === false ? '<span class="submitted not">Not Submitted</span>' : ""}</a></li>`;
}
function countText(topics) {
  const acts = topics.filter(t => typeof t !== "string").length, lessons = topics.length - acts;
  return `${lessons} lesson${lessons === 1 ? "" : "s"}` + (acts ? ` • ${acts} activit${acts === 1 ? "y" : "ies"}` : "");
}

/* ===== SECTION: Bottom cards for the Description tab ===== */
function renderExtras() {
  ["description"].forEach(name => {
    document.getElementById("extra-" + name).innerHTML = info.extra[name].map(c => `
      <section class="card">
        <div class="card-head"><span class="badge-ic"><svg class="ic"><use href="#${c.icon}"/></svg></span><h2>${c.title}</h2></div>
        ${(c.rows || info.facts).map(r => `<div class="info-row ${r[2] || ""}"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}
        ${c.note ? `<p class="grade-note">${c.note}</p>` : ""}
      </section>`).join("");
  });
}

/* ===== SECTION: Course Content tab (click a module to open it) ===== */
function renderContent() {
  const panel = document.getElementById("panel-content");
  panel.innerHTML = `<h2>Course Content</h2>` + info.modules.map(m => `
    <div class="module">
      <button type="button" aria-expanded="false">
        <svg class="ic arr"><use href="#i-chev"/></svg><span class="m-text"><span class="m-title">${m.title}</span><span class="m-desc">${m.desc || m.topics.filter(t => typeof t === "string").join(", ")}</span></span><small>${countText(m.topics)}</small>
      </button>
      <div class="m-body"><ul>${m.topics.map(topicHtml).join("")}</ul></div>
    </div>`).join("");
  panel.querySelectorAll(".module button").forEach(b => b.addEventListener("click", () => {
    const open = b.parentElement.classList.toggle("open");
    b.setAttribute("aria-expanded", open);
  }));
}

/* ===== SECTION: Teacher tab (matches the design) ===== */
function renderTeacher() {
  const t = info.teacher;
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  document.getElementById("panel-teacher").innerHTML = `
    <h2>Teacher Information</h2>
    <div class="teacher">
      <div class="t-left">
        <div class="photo">${t.photo ? `<img src="${t.photo}" alt="${t.name}">` : initials}</div>
        <div class="t-stats">
          <div><svg class="ic"><use href="#i-person"/></svg>${t.students}</div>
          <div><svg class="ic"><use href="#i-grad"/></svg>${t.courseCount}</div>
        </div>
      </div>
      <div class="t-right">
        <h3 class="name">${t.name}</h3>
        <div class="t-role">${t.role}</div>
        ${t.bio.map(p => `<p>${p}</p>`).join("")}
      </div>
    </div>`;
  document.getElementById("taught-list").innerHTML = t.taught.map(c => `
    <div class="taught"><div><b>${c.title}</b><small>${c.meta}</small></div></div>`).join("");
  document.getElementById("teacher-quote").textContent = `“${t.quote}”`;
  document.getElementById("teacher-quote-by").textContent = t.quoteBy;
}

/* ===== SECTION: Tabs – shows the clicked panel and underlines its tab ===== */
function showTab(name) {
  document.querySelectorAll(".tab[data-tab]").forEach(tab => {
    const on = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", on);
    tab.tabIndex = on ? 0 : -1;
    document.getElementById("panel-" + tab.dataset.tab).hidden = !on;
  });
  document.querySelectorAll(".teacher-extra").forEach(e => e.hidden = e.id !== "extra-" + name);   // each tab has its own bottom row
}
/* Slides the red underline under the selected tab */
function moveLine(animate = true) {
  const line = document.getElementById("tab-line");
  const tab = document.querySelector('.tab[aria-selected="true"]');
  if (!line || !tab) return;
  line.classList.toggle("no-anim", !animate);
  line.style.width = tab.offsetWidth + "px";
  line.style.top = (tab.offsetTop + tab.offsetHeight - 2) + "px";
  line.style.transform = `translateX(${tab.offsetLeft}px)`;
}
function setupTabs() {
  const tabs = [...document.querySelectorAll(".tab[data-tab]")];
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => { showTab(tab.dataset.tab); moveLine(); history.replaceState(null, "", "#" + tab.dataset.tab); });
    tab.addEventListener("keydown", e => {            // arrow keys move between tabs
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.click(); next.focus();
    });
  });
  const wanted = location.hash.slice(1);
  showTab(tabs.some(t => t.dataset.tab === wanted) ? wanted : "description");
  moveLine(false);                                         // first position: no sliding
  window.addEventListener("resize", () => moveLine(false));
  if (document.fonts) document.fonts.ready.then(() => moveLine(false));   // re-measure once Poppins has loaded
}

/* ===== INIT ===== */
if (subject) {
  renderSubject();
  renderDescription();
  renderContent();
  renderExtras();
  renderTeacher();
  setupTabs();
}
