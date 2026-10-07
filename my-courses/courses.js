/* ===== DATA: course list (edit this to change the cards) ===== */
const courses = [
  { code: "ITEN01C", desc: "Learn how people interact with technology and how to design interfaces that are easy and enjoyable to use. Build and test prototypes using user-centered design methods.", title: "Introduction to Human Computer Interaction", href: "subjects/hci.html", prof: "Ms. Anne Marie Reyes", students: 120, color: "#b8b3e8", icon: "pencil", avatar: "#c97b6b" },
  { code: "CSCN02C", desc: "Learn to write clean, reusable code using classes, objects, inheritance and polymorphism in Python. Apply these concepts to build real-world programs.", title: "Object-Oriented Programming", href: "subjects/oop.html", prof: "Mr. John Lloyd Santos",  students: 98,  color: "#f7a99b", icon: "gears",  avatar: "#5d6b8a" },
  { code: "ELECL1C", desc: "Explore specialized ICT topics such as cloud computing, IoT and artificial intelligence. Research an area of interest and build a small project around it.", title: "ICT Electives", href: "subjects/electives.html", prof: "Ms. Maine Mendoza",  students: 130, color: "#f8dc94", icon: "books",  avatar: "#4a5568" },
  { code: "LVTN01C", desc: "Understand how information technology shapes communication, work and everyday life. Learn to use technology responsibly and think critically about its impact on society.", title: "Living in the IT Era", href: "subjects/it-era.html", prof: "Mr. Bryan Acosta", students: 112, color: "#a3d9b9", icon: "tools",  avatar: "#a0634d" },
  { code: "ITEN03C", desc: "Learn how data is organized, stored and retrieved using the relational model and SQL. Design and build a small database for a real-world scenario.", title: "Fundamentals of Database", href: "subjects/database.html", prof: "Mr. Mark Sumbad",  students: 105, color: "#f7a99b", icon: "book",   avatar: "#3f4a63" }
];
// Each subject opens its own page. Add  href: "subjects/your-page.html"  to a subject above to link it. Subjects without an href do nothing when clicked yet.
function courseHref(c) { return c.href || "#"; }
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
      <p>${c.desc || lorem}</p>
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

/* ===== SECTION: Logged-in student – sidebar name and section (accounts live in ../auth/auth.js) ===== */
function renderUser() {
  if (typeof requireLogin !== "function") return;   // auth.js not loaded on this page
  const user = requireLogin();                      // not logged in? sends the visitor to login.html
  if (!user) return;
  const name = document.getElementById("user-name");
  const section = document.getElementById("user-section");
  if (name) name.textContent = user.name;
  if (section) section.textContent = user.section;
}

/* ===== SECTION: Log out button – clears the saved session first ===== */
function setupLogout() {
  const link = document.getElementById("logout-link");
  if (!link || typeof logout !== "function") return;
  link.addEventListener("click", e => { e.preventDefault(); logout(); });
}

/* ===== INIT ===== */
renderUser();
setupLogout();
if (document.getElementById("course-grid")) {   // only on the My Courses page (subject.html reuses this file's data)
  renderCourses();
  setupSearch();
}
setupMobileMenu();