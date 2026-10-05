/* LPU Cavite shared header  (version 9)
   Usage on ANY page:  <script src="../header/header.js"></script>   (path relative to that page)
   Everything is built here, so there is no header.html to go missing.
   To change the menu, edit the MENUS lists below. */
(function () {
  var VERSION = 9;

  /* ---------- MENU: edit here (label, then [text, path-from-site-root]) ---------- */
  var LEFT = [
    { label: 'Home Page', items: [
      ['Profile',    'homepage/homepage.html#profile'],
      ['Dashboard',  'homepage/homepage.html#dashboard'],
      ['My Courses', 'homepage/homepage.html#my-courses'],
      ['View Tasks', 'homepage/homepage.html#view-tasks'],
      ['Schedule',   'homepage/homepage.html#schedule'] ] },
    { label: 'About', items: [
      ['What is an LMS?', 'about/about.html#lms'],
      ['About LPU',       'about/about.html#about-lpu'],
      ['Stakeholders',    'about/about.html#stakeholders'],
      ['School Certificates', 'about/about.html#certificates'] ] },
    { label: 'Services', items: [
      ['Library Services',             'services/services.html#library'],
      ['Admission Steps & Enrollment', 'services/services.html#admission'],
      ['IT Support',                   'services/services.html#it-support'],
      ['Registrar Office',             'services/services.html#registrar'] ] }
  ];
  var RIGHT = [
    { label: 'Announcements', items: [
      ['Upcoming Events',          'announcements/announcements.html#events'],
      ['LPU Articles',             'announcements/announcements.html#articles'],
      ['Latest News',              'announcements/announcements.html#news'],
      ['Class Dept Announcements', 'announcements/announcements.html#class-dept'] ] },
    { label: 'Contacts', items: [
      ['Registrar',    'contacts/contacts.html#registrar'],
      ['IT Helpdesk',  'contacts/contacts.html#it-helpdesk'] ] }
  ];
  /* ---------- SEARCH: edit here ----------
     The search looks through every menu item above, plus these extra entries and courses.
     When the site is opened through a web server (GitHub Pages, Live Server) it also reads the
     text inside the About / Services / Announcements / Contacts pages, so words typed inside
     those pages are found too. Opened as a plain file it still finds everything listed here. */
  var COURSES = [   // [code, title, professor]
    ['ITEN01C', 'Introduction to Human Computer Interaction', 'Ms. Anne Marielle Fortuno'],
    ['CSCN02C', 'Object-Oriented Programming', 'Mr. John Rommel Tinasas'],
    ['ELECL1C', 'ICT Electives', 'Ms. Lizette Mendoza'],
    ['LVTN01C', 'Living in the IT Era', 'Mr. Jeric Bryan Lim'],
    ['ITEN03C', 'Fundamentals of Database', 'Mr. Arcell Hadlocon']
  ];
  var EXTRA = [     // extra searchable entries: title, group, path-from-site-root, keywords
    { title: 'Current Tasks',        group: 'Home Page', path: 'homepage/homepage.html#current-tasks', keywords: 'tasks activity deadline due python project design prototype' },
    { title: 'Upcoming Schedule',    group: 'Home Page', path: 'homepage/homepage.html#schedule',      keywords: 'schedule class room calendar time' },
    { title: 'Recent Announcements', group: 'Home Page', path: 'homepage/homepage.html#announcements', keywords: 'announcements suspension deadline extension' },
    { title: 'General Tasks',        group: 'Home Page', path: 'homepage/homepage.html#progress',      keywords: 'completion completed pending donut' },
    { title: 'Academic Progress',    group: 'Home Page', path: 'homepage/homepage.html#academic',      keywords: 'attendance gpa grades progress' },
    { title: 'Our History',          group: 'About',     path: 'about/about.html#' + encodeURIComponent('history lpu'),       keywords: 'history founded' },
    { title: 'Mission and Vision',   group: 'About',     path: 'about/about.html#' + encodeURIComponent('mission & vision'),  keywords: 'mission vision values' }
  ];
  var CRAWL = [     // pages whose text is read for the search (only when served over http/https)
    'about/about.html', 'services/services.html', 'announcements/announcements.html', 'contacts/contacts.html'
  ];
  /* ------------------------------------------------------------------------------ */

  var script = document.currentScript;
  var base = new URL('.', script.src);       // .../header/
  var root = new URL('../', base).href;      // site root (parent of /header and /assets)

  function addLink(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  }
  addLink('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&display=swap');
  addLink(new URL('header.css', base).href + '?v=' + VERSION);

  var CHEV = '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.2 5 6.8l3.5-3.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';

  function esc(s) { return s.replace(/&/g, '&amp;'); }

  function menu(m, isEnd) {
    var links = m.items.map(function (i) {
      return '<li><a href="' + root + i[1] + '">' + esc(i[0]) + '</a></li>';
    }).join('');
    return '<li class="has-sub' + (isEnd ? ' end' : '') + '">' +
             '<button class="sub-btn" aria-expanded="false">' + esc(m.label) + ' ' + CHEV + '</button>' +
             '<ul class="sub">' + links + '</ul>' +
           '</li>';
  }

  function build() {
    var left = LEFT.map(function (m) { return menu(m, false); }).join('');
    var right = RIGHT.map(function (m, k) { return menu(m, k === RIGHT.length - 1); }).join('');
    return '' +
      '<header class="site-header" id="siteHeader" data-version="' + VERSION + '">' +
        '<a class="brand" href="' + root + 'homepage/homepage.html" title="Lyceum of the Philippines University Cavite" aria-label="LPU Cavite home">' +
          '<img class="brand-logo" src="' + root + 'assets/lpu-logo.png" alt="Lyceum of the Philippines University Cavite">' +
          '<img class="brand-logo-mobile" src="' + root + 'assets/lpu-logo-mobile.png" alt="Lyceum of the Philippines University Cavite">' +
        '</a>' +
        '<button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteHeader">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '</button>' +
        '<a class="search-mobile" href="#" role="button" aria-label="Search" aria-expanded="false" data-search-toggle>' + SEARCH + '</a>' +
        '<nav class="utility" aria-hidden="true"><div class="row"><span></span><span></span><span></span></div></nav>' +
        '<nav class="mainbar" aria-label="Main">' +
          '<span class="mainbar-bg" aria-hidden="true"></span>' +
          '<div class="row">' +
            '<ul>' + left + '</ul>' +
            '<span></span>' +
            '<ul>' + right +
              '<li><a class="search" href="#" role="button" aria-label="Search" aria-expanded="false" data-search-toggle>' + SEARCH + '</a></li>' +
            '</ul>' +
          '</div>' +
        '</nav>' +
        '<div class="search-panel" id="searchPanel" hidden>' +
          '<div class="search-box" role="search">' +
            '<input type="search" id="siteSearchInput" placeholder="Search pages, services, courses..." autocomplete="off" aria-label="Search the site">' +
            '<button type="button" class="search-close" aria-label="Close search">\u2715</button>' +
          '</div>' +
          '<ul class="search-results" id="siteSearchResults"></ul>' +
        '</div>' +
      '</header>';
  }

  function start() {
    var slot = document.getElementById('site-header');
    if (!slot) {
      slot = document.createElement('div');
      slot.id = 'site-header';
      document.body.insertBefore(slot, document.body.firstChild);
    }
    slot.innerHTML = build();
    initHeader();
    initSearch();
    console.info('[LPU header] v' + VERSION + ' loaded, menus: ' + slot.querySelectorAll('.sub-btn').length + ' (expected 5)');
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

  /* ---------- SEARCH (opens from the magnifier icon) ---------- */
  function escHtml(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function escRe(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlight(text, terms) {
    var re = new RegExp('(' + terms.map(escRe).join('|') + ')', 'gi');
    return text.split(re).map(function (part, i) { return i % 2 ? '<mark>' + escHtml(part) + '</mark>' : escHtml(part); }).join('');
  }

  function initSearch() {
    var header = document.getElementById('siteHeader');
    var panel = document.getElementById('searchPanel');
    var input = document.getElementById('siteSearchInput');
    var results = document.getElementById('siteSearchResults');
    var toggles = document.querySelectorAll('[data-search-toggle]');
    var index = [], byUrl = {}, active = -1, crawled = false;

    function add(e) {
      var key = e.url.toLowerCase();
      if (byUrl[key]) {                      // same page/section already listed: just add the extra text
        byUrl[key].text = e.text || byUrl[key].text;
        if (e.title && !byUrl[key].title) byUrl[key].title = e.title;
        return;
      }
      byUrl[key] = e; index.push(e);
    }
    LEFT.concat(RIGHT).forEach(function (m) {
      m.items.forEach(function (i) { add({ title: i[0], group: m.label, url: root + i[1], keywords: '', text: '' }); });
    });
    EXTRA.forEach(function (x) { add({ title: x.title, group: x.group, url: root + x.path, keywords: x.keywords || '', text: '' }); });
    COURSES.forEach(function (c) {
      add({ title: c[1], group: 'My Courses', url: root + 'my-courses/courses.html#' + c[0], keywords: c[0] + ' ' + c[2] + ' course subject', text: '' });
    });

    /* read the real text of the other pages (works when the site is served over http/https) */
    function crawl() {
      if (crawled || typeof fetch !== 'function' || typeof DOMParser === 'undefined') return Promise.resolve();
      crawled = true;
      return Promise.all(CRAWL.map(function (path) {
        return fetch(root + path).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
          if (!html) return;
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var page = (doc.querySelector('h1') || {}).textContent || path;
          Array.prototype.forEach.call(doc.querySelectorAll('section[id]'), function (sec) {
            var h = sec.querySelector('h2');
            add({ title: h ? h.textContent.trim() : page.trim(), group: page.trim(), url: root + path + '#' + encodeURIComponent(sec.id),
                  keywords: '', text: sec.textContent.replace(/\s+/g, ' ').trim() });
          });
        }).catch(function () {});
      }));
    }

    function score(e, terms) {
      var t = e.title.toLowerCase(), k = (e.keywords + ' ' + e.group).toLowerCase(), x = e.text.toLowerCase(), s = 0;
      for (var i = 0; i < terms.length; i++) {
        var hit = false;
        if (t.indexOf(terms[i]) > -1) { s += 10; hit = true; }
        if (k.indexOf(terms[i]) > -1) { s += 5; hit = true; }
        if (x.indexOf(terms[i]) > -1) { s += 2; hit = true; }
        if (!hit) return 0;                  // every typed word must be found somewhere
      }
      return s;
    }
    function snippet(e, terms) {
      var x = e.text; if (!x) return '';
      var low = x.toLowerCase(), at = -1;
      for (var i = 0; i < terms.length && at < 0; i++) at = low.indexOf(terms[i]);
      if (at < 0) return x.slice(0, 90) + (x.length > 90 ? '\u2026' : '');
      var from = Math.max(0, at - 40);
      return (from > 0 ? '\u2026' : '') + x.slice(from, from + 110) + (from + 110 < x.length ? '\u2026' : '');
    }

    function render() {
      var terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      active = -1;
      if (!terms.length) { results.innerHTML = '<li class="search-hint">Type to search pages, services and courses.</li>'; return; }
      var hits = index.map(function (e) { return { e: e, s: score(e, terms) }; })
        .filter(function (h) { return h.s > 0; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 8);
      if (!hits.length) { results.innerHTML = '<li class="search-hint">No results for \u201c' + escHtml(input.value.trim()) + '\u201d.</li>'; return; }
      results.innerHTML = hits.map(function (h) {
        var sn = snippet(h.e, terms);
        return '<li><a href="' + escHtml(h.e.url) + '"><span class="r-top"><b>' + highlight(h.e.title, terms) + '</b><em>' + escHtml(h.e.group) + '</em></span>' +
               (sn ? '<small>' + highlight(sn, terms) + '</small>' : '') + '</a></li>';
      }).join('');
    }

    function setActive(n) {
      var links = results.querySelectorAll('a');
      if (!links.length) return;
      active = (n + links.length) % links.length;
      Array.prototype.forEach.call(links, function (a, i) { a.classList.toggle('active', i === active); });
      links[active].scrollIntoView({ block: 'nearest' });
    }

    function openSearch() {
      closeAll();
      header.classList.remove('open');
      panel.hidden = false;
      Array.prototype.forEach.call(toggles, function (t) { t.setAttribute('aria-expanded', 'true'); });
      render();
      input.focus();
      crawl().then(function () { if (!panel.hidden) render(); });
    }
    function closeSearch() {
      if (panel.hidden) return;
      panel.hidden = true;
      Array.prototype.forEach.call(toggles, function (t) { t.setAttribute('aria-expanded', 'false'); });
    }

    Array.prototype.forEach.call(toggles, function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        if (panel.hidden) openSearch(); else closeSearch();
      });
    });
    panel.querySelector('.search-close').addEventListener('click', function (e) { e.stopPropagation(); closeSearch(); });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') {
        var links = results.querySelectorAll('a');
        if (links.length) { e.preventDefault(); location.href = links[active > -1 ? active : 0].href; }
      }
    });
    document.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });
  }

  function closeAll() {
    document.querySelectorAll('.has-sub.open').forEach(function (o) {
      o.classList.remove('open');
      o.querySelector('.sub-btn').setAttribute('aria-expanded', 'false');
    });
  }

  function initHeader() {
    var header = document.getElementById('siteHeader');
    var toggle = document.getElementById('menuToggle');

    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    document.querySelectorAll('#siteHeader .sub-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var li = btn.parentElement;
        var willOpen = !li.classList.contains('open');
        closeAll();
        if (willOpen) { li.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
        e.stopPropagation();
      });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  }
})();