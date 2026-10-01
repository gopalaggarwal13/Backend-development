---
title: "Experiment 3 — Design and build a responsive web page"
layout: default
---

# Experiment 3 — Responsive Web Page

**Course:** Backend Development Lab  
**Course Outcome Mapped:** CO2 — Create and build web pages and applications  
**Student:** Gopal Aggarwal · B.Tech CSE · SAP ID 590018885 · UPES Dehradun  
**Date:** 1 October 2026

**Page:** [`index.html`](./index.html) · **Stylesheet:** [`style.css`](./style.css)

---

## 1. Aim

To design and build a responsive web page using semantic HTML and CSS. The page demonstrates how a shared visual design can adapt to desktop, tablet and mobile viewports with fluid sizing, CSS Grid, Flexbox and media queries. It presents the main responsive design concepts through a student masthead, a device illustration, feature cards and a compact CSS example.

## 2. Objectives

After completing this experiment, I am able to:

1. Structure a page with semantic HTML landmarks and meaningful section headings.
2. Explain how responsive design accommodates different viewport sizes.
3. Use CSS Grid to arrange a masthead, feature cards and explanatory content.
4. Use Flexbox to align and wrap navigation, device details and footer content.
5. Apply media queries to adjust spacing, columns and component layouts.
6. Use fluid values and `clamp()` to scale the page within defined limits.
7. Add visible focus states and respect a visitor's reduced-motion preference.
8. Keep the page usable without a CSS framework or JavaScript.

## 3. Tools and environment

| Item | Detail |
|---|---|
| Editor | Visual Studio Code |
| Browser | A modern browser with HTML5 and CSS support |
| Languages | HTML5 and CSS3 |
| Page | `index.html` |
| Stylesheet | `style.css` |
| Report | `README.md` |
| Frameworks | None |

Open `index.html` directly in a browser to view the page. A local server can also be started from the `EXP-3` folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

---

## 4. Theory

### 4.1 Responsive web design

Responsive web design is an approach to building pages that remain understandable and usable across a range of screen sizes. Rather than assuming a fixed desktop canvas, a responsive page lets its content and layout adapt to the available space. This experiment uses a constrained sheet on wide screens, then changes its columns and spacing as the viewport narrows.

Responsive design combines flexible layouts, adaptable content and media queries. CSS Grid and Flexbox provide layout behavior that can already respond to available space; media queries add targeted changes where a different arrangement improves readability.

### 4.2 Viewport and fluid sizing

The document includes the viewport declaration:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tells mobile browsers to use the device's CSS viewport width instead of laying out the page on a wider virtual canvas. The stylesheet also uses `min()`, `clamp()` and flexible grid tracks. For example, the sheet has a maximum width while its padding grows within a range. Headings use `clamp()` so they scale with the viewport but stay within readable minimum and maximum sizes.

### 4.3 CSS Grid and Flexbox

CSS Grid arranges content in two dimensions: rows and columns. The masthead and feature gallery use Grid because each layout needs coordinated columns. The feature cards begin in four columns on a wide screen, move to two columns at a narrower width, and stack into one column on a small phone.

Flexbox is useful for arranging items along a single axis. The navigation uses a wrapping flex row so its links can move onto additional lines instead of overflowing. The footer and result panel also use Flexbox to distribute content on wider screens and stack it when space becomes limited.

### 4.4 Media queries and breakpoints

A media query applies CSS when a condition, such as viewport width or a user preference, matches. Breakpoints in this page are chosen to change the layout when its content needs more room:

| Condition | Layout adjustment |
|---|---|
| 900 px and below | Feature cards change from four columns to two |
| 700 px and below | Masthead and approach content stack; page padding reduces |
| 520 px and below | Feature cards become a compact single-column list; result and footer stack |
| 360 px and below | Navigation, illustration and code sample use tighter sizing |
| Reduced motion preference | Smooth scrolling and transitions are shortened or disabled |

The feature gallery's column changes are defined with these rules:

```css
@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .feature-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

### 4.5 Semantic structure and accessibility

The page uses `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>` to identify its major regions. Section links point to matching IDs, and each main section has a heading. The device illustration is decorative, so it is hidden from assistive technology; the experiment tag has a descriptive label. Keyboard focus is made visible on links. The reduced-motion media query responds to a system preference so motion is not required to understand the page.

---

## 5. Implementation

### 5.1 Page structure

The masthead introduces the experiment, identifies the student and provides navigation to the page sections. A CSS-built desktop and phone illustration previews how a responsive composition can change across devices. The main content contains four core concept cards, an explanation of the layout approach and an experiment observation. The footer repeats the student name and SAP ID.

### 5.2 External stylesheet

The page links its external stylesheet from the document head:

```html
<link rel="stylesheet" href="style.css">
```

The stylesheet defines shared color and font tokens, applies `box-sizing: border-box`, and sets the page's backgrounds, typography, focus styles, cards and responsive rules. The visual palette follows the warm paper, dark ink, rust and sage colors used in the other lab experiments.

### 5.3 Grid-based page layout

The masthead places the experiment text beside the device illustration on wide screens. The feature gallery uses four equal columns at desktop size. The approach section places its explanation beside a CSS code sample:

```css
.approach-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
}
```

At 700 pixels and below, the approach section changes to a single column. The masthead also stacks its text and device artwork to preserve a readable order.

### 5.4 Flexible components

The navigation is a flex container with wrapping enabled. This lets links use multiple rows when the available width is limited. The result panel aligns its summary and return link across a wide row, then changes to a vertical stack at the smallest card breakpoint. The footer follows the same pattern for student, course and navigation details.

### 5.5 Reduced motion

The page includes a preference rule for visitors who request reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

This keeps the design's layout and content available while reducing animated movement.

---

## 6. Procedure

1. Create the `EXP-3` folder and add `index.html`, `style.css` and this README.
2. Add the document metadata, viewport declaration and link to the external stylesheet.
3. Build the semantic masthead, section navigation, main content and footer.
4. Add the experiment title, student details and CSS device illustration.
5. Create the feature cards and approach section using CSS Grid.
6. Use Flexbox for navigation, card actions and footer alignment.
7. Add media queries to adjust the page at tablet and phone widths.
8. Include visible focus states and support for reduced-motion preferences.
9. Document the page structure, responsive rules and observations in this file.

---

## 7. Output and observations

The completed page presents responsive design as a small specimen sheet. It includes:

- A student masthead with links to the experiment sections.
- A decorative desktop and phone preview created with CSS.
- Four cards describing semantic HTML, flexible layouts, CSS Grid and media queries.
- A responsive approach section with an example media query.
- An experiment observation panel and student details in the footer.
- Layout changes for wide, medium, narrow and very narrow viewports.
- A reduced-motion preference rule and visible keyboard focus styling.

### Observations

1. Grid is suitable when multiple rows and columns need to stay aligned.
2. Flexbox is useful for one-dimensional groups such as navigation and footer items.
3. A wrapping navigation row can remain available without forcing its links onto one line.
4. Media queries allow major layout changes when a multi-column design becomes cramped.
5. Fluid values help padding and type scale gradually between breakpoints.
6. Semantic landmarks and visible focus styles support keyboard and assistive technology use.
7. A reduced-motion rule preserves the layout while minimizing animated transitions.

---

## 8. Viva questions and answers

**Q1. What is responsive web design?**  
It is an approach to building pages that adapt their layout and presentation to the available screen and viewport size.

**Q2. What does the viewport meta element do?**  
It tells a mobile browser to use the device width as the page's layout viewport and sets the initial zoom scale.

**Q3. What is CSS Grid used for in this page?**  
Grid arranges the masthead, feature cards and approach content in coordinated rows and columns.

**Q4. What is Flexbox used for?**  
Flexbox aligns items along one axis and allows groups such as navigation links to wrap when needed.

**Q5. What is a media query?**  
A media query conditionally applies CSS based on features such as viewport width or a user preference.

**Q6. Why are breakpoints used?**  
Breakpoints let the layout change when its current arrangement no longer fits comfortably.

**Q7. Why use `minmax(0, 1fr)` in a grid?**  
It defines a flexible track that can shrink to zero instead of forcing content to make the grid wider than its container.

**Q8. What is the purpose of `clamp()`?**  
It lets a CSS value scale fluidly between a minimum and maximum limit.

**Q9. How does the page support keyboard users?**  
Its links are reachable by keyboard, and `:focus-visible` gives focused links a clear outline.

**Q10. What does `prefers-reduced-motion` detect?**  
It detects a system-level request to reduce motion and lets the page adjust transitions or scrolling accordingly.

**Q11. Why use semantic HTML landmarks?**  
Landmarks give browsers and assistive technologies meaningful regions that help people navigate the page.

---

## 9. Result

The responsive web page demonstrates a semantic HTML structure with CSS Grid, Flexbox, fluid sizing and media queries. It includes student identification, navigation, a responsive feature gallery, an explanatory code sample and reduced-motion support.

## 10. Conclusion

This experiment shows how layout systems and media queries can adapt a page to different viewport widths. Grid arranges the major content areas, while Flexbox handles smaller groups that need alignment and wrapping. Fluid sizing, semantic structure, visible focus and reduced-motion support contribute to a page that remains easier to use across screen sizes and input preferences.

## 11. References

1. MDN Web Docs — [Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
2. MDN Web Docs — [CSS Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)
3. MDN Web Docs — [CSS flexible box layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout)
4. MDN Web Docs — [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)
5. MDN Web Docs — [ARIA landmarks](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role)

---

[← Back to repository index](../../readme.md)
