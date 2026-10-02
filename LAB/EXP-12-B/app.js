const express = require("express");
const session = require("express-session");
const { promisify } = require("node:util");
const { randomBytes, randomUUID, scrypt, timingSafeEqual } = require("node:crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
const scryptAsync = promisify(scrypt);
const users = new Map();
const sessionStore = new session.MemoryStore();
const sessionDeadlines = new Map();
const SESSION_IDLE_LIMIT = 30 * 60 * 1000;
const categories = ["study", "life", "work", "wellness"];
const priorities = ["low", "medium", "high"];

if (isProduction && !process.env.SESSION_SECRET) {
  throw new Error("Set SESSION_SECRET before starting the app in production.");
}

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(session({
  name: "exp12b.sid",
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction
  }
}));

const sessionCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [sessionId, deadline] of sessionDeadlines) {
    if (deadline <= now) {
      sessionDeadlines.delete(sessionId);
      sessionStore.destroy(sessionId, () => {});
    }
  }
}, 60_000);
sessionCleanupTimer.unref();

app.use(express.static(`${__dirname}/public`));

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return "";
  const entry = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  if (!entry) return "";
  try {
    return decodeURIComponent(entry.slice(name.length + 1));
  } catch {
    return "";
  }
}

app.use((req, res, next) => {
  const requestedTheme = readCookie(req.headers.cookie, "todo-theme");
  res.locals.theme = requestedTheme === "day" ? "day" : "night";
  next();
});

function consumeFlash(req) {
  const flash = req.session.flash || null;
  delete req.session.flash;
  return flash;
}

function setFlash(req, kind, message) {
  req.session.flash = { kind, message };
}

function renderLogin(res, { error = "", username = "", successMessage = "" } = {}) {
  res.status(error ? 400 : 200).render("login", { error, username, successMessage });
}

function isAuthenticated(req) {
  return Boolean(req.session?.user && req.session.expiresAt > Date.now());
}

function requireLogin(req, res, next) {
  if (!req.session?.user) return res.redirect("/login");
  if (req.session.expiresAt <= Date.now()) {
    sessionDeadlines.delete(req.sessionID);
    return req.session.destroy(() => {
      res.clearCookie("exp12b.sid", { httpOnly: true, sameSite: "lax", secure: isProduction });
      res.redirect("/login?expired=1");
    });
  }

  req.session.expiresAt = Date.now() + SESSION_IDLE_LIMIT;
  sessionDeadlines.set(req.sessionID, req.session.expiresAt);
  next();
}

app.get("/", (req, res) => {
  res.redirect(isAuthenticated(req) ? "/dashboard" : "/login");
});

app.get("/register", (req, res) => {
  if (isAuthenticated(req)) return res.redirect("/dashboard");
  res.render("register", { error: "", username: "" });
});

app.post("/register", async (req, res, next) => {
  try {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    const normalizedUsername = username.toLowerCase();

    if (!/^[A-Za-z0-9._-]{3,32}$/.test(username)) {
      return res.status(400).render("register", {
        error: "Choose a username with 3–32 letters, numbers, dots, underscores or hyphens.",
        username
      });
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).render("register", {
        error: "Your password must be between 8 and 128 characters.",
        username
      });
    }
    if (users.has(normalizedUsername)) {
      return res.status(409).render("register", { error: "That username is already taken. Try another one.", username });
    }

    const salt = randomBytes(16).toString("hex");
    const passwordHash = await scryptAsync(password, salt, 64);
    users.set(normalizedUsername, { username, salt, passwordHash: Buffer.from(passwordHash) });
    res.redirect("/login?registered=1");
  } catch (error) {
    next(error);
  }
});

app.get("/login", (req, res) => {
  if (isAuthenticated(req)) return res.redirect("/dashboard");
  let successMessage = "";
  if (req.query.registered === "1") successMessage = "Account created. Sign in to start your session.";
  if (req.query.expired === "1") successMessage = "Your session expired. Sign in again to continue.";
  if (req.query.logout === "1") successMessage = "You’re logged out. Your session has been cleared.";
  renderLogin(res, { successMessage });
});

app.post("/login", async (req, res, next) => {
  try {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    const account = users.get(username.toLowerCase());

    if (!account || password.length > 128) {
      return renderLogin(res, { error: "Username or password is incorrect.", username });
    }

    const submittedHash = Buffer.from(await scryptAsync(password, account.salt, 64));
    if (submittedHash.length !== account.passwordHash.length || !timingSafeEqual(submittedHash, account.passwordHash)) {
      return renderLogin(res, { error: "Username or password is incorrect.", username });
    }

    req.session.regenerate((error) => {
      if (error) return next(error);
      req.session.user = { username: account.username };
      req.session.todos = [];
      req.session.expiresAt = Date.now() + SESSION_IDLE_LIMIT;
      sessionDeadlines.set(req.sessionID, req.session.expiresAt);
      req.session.save((saveError) => {
        if (saveError) {
          sessionDeadlines.delete(req.sessionID);
          return next(saveError);
        }
        res.redirect("/dashboard");
      });
    });
  } catch (error) {
    next(error);
  }
});

app.get("/dashboard", requireLogin, (req, res) => {
  const todos = req.session.todos || [];
  const selectedFilter = ["all", "active", "done"].includes(req.query.filter) ? req.query.filter : "all";
  const selectedCategory = categories.includes(req.query.category) ? req.query.category : "all";
  const visibleTodos = todos.filter((todo) => {
    const matchesState = selectedFilter === "all"
      || (selectedFilter === "active" && !todo.completed)
      || (selectedFilter === "done" && todo.completed);
    const matchesCategory = selectedCategory === "all" || todo.category === selectedCategory;
    return matchesState && matchesCategory;
  });
  const completedCount = todos.filter((todo) => todo.completed).length;

  res.render("dashboard", {
    username: req.session.user.username,
    todos,
    visibleTodos,
    categories,
    selectedFilter,
    selectedCategory,
    completedCount,
    progressPercent: todos.length ? Math.round((completedCount / todos.length) * 100) : 0,
    flash: consumeFlash(req)
  });
});

app.post("/todos", requireLogin, (req, res) => {
  const text = typeof req.body.todoItem === "string" ? req.body.todoItem.trim() : "";
  const category = categories.includes(req.body.category) ? req.body.category : "study";
  const priority = priorities.includes(req.body.priority) ? req.body.priority : "medium";

  if (!text || text.length > 160) {
    setFlash(req, "error", "Add a task between 1 and 160 characters long.");
    return res.redirect("/dashboard");
  }

  req.session.todos ||= [];
  req.session.todos.unshift({ id: randomUUID(), text, category, priority, completed: false });
  setFlash(req, "success", "Task added. Tiny step, big main-character energy.");
  res.redirect("/dashboard");
});

app.post("/todos/complete/:id", requireLogin, (req, res) => {
  const todo = (req.session.todos || []).find((item) => item.id === req.params.id);
  if (todo) todo.completed = !todo.completed;
  res.redirect("/dashboard");
});

app.post("/todos/delete/:id", requireLogin, (req, res) => {
  req.session.todos = (req.session.todos || []).filter((todo) => todo.id !== req.params.id);
  setFlash(req, "success", "Task removed. Making room for your next win.");
  res.redirect("/dashboard");
});

app.post("/logout", requireLogin, (req, res, next) => {
  sessionDeadlines.delete(req.sessionID);
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("exp12b.sid", { httpOnly: true, sameSite: "lax", secure: isProduction });
    res.redirect("/login?logout=1");
  });
});

app.use((req, res) => {
  res.status(404).send("Page not found. <a href='/'>Go to your home page</a>.");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something went wrong. Please try again.");
});

app.listen(PORT, () => {
  console.log(`Experiment 12-B is running at http://localhost:${PORT}`);
});
