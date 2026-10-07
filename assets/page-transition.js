/* page-transition.js – soft fade between pages. Put this file in the  assets  folder.
   Add ONE line inside <head> of every page that should fade (adjust the ../ to match the page's folder depth):
     <script src="../assets/page-transition.js"></script>
   It fades the new page in when it opens, and fades the current page out when a link to another page is clicked.
   It also works on the links the header (header.js) creates, because it listens to every click on the page. */
(function () {
  var IN = 280, OUT = 180;   // milliseconds: fade-in on arrival, fade-out on leaving
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var css = document.createElement("style");
  css.textContent =
    "@keyframes pt-in{from{opacity:0}to{opacity:1}}" +
    "html{animation:pt-in " + IN + "ms ease-out}" +
    "html.pt-out{opacity:0;transition:opacity " + OUT + "ms ease-in}";
  document.head.appendChild(css);

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin || !/^https?:|^file:/.test(url.protocol)) return;   // other sites, mailto:, etc.
    if (url.pathname === location.pathname && url.search === location.search) return;       // "#" and same-page links
    e.preventDefault();
    document.documentElement.classList.add("pt-out");
    setTimeout(function () { location.href = url.href; }, OUT);
  });

  // coming back with the browser's Back button: make sure the page isn't left faded out
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) document.documentElement.classList.remove("pt-out");
  });
})();
