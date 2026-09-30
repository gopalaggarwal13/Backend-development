---
title: "Experiment 2 — Create a web page to demonstrate CSS types, selectors, layouts and effects"
layout: default
---

# Experiment 2 — CSS Showcase

**Course:** Backend Development Lab  
**Course Outcome Mapped:** CO2 — Create and build web pages and applications  
**Student:** Gopal Aggarwal · B.Tech CSE · SAP ID 590018885 · UPES Dehradun  
**Date:** 30 September 2026

**Page:** [`index.html`](./index.html) · **Stylesheet:** [`style.css`](./style.css)

---

## 1. Aim

To create a web page that demonstrates inline, internal and external CSS, common selector types, the CSS box model, Flexbox, Grid, responsive design, specificity, inheritance, transitions and animations.

## 2. Objectives

After completing this experiment, I am able to:

1. Apply CSS to HTML using inline, internal and external styles.
2. Use element, class, ID, universal, grouping, descendant and pseudo-class selectors.
3. Describe how content, padding, border and margin make up the CSS box model.
4. Arrange elements with Flexbox and CSS Grid.
5. Use media queries to adapt a layout to different viewport widths.
6. Explain how specificity affects the cascade and how inherited properties pass to child elements.
7. Add visual feedback with CSS transitions and keyframe animations.
8. Respect users' reduced-motion preferences.

## 3. Tools and environment

| Item | Detail |
|---|---|
| Editor | Visual Studio Code |
| Browser | A modern browser with HTML5 and CSS support |
| Languages | HTML and CSS |
| Page | `index.html` |
| Stylesheet | `style.css` |
| Report | `report.md` |

---

## 4. Theory

### 4.1 Cascading Style Sheets

CSS controls how HTML content is presented. It defines typography, colour, spacing, borders, layout and visual effects. When multiple rules apply to the same element, the browser resolves them through the cascade, which accounts for factors such as importance, selector specificity and source order.

### 4.2 Three ways to apply CSS

| Type | Where the rules are written | Example in this experiment |
|---|---|---|
| Inline | On an element's `style` attribute | The highlighted sentence in the CSS Types section |
| Internal | In a `<style>` element in the document head | The `.internal-demo` card rules |
| External | In a separate file connected with `<link>` | The main design in `style.css` |

Inline styles apply directly to one element. Internal styles are kept with one HTML document. An external stylesheet separates presentation from page structure and can be reused across multiple pages.

### 4.3 CSS selectors

A selector identifies the elements to which a CSS rule applies. Examples shown by the page include:

| Selector type | Example | What it targets |
|---|---|---|
| Element | `p` | Paragraph elements |
| Class | `.card` | Elements with the `card` class |
| ID | `#id-selector-demo` | The element with that unique ID |
| Universal | `*` | All elements; used for box sizing |
| Grouping | `h1, h2, h3` | Several heading elements with one rule |
| Descendant | `.descendant-selector p` | Paragraphs inside the selected card |
| Pseudo-class | `.hover-selector:hover` | The card while the pointer is over it |

### 4.4 CSS box model

The box model describes the space occupied by an element in four layers:

1. **Content** — text, images or child elements.
2. **Padding** — space between content and the border.
3. **Border** — the edge around the padding and content.
4. **Margin** — space outside the border, separating neighbouring elements.

The page illustrates the four layers with nested boxes. The stylesheet also applies `box-sizing: border-box` globally, so declared widths include padding and borders.

### 4.5 Flexbox and Grid

Flexbox arranges items along one dimension, either a row or a column. The page's flex demonstration uses `display: flex`, alignment, spacing and wrapping to lay out four tiles.

CSS Grid works with rows and columns. The numbered grid begins with three columns, then changes to two and one column at narrower breakpoints.

### 4.6 Responsive design

Media queries apply CSS when the viewport meets a condition. This page uses three layout ranges:

| Viewport width | Demonstration layout |
|---|---|
| Above 760 px | Three-column cards and grid |
| 521–760 px | Two-column cards and grid |
| 520 px and below | Single-column cards and grid |

The corresponding grid rules are:

```css
@media (max-width: 760px) {
  .grid-demo {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .grid-demo {
    grid-template-columns: 1fr;
  }
}
```

### 4.7 Specificity and inheritance

Specificity determines which selector wins when several rules match the same element. An ID selector normally has greater specificity than a class selector, and a class selector has greater specificity than an element selector.

Inheritance allows some properties set on a parent to pass to its children. Text properties such as `color` and `font-family` commonly inherit; other properties do not unless explicitly assigned.

### 4.8 Transitions, animations and reduced motion

A transition interpolates a property change between states, such as the stamp's movement when hovered. A keyframe animation defines stages of movement for the numbered marker. The `prefers-reduced-motion` media query reduces animation and transition duration for visitors who request less motion in their system settings.

---

## 5. Implementation

### 5.1 Page structure

The document has a masthead, section navigation, a main area with eight experiment sections, and a footer. The masthead and footer identify the student as **Gopal Aggarwal, SAP ID 590018885**. The student details also appear in the accession label.

### 5.2 Connecting the external stylesheet

The HTML head links the main stylesheet:

```html
<link rel="stylesheet" href="style.css">
```

### 5.3 Inline CSS

The first card demonstrates an inline declaration:

```html
<p style="color: var(--rust-deep); font-weight: 700; letter-spacing: 0.04em;">
  This sentence is styled with an inline style attribute.
</p>
```

### 5.4 Internal CSS

The document head contains a short rule for the Internal CSS card:

```html
<style>
  .internal-demo {
    border-left: 4px solid var(--rust);
    background: rgba(164, 67, 43, 0.08);
  }

  .internal-demo strong {
    color: var(--rust-deep);
  }
</style>
```

### 5.5 Flexbox and Grid

The Flexbox sample uses the following layout properties:

```css
.flex-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
```

The Grid demonstration starts with three equal columns:

```css
.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
```

Media queries adapt the grid for tablets and phones.

### 5.6 Transition and animation

The stamp lifts and rotates on hover using a transition. The marker moves along its track with the `drift` keyframes. Both effects have reduced-motion handling.

---

## 6. Procedure

1. Create the `EXP-2` folder and add `index.html`, `style.css` and `report.md`.
2. Build the page structure and add navigation links to the experiment sections.
3. Add a small inline-style example and an internal stylesheet rule.
4. Create the external stylesheet with the shared colours, typography and page layout.
5. Add examples for selector types and the box model.
6. Build the Flexbox and Grid demonstrations.
7. Add media queries for tablet and phone widths.
8. Demonstrate specificity, inheritance, a hover transition and a keyframe animation.
9. Add a reduced-motion media query and include the student name and SAP ID on the page.
10. Document the implementation, output and observations in this report.

---

## 7. Output and observations

The page is organised as a CSS specimen sheet. It includes:

- Three cards showing inline, internal and external CSS.
- A selector gallery and a card showing specificity and inheritance.
- A nested box-model diagram and a description of its four layers.
- Separate Flexbox and CSS Grid demonstrations.
- Responsive cards and grid layouts for desktop, tablet and phone widths.
- A hover transition and a repeating keyframe animation.
- A reduced-motion preference rule.
- The student's name and SAP ID in the masthead, accession label and footer.

### Observations

1. External CSS keeps the main visual design separate from the HTML content.
2. Inline CSS has a narrow scope and is less convenient to maintain across many elements.
3. Selector choice determines which elements receive each declaration.
4. Padding, border and margin add different kinds of space around content.
5. Flexbox is useful for arranging items on one axis; Grid handles rows and columns together.
6. Media queries allow the number of columns to change as the viewport narrows.
7. More-specific selectors can override declarations from less-specific selectors.
8. Reduced-motion preferences can be respected with a dedicated media query.

---

## 8. Viva questions and answers

**Q1. What is CSS?**  
CSS stands for Cascading Style Sheets. It controls the visual presentation and layout of HTML documents.

**Q2. What are the three methods of applying CSS shown here?**  
Inline CSS, internal CSS and external CSS.

**Q3. What is the benefit of an external stylesheet?**  
It separates the presentation rules from the HTML and can be reused by multiple pages.

**Q4. What is the difference between a class and an ID selector?**  
A class is reusable and is selected with a period, such as `.card`. An ID is intended to identify one element and is selected with `#`, such as `#id-selector-demo`.

**Q5. What are the four parts of the box model?**  
Content, padding, border and margin.

**Q6. How do Flexbox and Grid differ?**  
Flexbox arranges items along one dimension. Grid arranges items in rows and columns.

**Q7. What does a media query do?**  
It applies CSS declarations when the viewport or another media condition meets the query.

**Q8. What is specificity?**  
Specificity is part of the cascade that determines which matching selector has priority.

**Q9. What is inheritance in CSS?**  
Some property values set on a parent element are passed to descendants unless another rule overrides them.

**Q10. How does a transition differ from an animation?**  
A transition smoothly changes a property between states. An animation uses keyframes to define one or more stages of change.

**Q11. How does the page accommodate users who prefer less motion?**  
The `prefers-reduced-motion` media query shortens animation and transition durations.

---

## 9. Result

The CSS showcase page and its stylesheet demonstrate the three CSS application methods, selector types, the box model, Flexbox, Grid, responsive breakpoints, specificity, inheritance, transitions and animations. The page also displays the student's name and SAP ID.

## 10. Conclusion

This experiment demonstrates how CSS styles HTML content and controls page layout. The examples show how selector choice and the cascade affect styling, how the box model describes element spacing, and how Flexbox, Grid and media queries create adaptable layouts. Transitions, animations and reduced-motion rules demonstrate how to add motion while accounting for user preferences.

## 11. References

1. MDN Web Docs — [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
2. MDN Web Docs — [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
3. MDN Web Docs — [The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
4. MDN Web Docs — [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
5. MDN Web Docs — [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
6. MDN Web Docs — [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
7. MDN Web Docs — [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations)

---

[← Back to repository index](../../readme.md)
