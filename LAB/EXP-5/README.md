---
title: "Experiment 5 — JavaScript arrays, objects and functions"
layout: default
---

# Experiment 5 — CSE Library Manager

**Course:** Backend Development Lab  
**Course Outcome Mapped:** CO2 — Create and build web pages and applications  
**Student:** Gopal Aggarwal · B.Tech CSE · SAP ID 590018885 · UPES Dehradun  
**Date:** 2 October 2026

**Page:** [`index.html`](./index.html) · **Stylesheet:** [`style.css`](./style.css) · **Application logic:** [`app.js`](./app.js) · **Library data and functions:** [`library.js`](./library.js)

---

## 1. Aim

To demonstrate JavaScript arrays, objects, functions and ES modules by creating a responsive library manager. The application stores book records, relates each title to a Computer Science course, and supports searching, filtering and collection updates.

## 2. Objectives

After completing this experiment, I am able to:

1. Store a collection of records in a JavaScript array.
2. Represent each book as an object with title, author, course, semester and availability fields.
3. Write reusable functions to add, find, update, remove, issue and return books.
4. Use array methods to calculate collection totals and filter visible books.
5. Import data and functions from an ES module into a browser application.
6. Update page content from JavaScript and respond to form, search and button events.
7. Escape user-entered text before inserting it into generated HTML.
8. Build a responsive interface with visible keyboard focus and reduced-motion support.

---

## 3. Tools and environment

| Item | Detail |
|---|---|
| Editor | Visual Studio Code |
| Runtime | JavaScript in a modern browser; Node.js for the function walkthrough |
| Languages | HTML5, CSS3 and JavaScript |
| Page | `index.html` |
| Stylesheet | `style.css` |
| Application logic | `app.js` |
| Data and collection functions | `library.js` |
| Function walkthrough | `test.js` |

The page uses JavaScript ES modules, so serve the folder locally instead of opening `index.html` directly with a `file://` URL. From the `EXP-5` folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. The included function walkthrough can be run separately with Node.js:

```bash
npm run test-functions
```

The collection exists in memory while the page is open. Refreshing the page restores the starter books.

---

## 4. Theory

### 4.1 Arrays and objects

An array stores an ordered collection of values. This application uses the `library` array to hold book records. Each record is an object, which groups related properties together:

```js
{
  title: "Database System Concepts",
  author: "Abraham Silberschatz, Henry F. Korth, and S. Sudarshan",
  course: "Database Management Systems",
  semester: 3,
  status: "issued"
}
```

This shape lets the application display and update a book's details as one record.

### 4.2 Functions and collection operations

Functions give common operations a reusable name. The library module provides `addBook()`, `findBook()`, `updateBook()`, `removeBook()`, `toggleBookStatus()` and `clearLibrary()`. Array methods such as `map()`, `filter()` and `find()` transform, select or locate records without duplicating the same loops throughout the page.

The interface demonstrates create, read, update and delete operations. Issue and return actions update the `status` property on a book object.

### 4.3 Search, filters and derived values

The search field compares a query with each book's title, author and related course. Course and availability filters narrow the same collection. Summary counts are derived from the array, so the totals update after each operation instead of being stored as separate, potentially stale values.

### 4.4 JavaScript modules and page updates

`library.js` exports the sample collection, course catalog and collection functions. `app.js` imports those exports, connects event listeners to the page controls and re-renders the visible collection when data changes. The browser loads `app.js` with `<script type="module">`.

User-entered text is escaped before it is added to generated card markup. Form labels, button names and live status messages provide context for keyboard and assistive-technology users.

### 4.5 Course-aligned starter books

The sample collection contains suggested references for course areas listed in the [UPES B.Tech CSE curriculum](https://www.upes.ac.in/school-of-computer-science/btech-cse). The page maps subjects to semesters as shown on the curriculum page. These titles are study suggestions for the demonstration, not an official UPES prescribed-book list.

| Semester | Course area | Example book |
|---:|---|---|
| 2 | Data Structures and Algorithms | *Data Structures and Algorithm Analysis in C++* — Mark Allen Weiss |
| 2 | Computer Organization and Architecture | *Computer Organization and Design* — David A. Patterson and John L. Hennessy |
| 3 | Database Management Systems | *Database System Concepts* — Abraham Silberschatz, Henry F. Korth, and S. Sudarshan |
| 3 | Discrete Mathematical Structures | *Discrete Mathematics and Its Applications* — Kenneth H. Rosen |
| 3 | Object-Oriented Programming | *Effective Java* — Joshua Bloch |
| 3 | Operating Systems | *Operating System Concepts* — Abraham Silberschatz, Peter B. Galvin, and Greg Gagne |
| 3 | Software Engineering | *Software Engineering* — Ian Sommerville |
| 4 | Artificial Intelligence and Machine Learning | *Artificial Intelligence: A Modern Approach* — Stuart Russell and Peter Norvig |
| 4 | Data Communication and Networks | *Computer Networking: A Top-Down Approach* — James F. Kurose and Keith W. Ross |
| 4 | Design and Analysis of Algorithms | *Introduction to Algorithms* — Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein |
| 5 | Cryptography and Network Security | *Cryptography and Network Security: Principles and Practice* — William Stallings |
| 5 | Formal Languages and Automata Theory | *Introduction to Automata Theory, Languages, and Computation* — John E. Hopcroft, Rajeev Motwani, and Jeffrey D. Ullman |

---

## 5. Implementation

### 5.1 Book data model

Each record contains a title, author, course, semester and availability status. The course catalog associates each course name with a semester. Starter records use these fields, and a new record's semester is derived from the selected course.

### 5.2 Collection functions

| Function | Purpose |
|---|---|
| `addBook(title, author, course)` | Add a book with an available status |
| `findBook(title)` | Find a title without case-sensitive matching |
| `updateBook(index, title, author, course)` | Edit an existing record |
| `toggleBookStatus(index)` | Switch between available and issued |
| `removeBook(index)` | Remove one record |
| `clearLibrary()` | Empty the in-memory collection |

### 5.3 Interface and rendering

The page shows a collection summary, a form for adding or editing a title, and a searchable list. Search checks the title, author and course. Separate selects filter by course and availability. Each book card displays its course and semester alongside the author and status.

### 5.4 Responsive design and accessibility

The stylesheet uses the paper, ink, rust, ochre and sage palette shared by the other lab experiments. CSS Grid arranges the desktop workspace and book cards; media queries stack the panels and actions on smaller screens. Fluid type and spacing use `clamp()`. Controls have visible focus rings, fields have labels, action buttons include book-specific accessible names, and the page honors `prefers-reduced-motion`.

### 5.5 Application state

The sample books are stored in a JavaScript array. Changes made through the page update that array during the current visit. There is no database or browser storage in this experiment, so reload the page to restore the original sample collection.

---

## 6. Procedure

1. Create an array of book objects with title, author, course, semester and status properties.
2. Define reusable functions for adding, finding, updating, removing and changing the status of a book.
3. Export the collection functions from `library.js` and import them into `app.js`.
4. Build a semantic HTML page with a book form, search field, filters, summary and collection list.
5. Use event listeners to connect the form and each collection action to its function.
6. Filter records by search text, course and availability before rendering the list.
7. Add course-aligned sample titles and show their course and semester in the interface.
8. Apply responsive styles, visible focus states and reduced-motion handling.
9. Serve the folder locally, then add, edit, issue, return, search, filter and remove a book.

---

## 7. Output and observations

The completed page opens with a suggested CSE reference collection. It displays total, available and issued counts; lets a user search titles, authors and courses; and supports course and availability filters. A user can add, edit, issue, return or delete books. The layout adapts to tablet and phone screens.

### Observations

1. An array of objects keeps a related set of book records together.
2. Functions make collection changes reusable across the interface.
3. Search and filter results can be derived from the original array without changing the records.
4. The course field adds useful context to each title, and the semester follows its selected course.
5. Values shown in summary cards are calculated from the current collection.
6. In-memory changes are temporary and reset when the page is reloaded.

---

## 8. Viva questions and answers

**Q1. What is an array in JavaScript?**  
An ordered collection that can hold multiple values.

**Q2. What is an object?**  
An object groups related data as properties, such as a book's title, author, course and status.

**Q3. What is the purpose of `find()`?**  
It returns the first array element that satisfies a condition, or `undefined` if no element matches.

**Q4. How does the application prevent duplicate book titles?**  
Before adding or saving a title, it searches the library for a case-insensitive exact match.

**Q5. What does an ES module provide?**  
It lets JavaScript files explicitly export and import values and functions.

**Q6. Where are changes stored in this demonstration?**  
In the `library` array in memory. Reloading the page resets it to the starter data.

---

## 9. Result

The JavaScript library manager was created with an array of course-tagged book objects and reusable functions for managing the collection.

## 10. Conclusion

This experiment combines arrays, objects, functions, modules and browser events in a small library application. The course labels connect the demonstration data to CSE study areas, while search and filters make the catalogue easier to explore.

## 11. References

1. [UPES — B.Tech. Computer Science Engineering course overview and curriculum](https://www.upes.ac.in/school-of-computer-science/btech-cse)
2. [MDN Web Docs — JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
3. [MDN Web Docs — JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
4. [MDN Web Docs — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
