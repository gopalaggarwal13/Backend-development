import {
  library,
  courseCatalog,
  addBook,
  findBook,
  removeBook,
  updateBook,
  toggleBookStatus,
  clearLibrary
} from "./library.js";

const form = document.querySelector("#bookForm");
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const courseInput = document.querySelector("#courseInput");
const editIndex = document.querySelector("#editIndex");
const formHeading = document.querySelector("#formHeading");
const submitButton = document.querySelector("#submitBtn");
const cancelEditButton = document.querySelector("#cancelEdit");
const formMessage = document.querySelector("#formMessage");
const bookList = document.querySelector("#bookList");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const courseFilter = document.querySelector("#courseFilter");
const statusFilter = document.querySelector("#statusFilter");
const collectionStatus = document.querySelector("#collectionStatus");
const totalCount = document.querySelector("#totalBooks");
const availableCount = document.querySelector("#availableBooks");
const issuedCount = document.querySelector("#issuedBooks");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function populateCourseSelects() {
  courseCatalog.forEach(course => {
    const formOption = document.createElement("option");
    formOption.value = course.name;
    formOption.textContent = course.name;
    courseInput.append(formOption);

    const filterOption = document.createElement("option");
    filterOption.value = course.name;
    filterOption.textContent = `Semester ${course.semester} · ${course.name}`;
    courseFilter.append(filterOption);
  });
}

function renderStats() {
  totalCount.textContent = library.length;
  availableCount.textContent = library.filter(book => book.status === "available").length;
  issuedCount.textContent = library.filter(book => book.status === "issued").length;
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCourse = courseFilter.value;
  const selectedStatus = statusFilter.value;

  const visibleBooks = library
    .map((book, index) => ({ book, index }))
    .filter(({ book }) => {
      const searchableText = `${book.title} ${book.author} ${book.course}`.toLowerCase();
      const matchesQuery = searchableText.includes(query);
      const matchesCourse = selectedCourse === "all" || book.course === selectedCourse;
      const matchesStatus = selectedStatus === "all" || book.status === selectedStatus;
      return matchesQuery && matchesCourse && matchesStatus;
    });

  bookList.innerHTML = visibleBooks.map(({ book, index }) => {
    const title = escapeHtml(book.title);
    const author = escapeHtml(book.author);
    const course = escapeHtml(book.course);
    const status = escapeHtml(book.status);
    const semester = book.semester ? `Semester ${book.semester}` : "Independent study";
    const toggleLabel = book.status === "available" ? "Issue" : "Return";
    const toggleClass = book.status === "available" ? "action-issue" : "action-return";

    return `
      <article class="book-card">
        <span class="book-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <div class="book-details">
          <h3>${title}</h3>
          <p class="book-author">${author}</p>
          <div class="book-tags">
            <span class="course-tag">${course}</span>
            <span class="semester-tag">${semester}</span>
            <span class="status-tag status-${status}">${status}</span>
          </div>
        </div>
        <div class="book-actions" aria-label="Actions for ${title}">
          <button class="action-button ${toggleClass}" type="button" data-action="toggle" data-index="${index}" aria-label="${toggleLabel} ${title}">${toggleLabel}</button>
          <button class="action-button" type="button" data-action="edit" data-index="${index}" aria-label="Edit ${title}">Edit</button>
          <button class="action-button action-delete" type="button" data-action="delete" data-index="${index}" aria-label="Delete ${title}">Delete</button>
        </div>
      </article>`;
  }).join("");

  emptyState.hidden = visibleBooks.length > 0;
  collectionStatus.textContent = `${visibleBooks.length} of ${library.length} ${library.length === 1 ? "title" : "titles"} shown.`;
  renderStats();
}

function showFormMessage(message, kind = "success") {
  formMessage.textContent = message;
  formMessage.className = `form-message message-${kind}`;
  formMessage.hidden = false;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.hidden = true;
  formMessage.className = "form-message";
}

function resetForm() {
  form.reset();
  editIndex.value = "";
  formHeading.textContent = "Add a book";
  submitButton.textContent = "Add book";
  cancelEditButton.classList.add("hidden");
  clearFormMessage();
}

function startEditing(index) {
  const book = library[index];
  if (!book) return;

  titleInput.value = book.title;
  authorInput.value = book.author;
  courseInput.value = book.course;
  editIndex.value = String(index);
  formHeading.textContent = "Edit a book";
  submitButton.textContent = "Save changes";
  cancelEditButton.classList.remove("hidden");
  clearFormMessage();
  titleInput.focus();
}

function submitBook(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const course = courseInput.value;
  const currentIndex = editIndex.value === "" ? -1 : Number(editIndex.value);

  if (!title || !author || !course) {
    showFormMessage("Enter a title, author and related course.", "error");
    return;
  }

  const matchingBook = findBook(title);
  if (matchingBook && library.indexOf(matchingBook) !== currentIndex) {
    showFormMessage("A book with this title is already in the collection.", "error");
    titleInput.focus();
    return;
  }

  if (currentIndex === -1) {
    addBook(title, author, course);
    resetForm();
    showFormMessage(`Added “${title}” to the collection.`);
  } else if (updateBook(currentIndex, title, author, course)) {
    resetForm();
    showFormMessage(`Updated “${title}”.`);
  } else {
    showFormMessage("That book could not be updated. Refresh and try again.", "error");
  }

  renderBooks();
}

populateCourseSelects();
renderBooks();

form.addEventListener("submit", submitBook);
searchInput.addEventListener("input", renderBooks);
courseFilter.addEventListener("change", renderBooks);
statusFilter.addEventListener("change", renderBooks);

cancelEditButton.addEventListener("click", () => {
  resetForm();
  titleInput.focus();
});

bookList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;
  const book = library[index];
  if (!book) return;

  if (action === "toggle") {
    toggleBookStatus(index);
    showFormMessage(`“${book.title}” is now ${book.status}.`);
  } else if (action === "edit") {
    startEditing(index);
    return;
  } else if (action === "delete" && window.confirm(`Remove “${book.title}” from the collection?`)) {
    const editingIndex = editIndex.value === "" ? -1 : Number(editIndex.value);
    removeBook(index);
    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex > index) {
      editIndex.value = String(editingIndex - 1);
    }
    showFormMessage(`Removed “${book.title}” from the collection.`);
  } else {
    return;
  }

  renderBooks();
});

document.querySelector("#clearAll").addEventListener("click", () => {
  if (!library.length || !window.confirm("Clear every book from this in-memory collection?")) return;
  clearLibrary();
  resetForm();
  showFormMessage("The collection is empty. Reload the page to restore the sample books.");
  renderBooks();
});
