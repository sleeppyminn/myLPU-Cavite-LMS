/* LPU Cavite shared header  (version 4)
   Usage on ANY page:  <script src="../header/header.js"></script>   (path relative to that page)
   Everything is built here, so there is no header.html to go missing.
   To change the menu, edit the MENUS lists below. */
(function () {
  var VERSION = 4;

  /* ---------- MENU: edit here (label, then [text, path-from-site-root]) ---------- */
  var LEFT = [
    { label: 'Home Page', items: [
      ['Task Progress',       'homepage/homepage.html#progress'],
      ['Announcements',       'homepage/homepage.html#announcements'],
      ['School Certificates', 'homepage/homepage.html#certificates'] ] },
    { label: 'About', items: [
      ['What is an LMS?', 'about/about.html#lms'],
      ['About LPU',       'about/about.html#about-lpu'],
      ['Stakeholders',    'about/about.html#stakeholders'] ] },
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
        '</a>' +
        '<button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteHeader">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '</button>' +
        '<nav class="utility" aria-hidden="true"><div class="row"><span></span><span></span><span></span></div></nav>' +
        '<nav class="mainbar" aria-label="Main">' +
          '<div class="row">' +
            '<ul>' + left + '</ul>' +
            '<span></span>' +
            '<ul>' + right +
              '<li><a class="search" href="#" aria-label="Search">' + SEARCH + '</a></li>' +
            '</ul>' +
          '</div>' +
        '</nav>' +
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
    console.info('[LPU header] v' + VERSION + ' loaded, menus: ' + slot.querySelectorAll('.sub-btn').length + ' (expected 5)');
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

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
