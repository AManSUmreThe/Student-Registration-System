/**
 * Student Registration System - Main application logic
 * Handles: add, edit, delete records; validation; localStorage persistence; dynamic scrollbar
 */

const STORAGE_KEY = 'studentRegistrationRecords';
const TABLE_SCROLL_MAX_HEIGHT = 400; // px - scrollbar appears when table exceeds this height

// In-memory list of students. Synced with localStorage on load and on every add/edit/delete.
let students = [];

// When editing, holds the index of the record being edited; null when adding.
let editingIndex = null;

// DOM elements
const form = document.getElementById('student-form');
const tbody = document.getElementById('records-tbody');
const tableScrollContainer = document.getElementById('table-scroll-container');
const noRecordsEl = document.getElementById('no-records');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const nameInput = document.getElementById('student-name');
const idInput = document.getElementById('student-id');
const classInput = document.getElementById('student-class');
const rollNoInput = document.getElementById('roll-no');

const errorEls = {
  name: document.getElementById('name-error'),
  id: document.getElementById('id-error'),
  class: document.getElementById('class-error'),
  rollNo: document.getElementById('rollno-error'),
};

/**
 * Load students from localStorage. Called once on page load.
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    students = raw ? JSON.parse(raw) : [];
  } catch (e) {
    students = [];
  }
}

/**
 * Persist current students array to localStorage and re-render the table.
 */
function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  renderTable();
  applyDynamicScrollbar();
}

/**
 * Validation rules:
 * Student name: letters and spaces only
 * Student ID: numbers only
 * Class: non-empty, alphanumeric allowed
 * Roll No.: numbers only, at least one digit
 */
function validateName(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return { valid: false, message: 'Name is required.' };
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) return { valid: false, message: 'Name must contain only letters and spaces.' };
  return { valid: true };
}

function validateStudentId(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return { valid: false, message: 'Student ID is required.' };
  if (!/^\d+$/.test(trimmed)) return { valid: false, message: 'Student ID must contain only numbers.' };
  return { valid: true };
}

function validateClass(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return { valid: false, message: 'Class is required.' };
  return { valid: true };
}

function validateRollNo(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return { valid: false, message: 'Roll No. is required.' };
  if (!/^\d+$/.test(trimmed)) return { valid: false, message: 'Roll No. must contain only numbers.' };
  return { valid: true };
}

function showError(field, message) {
  const el = errorEls[field];
  if (el) {
    el.textContent = message || '';
    el.classList.toggle('hidden', !message);
  }
}

function clearAllErrors() {
  Object.keys(errorEls).forEach((key) => showError(key, ''));
}

/**
 * Validate all form fields. Returns true if valid; otherwise shows errors and returns false.
 */
function validateForm() {
  const name = nameInput.value;
  const id = idInput.value;
  const cls = classInput.value;
  const rollNo = rollNoInput.value;

  const rName = validateName(name);
  const rId = validateStudentId(id);
  const rClass = validateClass(cls);
  const rRollNo = validateRollNo(rollNo);

  showError('name', rName.valid ? '' : rName.message);
  showError('id', rId.valid ? '' : rId.message);
  showError('class', rClass.valid ? '' : rClass.message);
  showError('rollNo', rRollNo.valid ? '' : rRollNo.message);

  return rName.valid && rId.valid && rClass.valid && rRollNo.valid;
}

/**
 * Prevent empty rows: ensure no required field is empty after trim.
 */
function hasEmptyFields() {
  return (
    !nameInput.value.trim() ||
    !idInput.value.trim() ||
    !classInput.value.trim() ||
    !rollNoInput.value.trim()
  );
}

/**
 * Build one table row for a student, with Edit and Delete buttons.
 */
function buildRow(student, index) {
  const tr = document.createElement('tr');
  tr.className = 'border-b border-gray-300 bg-white/50 hover:bg-white/70';
  tr.innerHTML = `
    <td class="py-2 px-4 border border-gray-300">${escapeHtml(student.name)}</td>
    <td class="py-2 px-4 border border-gray-300">${escapeHtml(student.studentId)}</td>
    <td class="py-2 px-4 border border-gray-300">${escapeHtml(student.class)}</td>
    <td class="py-2 px-4 border border-gray-300">${escapeHtml(student.rollNo)}</td>
    <td class="py-2 px-4 border border-gray-300">
      <button type="button" class="edit-btn rounded-full px-3 py-1 text-sm bg-gray-700 text-white hover:bg-gray-800 mr-1" data-index="${index}">Edit</button>
      <button type="button" class="delete-btn rounded-full px-3 py-1 text-sm bg-gray-700 text-white hover:bg-gray-800" data-index="${index}">Delete</button>
    </td>
  `;
  tr.querySelector('.edit-btn').addEventListener('click', () => startEdit(index));
  tr.querySelector('.delete-btn').addEventListener('click', () => deleteRecord(index));
  return tr;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Render the entire table from the students array.
 */
function renderTable() {
  tbody.innerHTML = '';
  if (students.length === 0) {
    noRecordsEl.classList.remove('hidden');
    return;
  }
  noRecordsEl.classList.add('hidden');
  students.forEach((student, index) => tbody.appendChild(buildRow(student, index)));
}

/**
 * Add dynamic vertical scrollbar to the table container (assignment: "With the use of JavaScript").
 * When content height exceeds TABLE_SCROLL_MAX_HEIGHT, overflow-y: auto is applied so a scrollbar appears.
 */
function applyDynamicScrollbar() {
  if (!tableScrollContainer) return;
  tableScrollContainer.style.maxHeight = `${TABLE_SCROLL_MAX_HEIGHT}px`;
  tableScrollContainer.style.overflowY = 'auto';
}

function clearForm() {
  form.reset();
  clearAllErrors();
  editingIndex = null;
  submitBtn.textContent = 'Add';
  cancelBtn.classList.add('hidden');
}

function startEdit(index) {
  const s = students[index];
  nameInput.value = s.name;
  idInput.value = s.studentId;
  classInput.value = s.class;
  rollNoInput.value = s.rollNo;
  editingIndex = index;
  submitBtn.textContent = 'Update';
  cancelBtn.classList.remove('hidden');
  clearAllErrors();
}

function deleteRecord(index) {
  students.splice(index, 1);
  saveAndRender();
  if (editingIndex === index) clearForm();
  else if (editingIndex != null && editingIndex > index) editingIndex -= 1;
}

/**
 * Form submit: validate, then add new or update existing. No empty rows allowed.
 */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (hasEmptyFields()) {
    clearAllErrors();
    showError('name', 'All fields are required. Cannot add an empty record.');
    return;
  }
  if (!validateForm()) return;

  const record = {
    name: nameInput.value.trim(),
    studentId: idInput.value.trim(),
    class: classInput.value.trim(),
    rollNo: rollNoInput.value.trim(),
  };

  if (editingIndex !== null) {
    students[editingIndex] = record;
  } else {
    students.push(record);
  }
  saveAndRender();
  clearForm();
});

cancelBtn.addEventListener('click', clearForm);

// Initial load: restore from localStorage and render; then apply scrollbar
loadFromStorage();
renderTable();
applyDynamicScrollbar();
