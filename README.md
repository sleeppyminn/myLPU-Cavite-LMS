# myLPU Cavite LMS

A school-project website that imitates a Learning Management System (LMS) for Lyceum of the Philippines University – Cavite. It is built with plain HTML, CSS, and JavaScript, with no frameworks and no server needed.

**Midterm Activity**

- Course: ITEN01C – Introduction to Human Computer Interaction
- Instructor: Ms. Anne Marielle Fortuno
- Created October 2026

## How to run

1. Download or clone this folder.
2. Open `index.html` in a browser. It redirects to the login page.

For best results, open the folder with a local web server (for example the VS Code "Live Server" extension) or host it on GitHub Pages. When the site is served over http/https, the search in the header can also read the text inside the About, Services, Announcements, and Contacts pages. Opened as a plain file, it still finds everything listed in the menu.

## Logging in

There is no sign-up. Accounts are provided, like in a real school LMS.

- Email: the student number plus `@lpunetwork.edu.ph`, for example `2026-2-00001@lpunetwork.edu.ph`. Typing only the student number, such as `2026-2-00001`, also works.
- Password: the default password is set in `auth/auth.js`.
- To add or edit accounts, change the `ACCOUNTS` list in `auth/auth.js`.

> Note: the login runs in the browser, so anyone who views the page source can see the account list. This is fine for a school project but is not real security. Real security needs a server.

## Pages

| Page | Folder | What it has |
|------|--------|-------------|
| Login | `login/` | Login form with a video background and an opening animation |
| Home Page | `homepage/` | Profile, Dashboard, My Courses, View Tasks, Schedule, and Announcements |
| View Tasks | `homepage/view tasks/` | List of tasks with due date, priority, and status |
| Schedule | `schedule/` | Weekly class grid, deadlines, tasks and school calendar |
| Footer | `footer/` | Shared footer (Explore, Support, Contact) added to the main pages |
| My Courses | `my-courses/` | List of enrolled courses, a page for each subject, and activity pages for submitting work |
| About | `about/` | What is an LMS, About LPU, History, Mission and Vision, Stakeholders, School Certificates |
| Services | `services/` | Library Services, Admission Steps & Enrollment, IT Support, Registrar Office |
| Announcements | `announcements/` | Upcoming Events, LPU Articles, Latest News, Class Dept Announcements |
| Contacts | `contacts/` | Registrar, Admission Office, Guidance and Counseling, Accounting, ICTD |

## Project structure

```
myLPU-Cavite-LMS/
├── about/
│   ├── about.css
│   ├── about.html                 about pages
│   ├── about.js
│   ├── dpo.jpg
│   └── npc_cert.png
├── announcements/
│   ├── announcements.css
│   ├── announcements.html         announcements page
│   ├── announcements.js
│   ├── bsit.jpg
│   ├── calendar.jpg
│   ├── cithm.png
│   ├── listofcandidates.png
│   └── lpuc-pnp.png
├── assets/
│   ├── login-bg-poster.jpg        still image shown before the video plays
│   ├── login-bg.mp4               login background video
│   ├── lpu-logo-mobile.png
│   ├── lpu-logo.png
│   └── page-transition.js         soft fade between pages
├── auth/
│   └── auth.js                    login system and the list of provided accounts
├── contacts/
│   ├── contacts.css
│   ├── contacts.html              contacts page
│   └── contacts.js
├── footer/
│   ├── footer.css
│   └── footer.js                  shared footer
├── header/
│   ├── header.css
│   └── header.js                  shared header: menus and search
├── homepage/
│   ├── images/
│   │   └── campus-picture.png
│   ├── view tasks/
│   │   ├── tasks.css
│   │   ├── tasks.html             View Tasks page
│   │   └── tasks.js
│   ├── homepage.css
│   ├── homepage.html              home page after logging in
│   └── homepage.js
├── login/
│   ├── login.css
│   ├── login.html                 login page
│   └── login.js
├── my-courses/
│   ├── images/
│   │   ├── campus-picture.png
│   │   ├── database-banner.png
│   │   ├── electives-banner.png
│   │   ├── hci-banner.png
│   │   ├── it-era-banner.png
│   │   └── oop-banner.png
│   ├── subjects/
│   │   ├── submission bin/
│   │   │   ├── hci-activity.css
│   │   │   ├── hci-activity.html  activity / submission page
│   │   │   ├── hci-activity.js
│   │   │   ├── oop-activity.css
│   │   │   ├── oop-activity.html
│   │   │   ├── oop-activity.js
│   │   │   ├── web-dev-activity.css
│   │   │   ├── web-dev-activity.html
│   │   │   └── web-dev-activity.js
│   │   ├── database.css
│   │   ├── database.html
│   │   ├── database.js
│   │   ├── electives.css
│   │   ├── electives.html
│   │   ├── electives.js
│   │   ├── hci.css
│   │   ├── hci.html               subject page (one per course)
│   │   ├── hci.js
│   │   ├── it-era.css
│   │   ├── it-era.html
│   │   ├── it-era.js
│   │   ├── oop.css
│   │   ├── oop.html
│   │   └── oop.js
│   ├── courses.css
│   ├── courses.html               courses page
│   └── courses.js
├── schedule/
│   ├── schedule.css
│   ├── schedule.html              weekly schedule page
│   └── schedule.js
├── services/
│   ├── ARC_LIB.jpg
│   ├── services.css
│   ├── services.html              services pages
│   └── services.js
├── index.html                     redirects to the login page
└── README.md
```

Each page folder has its own `.html`, `.css`, and `.js` file. The header is shared: every page loads `header/header.js`, which adds the header automatically. The footer works the same way with `footer/footer.js`.

## Editing the site

- **Menu and search:** edit the `MENU` and search lists at the top of `header/header.js`. If header styles do not update in the browser, raise the `VERSION` number in that file.
- **Contact details:** edit `contacts/contacts.html`. Details marked `TBA` are still to be announced.
- **Accounts:** edit `auth/auth.js`.

## Team

Midterm activity for ITEN01C – Introduction to Human Computer Interaction, instructor Ms. Anne Marielle Fortuno.

Members:

- Yoo, Min Sun O.
- Realubit, Jasmine Keith L.
- Quilino, Mark Kevin S.
- Macato, Llander A.
