---
title: "Experiment 4 — Create responsive web pages with Bootstrap and Tailwind CSS"
layout: default
---

# Experiment 04 — Responsive Web Pages with Bootstrap and Tailwind CSS

**Course:** Backend Development Lab  
**Course Outcome Mapped:** CO2 — Create and build web pages and applications  
**Student:** Gopal Aggarwal · B.Tech CSE · SAP ID 590018885 · UPES Dehradun  
**Date:** 1 October 2026

**Assessment overview:** [`index.html`](./index.html) · **Bootstrap page:** [`bootstrap.html`](./bootstrap.html) · **Tailwind page:** [`tailwind.html`](./tailwind.html)

---

## 1. Aim

To build the same responsive page using two CSS frameworks — Bootstrap and Tailwind CSS — and understand their philosophies, common classes and trade-offs. Each implementation presents a responsive masthead, navigation, four feature cards, an approach section, a code example and an assessment observation. The overview page links both implementations and summarizes their differences.

## 2. Objectives

After completing this assessment, I am able to:

1. Build a responsive page using Bootstrap's grid, components and utility classes.
2. Recreate the page using Tailwind CSS utility classes and responsive variants.
3. Identify common classes used for grids, spacing, typography, colors and display.
4. Explain the difference between Bootstrap's component-based conventions and Tailwind's utility-first approach.
5. Compare how both frameworks handle breakpoints, customization and repeated interface patterns.
6. Describe practical trade-offs in markup length, consistency, speed and design control.
7. Use semantic HTML, keyboard focus styling and responsive navigation patterns.
8. Respect reduced-motion preferences when transitions are present.

## 3. Tools and environment

| Item | Detail |
|---|---|
| Editor | Visual Studio Code |
| Browser | A modern browser with HTML5 and CSS support |
| Languages | HTML5 and CSS3 |
| Bootstrap page | `bootstrap.html`, using the Bootstrap 5.3.8 CDN |
| Tailwind page | `tailwind.html`, using the Tailwind Browser CDN |
| Overview | `index.html` |
| Report | `README.md` |
| Build tools | None required for this demonstration |

Open `index.html` directly in a browser, then follow the links to each implementation. An internet connection is required to load Bootstrap and Tailwind from their CDNs. The Tailwind Browser CDN is intended for learning and development demonstrations.

---

## 4. Theory

### 4.1 CSS frameworks

A CSS framework provides reusable styling conventions and layout tools that help developers build interfaces. Frameworks can include a grid system, responsive utilities, components, design tokens and interaction styles. They reduce the amount of low-level CSS needed for common page patterns, while still leaving choices about markup, customization and project structure.

This assessment builds one page concept in two frameworks. Shared content makes it easier to compare how each approach expresses layout and styling. The assessment overview also presents the frameworks' philosophies and trade-offs side by side.

### 4.2 Bootstrap's component and grid approach

Bootstrap provides a responsive grid built around containers, rows and columns. A page can use familiar classes such as `.container-fluid`, `.row`, `.col-md-6` and `.col-lg-3` to define how content is arranged at framework breakpoints. Gutters add consistent space between columns.

Bootstrap also provides ready-to-use interface patterns, including navbars, buttons, cards and list groups. These conventions make a common interface quick to assemble and help maintain consistency. The implementation adds a small layer of custom CSS for the shared lab palette and typography, while Bootstrap classes continue to control the main structure and responsive grid.

### 4.3 Tailwind's utility-first approach

Tailwind provides small utility classes that are combined directly on HTML elements. Classes such as `grid`, `gap-4`, `p-5`, `font-bold` and `text-[#282820]` express layout and appearance in the markup. The Tailwind page composes its masthead, cards, code sample and footer from these utilities rather than relying on a predefined card or navbar component.

Responsive variants such as `sm:` and `lg:` apply utilities at and above their breakpoints. The page uses an unprefixed single-column card layout for narrow screens, then adds two columns with `sm:grid-cols-2` and four columns with `lg:grid-cols-4`. State and preference variants can also be used for hover, keyboard focus and reduced motion.

### 4.4 Comparing the approaches

The main difference is where the design decisions appear. Bootstrap organizes common page patterns through components and a structured grid. Tailwind exposes more of the individual style decisions as utilities on each element.

| Consideration | Bootstrap | Tailwind CSS |
|---|---|---|
| Main approach | Components, grid conventions and utilities | Composable utility classes |
| Typical layout classes | `.container`, `.row`, `.col-lg-3` | `grid`, `grid-cols-1`, `lg:grid-cols-4` |
| Repeated patterns | Prebuilt component classes provide a starting point | Utility groups can be repeated or extracted into project components |
| Customization | Theme variables and custom CSS can adjust framework defaults | Utilities and theme configuration can specify detailed styles |
| Common trade-off | Fast, consistent defaults; distinctive designs may need overrides | Direct control; long class attributes can make markup dense |

Neither approach is universally better. The fit depends on the project's design system, team preferences, component reuse and how much control is needed over each element.

### 4.5 Responsive design

Responsive design adapts a page to the available viewport. Both implementations start with a narrow-screen layout and add columns as more space becomes available. Bootstrap uses its breakpoint-aware grid classes, while Tailwind uses responsive variants on utilities. The number of feature cards changes from one column on a phone to two and then four columns on larger screens.

The shared viewport declaration is:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This helps mobile browsers size the layout using the device viewport. Both versions also allow their navigation links to fit or wrap and keep code samples inside horizontally scrollable regions when needed.

---

## 5. Implementation

### 5.1 Assessment page set

The experiment contains three HTML pages:

1. `index.html` introduces the assessment, states the objective, links to both versions and provides a comparison table.
2. `bootstrap.html` builds the responsive interface using Bootstrap's grid, navbar, button, card and list group classes.
3. `tailwind.html` builds the corresponding interface using Tailwind utilities and responsive variants.

The pages share the warm paper, dark ink, rust and sage visual theme used in the lab experiments, with sage emphasized on the Bootstrap version and rust on the Tailwind version. This gives the framework comparison a distinct visual cue while keeping it part of the same lab series. Each page displays **Gopal Aggarwal · SAP ID 590018885** in its masthead or byline, experiment tag and footer.

### 5.2 Bootstrap grid and components

The Bootstrap page arranges its four feature cards with responsive column classes:

```html
<div class="row g-3 g-lg-4">
  <div class="col-md-6 col-lg-3">
    <article class="feature-card card h-100 p-4">
      <h3 class="h5">Grid</h3>
    </article>
  </div>
</div>
```

The `col-md-6` class gives each card half of the row at the medium breakpoint and above; `col-lg-3` places four equal cards across at the large breakpoint and above. The page also uses Bootstrap navbar and collapse classes so navigation can expand and collapse at the large breakpoint. The Bootstrap JavaScript bundle supplies the collapse interaction.

### 5.3 Tailwind utility classes

The Tailwind implementation builds its card grid from utility classes:

```html
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <article class="border border-[#d8cfbf] bg-[#fffdf8] p-5">
    <h3 class="font-bold">Utilities</h3>
  </article>
</div>
```

The base `grid-cols-1` rule is used on narrow screens. The `sm:` and `lg:` variants add columns as the viewport grows. Other classes define card borders, padding, colors, typography, hover feedback and focus outlines directly in the markup.

### 5.4 Framework delivery

Bootstrap CSS and its JavaScript bundle are loaded from jsDelivr with integrity attributes. Tailwind is loaded using its Browser CDN script so the page can run without a local build step. CDN delivery keeps the exercise simple to open, but both implementations require a network connection to load the framework assets. For a production project, use a build-based setup and review the framework's current deployment recommendations.

### 5.5 Accessibility and interaction

The pages use semantic landmarks, descriptive page titles and section headings. Navigation controls have accessible names, and the Bootstrap toggle includes the attributes that identify its controlled menu. Links have visible keyboard focus styles. The framework pages include reduced-motion handling for their transitions, and the comparison table is placed in a focusable horizontally scrollable region for narrow displays.

---

## 6. Procedure

1. Create the `EXP-4` folder and add the overview, Bootstrap and Tailwind HTML pages.
2. Define one shared responsive page concept with a masthead, feature cards, approach section and footer.
3. Build the assessment overview with links to both implementations and a comparison table.
4. Recreate the page structure using Bootstrap's grid, navbar and other reusable classes.
5. Recreate the same core structure using Tailwind utility classes and responsive variants.
6. Apply the shared lab theme while keeping each framework responsible for its layout approach.
7. Add the student name and SAP ID to the overview and both implementation pages.
8. Include keyboard focus styling, responsive navigation and reduced-motion support.
9. Document the implementation, framework trade-offs and observations in this README.

---

## 7. Output and observations

The completed assessment includes:

- An overview page with the assessment objective and links to both implementations.
- A comparison table describing framework style, markup, responsiveness and trade-offs.
- A Bootstrap page using grid columns, a responsive navbar, cards and utility classes.
- A Tailwind page using utility-first markup and responsive variants.
- A consistent visual theme and student identification across the three pages.
- Responsive feature layouts, keyboard focus styling and reduced-motion handling.

### Observations

1. Bootstrap's grid and reusable components provide a structured starting point for common interface patterns.
2. Tailwind's utilities let each element's spacing, color, typography and layout be specified close to its markup.
3. Both frameworks can express responsive one-, two- and four-column card layouts.
4. Bootstrap's class names can make component intent easy to recognize, while framework defaults may need overrides for a distinctive design.
5. Tailwind provides fine-grained styling control, while utility lists can make HTML class attributes longer.
6. A shared content structure makes it possible to compare frameworks without changing the assessment subject.
7. Framework choice should reflect the team's workflow, reuse needs and desired balance between convention and control.

---

## 8. Viva questions and answers

**Q1. What is the objective of this assessment?**  
To build the same responsive page with Bootstrap and Tailwind CSS and compare their philosophies, common classes and trade-offs.

**Q2. What is Bootstrap?**  
Bootstrap is a front-end toolkit with a responsive grid, reusable interface components and utility classes.

**Q3. What is Tailwind CSS?**  
Tailwind is a utility-first CSS framework that styles interfaces by composing small classes in the markup.

**Q4. What does Bootstrap's `container`, `row`, and `col` pattern do?**  
It organizes content into a centered or fluid container, rows, and responsive columns.

**Q5. What does `col-lg-3` mean in the Bootstrap page?**  
It makes an element span three of the twelve grid columns at the large breakpoint and above.

**Q6. What does the `lg:` prefix do in Tailwind?**  
It applies the following utility at the large breakpoint and above.

**Q7. What is one advantage of Bootstrap?**  
Its conventions and components can make familiar interface patterns quick to assemble consistently.

**Q8. What is one advantage of Tailwind?**  
Its utilities give direct control over individual styles without requiring a custom component stylesheet for each pattern.

**Q9. What is a trade-off of utility-first styling?**  
Class attributes can become long, so repeated patterns may benefit from component extraction or shared conventions.

**Q10. Why are responsive classes useful?**  
They let the layout change at different viewport widths without requiring separate page files.

**Q11. Why is the Tailwind page loaded from a Browser CDN?**  
It allows the demonstration to run without configuring a local build step; it is intended for learning and development use.

**Q12. Why add an integrity attribute to Bootstrap's CDN links?**  
It lets the browser verify that a downloaded CDN resource matches its expected content.

---

## 9. Result

The responsive assessment page has been implemented using Bootstrap and Tailwind CSS. The overview and implementation pages demonstrate each framework's layout approach and common responsive classes while retaining the same main content structure.

## 10. Conclusion

This experiment compares two ways to create responsive interfaces. Bootstrap provides a structured grid and ready-made components, while Tailwind composes designs from utility classes. Building a parallel page with both frameworks makes their conventions and trade-offs easier to examine. The choice between them depends on the project and team rather than one framework being best for every situation.

## 11. References

1. Bootstrap — [Grid system](https://getbootstrap.com/docs/5.3/layout/grid/)
2. Bootstrap — [Navbar component](https://getbootstrap.com/docs/5.3/components/navbar/)
3. Bootstrap — [Getting started and CDN setup](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
4. Tailwind CSS — [Responsive design](https://tailwindcss.com/docs/responsive-design)
5. Tailwind CSS — [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
6. Tailwind CSS — [Play CDN](https://tailwindcss.com/docs/installation/play-cdn)

---

[← Back to repository index](../../readme.md)
