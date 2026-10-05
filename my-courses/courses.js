/* ===== DATA: course list (edit this to change the cards) ===== */
const courses = [
  { code: "ITEN01C", title: "Introduction to Human Computer Interaction", prof: "Ms. Anne Marielle Fortuno", students: 120, color: "#b8b3e8", icon: "pencil", avatar: "#c97b6b" },
  { code: "CSCN02C", title: "Object-Oriented Programming",  prof: "Mr. John Rommel Tinasas",  students: 98,  color: "#f7a99b", icon: "gears",  avatar: "#5d6b8a" },
  { code: "ELECL1C", title: "ICT Electives", prof: "Ms. Lizette Mendoza",  students: 130, color: "#f8dc94", icon: "books",  avatar: "#4a5568" },
  { code: "LVTN01C", title: "Living in the IT Era",  prof: "Mr. Jeric Bryan Lim", students: 112, color: "#a3d9b9", icon: "tools",  avatar: "#a0634d" },
  { code: "ITEN03C", title: "Fundamentals of Database",  prof: "Mr. Arcell Hadlocon",  students: 105, color: "#f7a99b", icon: "book",   avatar: "#3f4a63" }
];
// Each subject opens its own page. To link a subject to a different page, add  href: "your-page.html"  to its entry above.
function courseHref(c) { return c.href || "subject.html?code=" + encodeURIComponent(c.code || c.title); }
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.";

/* Simple course illustrations (drawn with SVG, shown inside each card's colored panel) */
const icons = {
  books: '<svg viewBox="0 0 100 100"><rect x="18" y="62" width="64" height="16" rx="4" fill="#f5c04b" stroke="#2a3b6e" stroke-width="3"/><rect x="24" y="44" width="58" height="16" rx="4" fill="#79cfa6" stroke="#2a3b6e" stroke-width="3"/><rect x="16" y="26" width="62" height="16" rx="4" fill="#f5c04b" stroke="#2a3b6e" stroke-width="3"/></svg>',
  book:  '<svg viewBox="0 0 100 100"><path d="M50 30C40 22 24 22 14 26v46c10-4 26-4 36 4 10-8 26-8 36-4V26C76 22 60 22 50 30z" fill="#f7f1ff" stroke="#2a3b6e" stroke-width="3"/><path d="M50 30v46" stroke="#2a3b6e" stroke-width="3"/><path d="M58 52l14-14 6 6-14 14-8 2z" fill="#f5c04b" stroke="#2a3b6e" stroke-width="3"/></svg>',
  gears: '<svg viewBox="0 0 100 100"><circle cx="38" cy="40" r="20" fill="#4f93e6" stroke="#2a3b6e" stroke-width="3" stroke-dasharray="6 4"/><circle cx="38" cy="40" r="8" fill="#f8dc94" stroke="#2a3b6e" stroke-width="3"/><circle cx="66" cy="66" r="16" fill="#4f93e6" stroke="#2a3b6e" stroke-width="3" stroke-dasharray="5 4"/><circle cx="66" cy="66" r="6" fill="#f8dc94" stroke="#2a3b6e" stroke-width="3"/></svg>',
  pencil:'<svg viewBox="0 0 100 100"><path d="M24 74l6-20 36-36 14 14-36 36z" fill="#f5c04b" stroke="#2a3b6e" stroke-width="3"/><path d="M24 74l6-20 14 14z" fill="#fff" stroke="#2a3b6e" stroke-width="3"/><circle cx="64" cy="58" r="14" fill="#4f93e6" stroke="#2a3b6e" stroke-width="3" opacity=".85"/></svg>',
  tools: '<svg viewBox="0 0 100 100"><rect x="22" y="26" width="24" height="46" rx="5" fill="#79cfa6" stroke="#2a3b6e" stroke-width="3"/><rect x="54" y="38" width="22" height="34" rx="5" fill="#f5c04b" stroke="#2a3b6e" stroke-width="3"/><circle cx="64" cy="26" r="7" fill="#fff" stroke="#2a3b6e" stroke-width="3"/></svg>'
};

/* ===== SECTION: Course cards (builds each card in the course grid) ===== */
function renderCourses(list = courses) {
  document.getElementById("course-grid").innerHTML = list.map(c => {
    const initials = c.prof.replace("Prof. ", "").split(" ").map(w => w[0]).join("").slice(0, 2);
    return `
    <a class="course" href="${courseHref(c)}">
      <div class="thumb" style="background:${c.color}">${icons[c.icon]}</div>
      ${c.code && c.title ? `<span class="code">${c.code}</span>` : ""}
      <h3>${c.title || c.code}</h3>
      <p>${lorem}</p>
      <div class="prof"><span class="pic" style="background:${c.avatar}">${initials}</span>${c.prof}</div>
      <div class="meta">${c.students} students</div>
    </a>`;
  }).join("");
  document.getElementById("empty").hidden = list.length > 0;
}

/* ===== SECTION: Search bar (filters the cards by title or professor) ===== */
function setupSearch() {
  const input = document.getElementById("search-input");
  const run = () => {
    const q = input.value.trim().toLowerCase();
    renderCourses(courses.filter(c => (c.code + " " + c.title + " " + c.prof).toLowerCase().includes(q)));
  };
  input.addEventListener("input", run);
  document.getElementById("search-btn").addEventListener("click", run);
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

/* ===== INIT ===== */
if (document.getElementById("course-grid")) {   // only on the My Courses page (subject.html reuses this file's data)
  renderCourses();
  setupSearch();
}
setupMobileMenu();
