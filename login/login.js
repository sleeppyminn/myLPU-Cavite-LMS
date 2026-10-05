/* =====================================================
   login.js - the login / sign up screen
   Needs auth.js loaded first.
   ===================================================== */

/* ===== SETTINGS ===== */
const SPLASH_ONCE = true;     // true = opening animation plays once per browser session; false = every page load
const SPLASH_MS = 3000;       // how long the opening animation stays
const LOGIN_ANIM_MS = 2400;   // how long the after-login animation plays before opening the homepage

const $ = id => document.getElementById(id);

/* ===== SECTION: Already logged in? skip straight to the homepage ===== */
if (currentUser()) location.replace(AUTH.HOME);

/* ===== SECTION: Mute / unmute button for the background video =====
   Browsers only allow autoplay when muted, so the page starts muted and the
   button (a click) is what lets the sound turn on. */
function setupSoundButton(v) {
  const btn = $("sound-btn");
  if (!btn) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { btn.hidden = true; return; }  // video is not playing
  v.volume = 0.7;
  const update = () => {
    const on = !v.muted;
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on);
    btn.setAttribute("aria-label", on ? "Mute background sound" : "Unmute background sound");
    btn.querySelector(".sound-label").textContent = on ? "Sound on" : "Sound off";
  };
  btn.addEventListener("click", () => {
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    update();
  });
  update();
}

/* ===== SECTION: Background video ===== */
function setupBackgroundVideo() {
  const v = $("bg-video");
  if (!v) return;
  v.muted = true;                                           // required for autoplay
  setupSoundButton(v);
  v.addEventListener("playing", () => v.classList.add("playing"));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;   // keep the still poster instead
  const tryPlay = () => v.play().catch(() => {});          // some browsers block it until the first tap
  tryPlay();
  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });
}

/* ===== SECTION: Opening animation ===== */
function runSplash() {
  const splash = $("splash");
  if (SPLASH_ONCE && sessionStorage.getItem("lms_splash_seen")) {
    splash.remove();
    document.body.classList.add("ready");
    return;
  }
  sessionStorage.setItem("lms_splash_seen", "1");
  setTimeout(() => {
    splash.classList.add("hide");              // curtain slides up
    document.body.classList.add("ready");      // card rises in
    setTimeout(() => splash.remove(), 900);
  }, SPLASH_MS);
}

/* ===== SECTION: Error message + Show/Hide password ===== */
function showError(id, msg) {
  const el = $(id);
  el.textContent = msg;
  el.hidden = false;
  el.classList.remove("shake");
  void el.offsetWidth;                         // restart the shake animation
  el.classList.add("shake");
}

function setupPasswordToggle() {
  document.querySelectorAll(".pw-toggle").forEach(btn =>
    btn.addEventListener("click", () => {
      const input = $(btn.dataset.target);
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.textContent = show ? "Hide" : "Show";
    }));
}

/* ===== SECTION: Log in (accounts are provided in auth.js) ===== */
function setupLogin() {
  $("login-form").addEventListener("submit", e => {
    e.preventDefault();
    $("login-error").hidden = true;

    const res = loginUser(
      $("login-email").value,
      $("login-password").value,
      $("login-remember").checked
    );
    if (!res.ok) return showError("login-error", res.error);
    playLoginTransition(res.user, $("login-btn"));
  });
}

/* ===== SECTION: After-login animation ===== */
function playLoginTransition(user, originEl) {
  const tr = $("transition");
  // the circle grows from the Log in button until it covers the screen
  const r = originEl.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  tr.style.setProperty("--x", x + "px");
  tr.style.setProperty("--y", y + "px");
  tr.style.setProperty("--s", far / 10 + 2);

  $("tr-title").textContent = `Welcome back, ${user.name}!`;
  tr.classList.add("show");
  setTimeout(() => { location.href = AUTH.HOME; }, LOGIN_ANIM_MS);
}

/* ===== INIT ===== */
setupBackgroundVideo();
runSplash();
setupPasswordToggle();
setupLogin();
