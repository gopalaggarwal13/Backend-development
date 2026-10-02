import {
  library,
  addBook,
  findBook,
  removeBook,
  updateBook,
  toggleBookStatus
} from "./library.js";

console.log(`Initial collection: ${library.length} course-aligned titles`);

const addedBook = addBook(
  "The C Programming Language",
  "Brian W. Kernighan and Dennis M. Ritchie",
  "Data Structures and Algorithms"
);
console.log("addBook:", addedBook);
console.log("findBook:", findBook("Database System Concepts"));

const addedIndex = library.indexOf(addedBook);
updateBook(
  addedIndex,
  "The C Programming Language (Revised Record)",
  "Brian W. Kernighan and Dennis M. Ritchie",
  "Data Structures and Algorithms"
);
console.log("updateBook:", library[addedIndex]);

toggleBookStatus(addedIndex);
console.log("toggleBookStatus:", library[addedIndex].status);

removeBook(addedIndex);
console.log(`removeBook: ${library.length} titles remain`);
console.log("All library functions were called successfully.");
