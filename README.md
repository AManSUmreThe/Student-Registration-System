# Student Registration System

A simple student registration system where you can register student details (name, student ID, class, roll number), and edit or delete records. Data is stored in the browser using localStorage so it persists after refresh.

## How to run

1. **Option A – Use the pre-built CSS**  
   Open `index.html` in your browser (double-click or drag into a browser window).  
   If you have not run the build step, the page may lack styles; then use Option B.

2. **Option B – Build CSS then open**  
   - Install dependencies: `npm install`  
   - Build the stylesheet: `npm run build:css`  
   - Open `index.html` in your browser.  
   For development with live CSS updates: `npm run dev` (then refresh the page after changes to `input.css` or HTML).

## Features

- **Register students** – Add records with Student Name, Student ID, Class, and Roll No.
- **Edit records** – Click “Edit” on a row to load it into the form, then click “Update” to save.
- **Delete records** – Click “Delete” on a row to remove it.
- **Validation** – Student name (letters and spaces only), Student ID (numbers only), Class (required), Roll No. (numbers only). Empty records cannot be added.
- **Persistence** – Data is saved in localStorage and remains after page refresh.
- **Responsive layout** – Works on mobile (≤640px), tablet (641px–1024px), and desktop (≥1025px). Form and table stack on small screens and sit side-by-side on large screens.
- **Dynamic scrollbar** – The records table gets a vertical scrollbar (via JavaScript) when content exceeds a set height.

## Project structure

- `index.html` – Single page with form and table
- `input.css` – Tailwind source (custom gradient + `@tailwind` directives)
- `styles.css` – Built CSS from Tailwind CLI (do not edit by hand)
- `tailwind.config.js` – Tailwind content paths
- `package.json` – Scripts: `build:css`, `dev`
- `app.js` – Add, edit, delete, validation, localStorage, scrollbar logic
- `README.md` – This file

## Submission note

If you submit as a zip: run `npm run build:css`, then **remove the `node_modules` folder** before zipping. Include `index.html`, `styles.css`, `app.js`, and `README.md` (and optionally `package.json`, `tailwind.config.js`, `input.css` for rebuild).

## GitHub

Repository: [\[GitHub repository link here\]](https://github.com/AManSUmreThe/Student-Registration-System)
