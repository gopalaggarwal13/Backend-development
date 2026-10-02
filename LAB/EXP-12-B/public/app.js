(() => {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  function syncThemeControl() {
    if (!toggle) return;
    const isDay = body.dataset.theme === "day";
    toggle.innerHTML = isDay ? "🌙 <span>Night mode</span>" : "☀️ <span>Day mode</span>";
    toggle.setAttribute("aria-label", `Switch to ${isDay ? "night" : "day"} theme`);
  }

  if (toggle) {
    syncThemeControl();
    toggle.addEventListener("click", () => {
      const nextTheme = body.dataset.theme === "day" ? "night" : "day";
      body.dataset.theme = nextTheme;
      document.cookie = `todo-theme=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
      syncThemeControl();
    });
  }
})();
