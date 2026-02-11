# Student Registration System

A simple student registration system where you can register student details (name, student ID, email ID, contact number), and edit or delete records. Data is stored in the browser using localStorage so it persists after refresh.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **TailwindCSS** (Optional)


## Installation & Setup (Optional)

Follow these steps to set up and run the project:

### 1. Clone or Download the Project

```bash
cd Student-Registration-System
```

### 2. Install Dependencies

Install the Tailwind CSS CLI and other dependencies:

```bash
npm install 
npm install tailwindcss @tailwindcss/cli
```

### 3. Run Tailwind CSS Watcher

To compile CSS files and watch for changes, run:

```bash
npx @tailwindcss/cli -i ./input.css -o ./style.css --watch
```

This command will:
- **-i ./input.css**: Input CSS file containing Tailwind directives
- **-o ./style.css**: Output compiled CSS file
- **--watch**: Automatically recompile when changes are detected

### 4.  How to run the Project

Open `index.html` in your web browser:
- Double-click the `index.html` file, or
- Use a live server extension(recommended):

Then visit `http://localhost:XXXX` in your browser.

## Features

- **Register students** – Add records with Student Name, Student ID, Email ID, and Contact number.
- **Edit records** – Click “Edit” on a row to load it into the form, then click “Update” to save.
- **Delete records** – Click “Delete” on a row to remove it.
- **Validation** – Student name (letters and spaces only), Student ID (numbers only), valid email, Contact number (digits only, at least 10). Empty records cannot be added.
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

## GitHub

Repository: [\[GitHub repository link here\]](https://github.com/AManSUmreThe/Student-Registration-System)
