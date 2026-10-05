/* =====================================================
   auth.js - login system with PROVIDED accounts (no sign up)
   Load this BEFORE login.js and homepage.js.

   Accounts are listed in ACCOUNTS below. Login email is the
   student number + @lpunetwork.edu.ph, for example
   2026-2-00001@lpunetwork.edu.ph  (typing only 2026-2-00001 also works).
   Everyone uses DEFAULT_PASSWORD unless the account has its own "password".

   NOTE: this runs in the browser, so anyone who opens the page source can
   see the list. Fine for a school project, not real security (that needs a server).
   ===================================================== */

/* Paths are built from this file's location (/auth/auth.js), so they work from every folder. */
const AUTH_ROOT = new URL("../", document.currentScript.src).href;
const AUTH = {
  SESSION_KEY: "lms_session",                    // who is logged in
  DOMAIN: "@lpunetwork.edu.ph",
  DEFAULT_PASSWORD: "Mibinminder",
  HOME: AUTH_ROOT + "homepage/homepage.html",    // page opened after login
  LOGIN: AUTH_ROOT + "login/login.html"          // page opened when logged out
};

/* ===== PROVIDED ACCOUNTS: add or edit students here =====
   id      = student number (the part before @lpunetwork.edu.ph)
   name    = name shown on the homepage ("Welcome back, ...!")
   section = shown under the name in the sidebar
   password (optional) = only if this student should NOT use the default one */
const ACCOUNTS = [
  { id: "2026-2-00001", name: "Jajangmyeon",    section: "IT202NS" },
  { id: "2026-2-00002", name: "Yaomingsu", section: "IT202NS" },
  { id: "2026-2-00003", name: "kebinkilino", section: "IT202NS" }
];

function accountEmail(a) { return a.id + AUTH.DOMAIN; }

function publicUser(a) {
  return { id: a.id, email: accountEmail(a), name: a.name, section: a.section };
}

/* ---------- log in ---------- */
function loginUser(email, password, remember) {
  let e = (email || "").trim().toLowerCase();
  if (e && !e.includes("@")) e += AUTH.DOMAIN;           // allow just the student number

  const acct = ACCOUNTS.find(a => accountEmail(a).toLowerCase() === e);
  const fail = { ok: false, error: "Incorrect email or password." };   // same message either way
  if (!acct) return fail;
  if ((password || "") !== (acct.password || AUTH.DEFAULT_PASSWORD)) return fail;

  localStorage.removeItem(AUTH.SESSION_KEY);
  sessionStorage.removeItem(AUTH.SESSION_KEY);
  (remember ? localStorage : sessionStorage).setItem(AUTH.SESSION_KEY, acct.id);
  return { ok: true, user: publicUser(acct) };
}

/* ---------- session ---------- */
function currentUser() {
  const id = sessionStorage.getItem(AUTH.SESSION_KEY) || localStorage.getItem(AUTH.SESSION_KEY);
  const acct = id && ACCOUNTS.find(a => a.id === id);
  return acct ? publicUser(acct) : null;
}
function logout() {
  localStorage.removeItem(AUTH.SESSION_KEY);
  sessionStorage.removeItem(AUTH.SESSION_KEY);
  location.replace(AUTH.LOGIN);
}

/* ---------- page guard ---------- */
// Put on pages that need a login (homepage). Sends visitors to login.html.
function requireLogin() {
  const u = currentUser();
  if (!u) location.replace(AUTH.LOGIN);
  return u;
}
