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
| Schedule | `schedule/` | Weekly class grid, deadlines, tasks and school calendar |
| Footer | `footer/` | Shared footer (Explore, Support, Contact) added to the main pages |
| My Courses | `my-courses/` | List of enrolled courses |
| About | `about/` | What is an LMS, About LPU, History, Mission and Vision, Stakeholders, School Certificates |
| Services | `services/` | Library Services, Admission Steps & Enrollment, IT Support, Registrar Office |
| Announcements | `announcements/` | Upcoming Events, LPU Articles, Latest News, Class Dept Announcements |
| Contacts | `contacts/` | Registrar, Admission Office, Guidance and Counseling, Accounting, ICTD |

## Project structure

```
index.html        redirects to the login page
auth/             login system and the list of provided accounts
header/           shared header: dropdown menus and search (header.js, header.css)
login/            login page
homepage/         home page after logging in
my-courses/       courses page
about/            about pages
services/         services pages
announcements/    announcements page
contacts/         contacts page
assets/           logos, login background video, and poster image
```

Each page folder has its own `.html`, `.css`, and `.js` file. The header is shared: every page loads `header/header.js`, which adds the header automatically.

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
