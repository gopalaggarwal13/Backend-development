export const courseCatalog = [
  { name: "Data Structures and Algorithms", semester: 2 },
  { name: "Computer Organization and Architecture", semester: 2 },
  { name: "Database Management Systems", semester: 3 },
  { name: "Discrete Mathematical Structures", semester: 3 },
  { name: "Object-Oriented Programming", semester: 3 },
  { name: "Operating Systems", semester: 3 },
  { name: "Software Engineering", semester: 3 },
  { name: "Artificial Intelligence and Machine Learning", semester: 4 },
  { name: "Data Communication and Networks", semester: 4 },
  { name: "Design and Analysis of Algorithms", semester: 4 },
  { name: "Cryptography and Network Security", semester: 5 },
  { name: "Formal Languages and Automata Theory", semester: 5 }
];

const semesterFor = course => courseCatalog.find(item => item.name === course)?.semester ?? null;

const initialBooks = [
  {
    title: "Data Structures and Algorithm Analysis in C++",
    author: "Mark Allen Weiss",
    course: "Data Structures and Algorithms",
    status: "available"
  },
  {
    title: "Computer Organization and Design",
    author: "David A. Patterson and John L. Hennessy",
    course: "Computer Organization and Architecture",
    status: "available"
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, and S. Sudarshan",
    course: "Database Management Systems",
    status: "issued"
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    course: "Discrete Mathematical Structures",
    status: "available"
  },
  {
    title: "Effective Java",
    author: "Joshua Bloch",
    course: "Object-Oriented Programming",
    status: "available"
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, and Greg Gagne",
    course: "Operating Systems",
    status: "available"
  },
  {
    title: "Software Engineering",
    author: "Ian Sommerville",
    course: "Software Engineering",
    status: "available"
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell and Peter Norvig",
    course: "Artificial Intelligence and Machine Learning",
    status: "issued"
  },
  {
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose and Keith W. Ross",
    course: "Data Communication and Networks",
    status: "available"
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
    course: "Design and Analysis of Algorithms",
    status: "available"
  },
  {
    title: "Cryptography and Network Security: Principles and Practice",
    author: "William Stallings",
    course: "Cryptography and Network Security",
    status: "available"
  },
  {
    title: "Introduction to Automata Theory, Languages, and Computation",
    author: "John E. Hopcroft, Rajeev Motwani, and Jeffrey D. Ullman",
    course: "Formal Languages and Automata Theory",
    status: "available"
  }
];

export const library = initialBooks.map(book => ({
  ...book,
  semester: semesterFor(book.course)
}));

export function addBook(title, author, course = courseCatalog[0].name) {
  const book = {
    title: title.trim(),
    author: author.trim(),
    course,
    semester: semesterFor(course),
    status: "available"
  };

  library.push(book);
  return book;
}

export function findBook(title) {
  const query = title.trim().toLowerCase();
  return library.find(book => book.title.toLowerCase() === query);
}

export function removeBook(index) {
  if (index >= 0 && index < library.length) {
    return library.splice(index, 1)[0];
  }

  return null;
}

export function updateBook(index, title, author, course = library[index]?.course) {
  if (index >= 0 && index < library.length) {
    library[index] = {
      ...library[index],
      title: title.trim(),
      author: author.trim(),
      course,
      semester: semesterFor(course)
    };
    return library[index];
  }

  return null;
}

export function toggleBookStatus(index) {
  if (index >= 0 && index < library.length) {
    library[index].status = library[index].status === "available" ? "issued" : "available";
    return library[index];
  }

  return null;
}

export function clearLibrary() {
  library.length = 0;
}
