/* LPU Cavite shared footer (version 1)
   Usage on ANY page, after the header script:  <script src="../footer/footer.js"></script>
   Everything is built here, like header.js. To change links or contact details, edit the lists below. */
(function () {
  var VERSION = 2;
  var COLS = [   // [column title, [[text, path-from-site-root], ...]]
    ['Explore', [['Home Page', 'homepage/homepage.html'], ['My Courses', 'my-courses/courses.html'], ['Schedule', 'schedule/schedule.html'], ['About', 'about/about.html']]],
    ['Support', [['Services', 'services/services.html'], ['Announcements', 'announcements/announcements.html'], ['Contacts', 'contacts/contacts.html'], ['IT Support', 'services/services.html#it-support']]]
  ];
  var CONTACT = [   // [label, text]
    ['Address', "Governor's Drive, Brgy. Manggahan, General Trias, Cavite"],
    ['Trunkline', '8527-8253 to 56'],
    ['Registrar', 'srmd@lpu.edu.ph']
  ];

  var script = document.currentScript;
  var base = new URL('.', script.src);
  var root = new URL('../', base).href;
  if (!document.querySelector('link[href*="footer.css"]')) {
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = new URL('footer.css', base).href + '?v=' + VERSION;
    document.head.appendChild(l);
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function build() {
    var cols = COLS.map(function (c) {
      return '<nav class="f-col" aria-label="' + esc(c[0]) + '"><h3>' + esc(c[0]) + '</h3><ul>' +
        c[1].map(function (i) { return '<li><a href="' + root + i[1] + '">' + esc(i[0]) + '</a></li>'; }).join('') + '</ul></nav>';
    }).join('');
    var contact = CONTACT.map(function (c) { return '<li><b>' + esc(c[0]) + '</b>' + esc(c[1]) + '</li>'; }).join('');
    return '<footer class="site-footer" data-version="' + VERSION + '"><div class="f-main">' +
      '<div class="f-brand"><span class="f-logo"><img src="' + root + 'assets/lpu-logo.png" alt="Lyceum of the Philippines University Cavite"></span>' +
      '<p>myLPU Cavite LMS: classes, schedules, services and announcements in one place.</p></div>' +
      cols + '<div class="f-col"><h3>Contact</h3><ul class="f-contact">' + contact + '</ul></div></div>' +
      '<div class="f-bar"><span>\u00a9 ' + new Date().getFullYear() + ' Lyceum of the Philippines University \u2013 Cavite</span>' +
      '<span>School project for ITEN01C \u2013 Introduction to Human Computer Interaction</span></div></footer>';
  }
  function start() {
    var slot = document.getElementById('site-footer');
    if (!slot) { slot = document.createElement('div'); slot.id = 'site-footer'; document.body.appendChild(slot); }
    slot.innerHTML = build();
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();