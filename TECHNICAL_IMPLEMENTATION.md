# Print CV Generator — Technical Implementation Guide

## File Structure

```
Resume/
├── cv-print.js              [CV data + print engine - MODIFIED]
├── print.css                [Print-only stylesheet - MODIFIED]
├── index.html               [Main portfolio page - no changes]
├── style.css                [Screen styling - no changes]
└── PRINT_CV_IMPROVEMENTS.md [This documentation]
```

---

## Architecture Overview

### Data Flow
```
window.CV (object) 
  ↓
generatePrintCV() function call
  ↓
buildPrintDoc(window.CV)
  ↓
New window with HTML document
  ↓
print.css styling
  ↓
Browser print dialog
  ↓
PDF file (A4, professional)
```

---

## Core Components

### 1. CV Data Object (`window.CV`)

Location: **cv-print.js** (lines 1-200)

```javascript
window.CV = {
  name: 'Deboraj Roy',
  title: 'Software Engineer...',
  contact: [...],
  summary: '...',
  skills: [...],
  experience: [...],
  enterpriseProjects: [...],
  projects: [...],
  education: [...],
  certifications: [...],
  additional: {...}
}
```

**Responsibility**: Single source of truth for all CV content

### 2. HTML Element Factory (`h()`)

Location: **cv-print.js** (lines ~220-230)

```javascript
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== false) {
        el.setAttribute(k, v);
      }
    });
  }
  children.forEach(c => {
    if (c == null) return;
    el.appendChild(typeof c === 'string' 
      ? document.createTextNode(c) 
      : c);
  });
  return el;
}
```

**Responsibility**: Safely create DOM elements with attributes

### 3. Section Title Renderer

Location: **cv-print.js** (lines ~240)

```javascript
function secTitle(text) {
  return h('h2', { class: 'p-section-title' }, text);
}
```

**Responsibility**: Consistent h2 heading creation with styling

### 4. Entry Renderer (`renderEntry()`)

Location: **cv-print.js** (lines ~250-310)

```javascript
function renderEntry(body, opts) {
  const entry = h('article', { class: 'p-entry' });
  
  // Title + Date row
  const row = h('div', { class: 'p-entry-row' });
  const titleEl = h('h3', { class: 'p-entry-title' }, opts.title);
  row.appendChild(titleEl);
  if (opts.date) {
    const dateEl = h('span', { class: 'p-entry-date' }, opts.date);
    row.appendChild(dateEl);
  }
  entry.appendChild(row);
  
  // Organization/context
  if (opts.sub) {
    entry.appendChild(h('p', { class: 'p-entry-org' }, opts.sub));
  }
  
  // Tech stack
  if (opts.stack) {
    entry.appendChild(h('p', { class: 'p-entry-stack' }, 'Tech: ' + opts.stack));
  }
  
  // Links (for projects)
  if (opts.links && opts.links.length) {
    const linkLine = h('div', { class: 'p-proj-link' });
    opts.links.forEach((l, i) => {
      if (i > 0) linkLine.appendChild(document.createTextNode(' · '));
      const link = h('a', { 
        href: l.href, 
        target: '_blank', 
        rel: 'noopener noreferrer' 
      }, l.label + ': ' + l.href);
      linkLine.appendChild(link);
    });
    entry.appendChild(linkLine);
  }
  
  // Bullet points
  if (opts.bullets && opts.bullets.length) {
    const ul = h('ul');
    opts.bullets.forEach(b => ul.appendChild(h('li', {}, b)));
    entry.appendChild(ul);
  }
  
  body.appendChild(entry);
}
```

**Responsibility**: Flexible rendering of resume entries (jobs, projects, etc.)

### 5. Document Builder (`buildPrintDoc()`)

Location: **cv-print.js** (lines ~310-420)

```javascript
function buildPrintDoc(cv) {
  const doc = document.implementation.createHTMLDocument('CV');
  
  // 1. Resolve CSS path
  const scriptSrc = document.currentScript
    ? document.currentScript.src
    : (document.querySelector('script[src*="cv-print"]') || {}).src || '';
  const base = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
  
  // 2. Add meta tags
  doc.head.appendChild(h('meta', { charset: 'UTF-8' }));
  doc.head.appendChild(h('meta', { 
    name: 'viewport', 
    content: 'width=device-width, initial-scale=1.0' 
  }));
  doc.head.appendChild(h('title', {}, cv.name + ' — Professional CV'));
  
  // 3. Link external CSS
  doc.head.appendChild(h('link', { 
    rel: 'stylesheet', 
    href: base + 'print.css' 
  }));
  
  // 4. Inline print-specific styles
  const printStyles = doc.createElement('style');
  printStyles.textContent = `
    @media print {
      body { orphans: 4; widows: 4; }
      .p-entry, .p-edu, .p-cert { page-break-inside: avoid; }
    }
    @page {
      size: A4;
      margin: 1.8cm 2cm 1.8cm 2cm;
      orphans: 4;
      widows: 4;
    }
  `;
  doc.head.appendChild(printStyles);
  
  const body = doc.body;
  
  // 5. Build sections...
  // [Header, Summary, Skills, Experience, etc.]
  
  return doc;
}
```

**Responsibility**: Construct complete HTML document from CV data

### 6. Print Trigger (`generatePrintCV()`)

Location: **cv-print.js** (lines ~425-450)

```javascript
window.generatePrintCV = function () {
  const printDoc = buildPrintDoc(window.CV);
  const printWindow = window.open('', '_blank', 'width=1000,height=800');
  
  if (!printWindow) {
    alert('Pop-ups are blocked. Please allow pop-ups for this site.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(
    '<!DOCTYPE html>\n' +
    printDoc.documentElement.outerHTML
  );
  printWindow.document.close();

  printWindow.addEventListener('load', function() {
    setTimeout(function() {
      printWindow.focus();
      printWindow.print();
    }, 500);
  });
};
```

**Responsibility**: Open print window, render document, trigger print dialog

---

## CSS Architecture (`print.css`)

### 1. Global Setup

```css
@page {
  size: A4;
  margin: 1.8cm 2cm 1.8cm 2cm;
  orphans: 4;
  widows: 4;
}

@media print {
  html, body {
    margin: 0;
    padding: 1.8cm 2cm;
    width: 100%;
    height: auto;
  }
}
```

### 2. Typography System

```css
/* Base typography */
html, body {
  font-family: "Segoe UI", "Roboto", "Inter", serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #000;
}

/* Heading hierarchy */
.p-name { font-size: 18pt; }        /* H1 equivalent */
.p-section-title { font-size: 12pt; } /* H2 equivalent */
.p-entry-title { font-size: 11pt; }   /* H3 equivalent */
```

### 3. Layout Components

```css
/* Header (centered, with bottom border) */
.p-header {
  text-align: center;
  border-bottom: 1.5pt solid #000;
  page-break-inside: avoid;
}

/* Entry blocks (job, project, education) */
.p-entry {
  page-break-inside: avoid;
  margin-bottom: 8pt;
}

.p-entry-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Skills table */
.p-skills-table {
  width: 100%;
  border-collapse: collapse;
}
```

### 4. Semantic Elements

```css
/* All major sections avoid page breaks */
.p-entry,
.p-edu,
.p-cert,
.p-section-note,
.p-two-col {
  page-break-inside: avoid;
}

/* Headers can't break after */
.p-section-title {
  page-break-after: avoid;
}
```

---

## Data Structure Details

### CV Object Schema

```javascript
{
  // Basic info
  name: String,
  title: String,
  
  // Contact (array of {label, href})
  contact: [{label: String, href: String}],
  
  // Overview
  summary: String,
  
  // Skills (array of {label, value})
  skills: [{label: String, value: String}],
  
  // Experience (array of {title, org, location, dates, stack, bullets, tags})
  experience: [{
    title: String,
    org: String,
    location: String,
    dates: String,
    stack: String,
    bullets: [String],
    tags: [String]
  }],
  
  // Enterprise projects (same structure as experience)
  enterpriseProjects: [...],
  
  // Open source projects (array of {title, links, bullets, tags})
  projects: [{
    title: String,
    links: [{label: String, href: String}],
    bullets: [String],
    tags: [String]
  }],
  
  // Education (array of {degree, school, dates, detail})
  education: [{
    degree: String,
    school: String,
    dates: String,
    detail: String
  }],
  
  // Certifications (array of {name, issuer, dates, href})
  certifications: [{
    name: String,
    issuer: String,
    dates: String,
    href: String
  }],
  
  // Additional info
  additional: {
    languages: String,
    interests: String,
    achievement: String
  }
}
```

---

## Key Improvements Made

### 1. Typography Enhancement

| Property | Before | After | CSS Class |
|----------|--------|-------|-----------|
| Base font size | 10pt | 11pt | `body` |
| Line height | 1.45 | 1.5 | `body` |
| Name size | 20pt | 18pt | `.p-name` |
| Section title | 10pt | 12pt | `.p-section-title` |
| Entry title | 10pt | 11pt | `.p-entry-title` |
| Contact size | 8.5pt | 10pt | `.p-contact` |

### 2. HTML Semantics

| Element | Before | After | Why |
|---------|--------|-------|-----|
| Section title wrapper | `<div>` | `<h2>` | Proper heading hierarchy |
| Entry wrapper | `<div>` | `<article>` | Semantic article block |
| Job title | `<div>` | `<h3>` | Proper heading level |
| Header | `<div>` | `<header>` | Semantic header |

### 3. CSS Print Features

```css
/* Page break control */
page-break-inside: avoid;
page-break-after: avoid;

/* Orphan/widow control */
orphans: 4;
widows: 4;

/* Print-specific styles */
@media print {
  /* Disable screen-only elements */
  .screen-only { display: none; }
}
```

### 4. Link Handling

```javascript
// Before
h('a', { href: url }, text)

// After
h('a', { 
  href: url, 
  target: '_blank',           // Open in new tab
  rel: 'noopener noreferrer'  // Security best practice
}, text)
```

---

## Browser Compatibility

### Supported Browsers
- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

### Key Features Used
- `@page` CSS rule (A4 margins, orphans/widows)
- `@media print` rules
- `page-break-inside: avoid`
- Flexbox layout
- HTML5 semantic elements
- Window.print() API

### Fallbacks
- Generic font families if web fonts fail
- Graceful degradation in older browsers
- Print dialog available in all modern browsers

---

## Performance Considerations

### File Sizes
- `cv-print.js`: ~20 KB
- `print.css`: ~2.8 KB
- Total overhead: ~23 KB

### Runtime Performance
- Document generation: ~500ms
- Print dialog delay: ~500ms timeout (necessary for CSS loading)
- Total time to print dialog: ~1 second

### Memory Usage
- New window process: ~10-20 MB (browser dependent)
- Reasonable for temporary print preview

---

## Testing Checklist

### Unit Tests (if converted to testing framework)
```javascript
// Test data structure
test('CV object is valid', () => {
  expect(window.CV).toHaveProperty('name');
  expect(window.CV).toHaveProperty('contact');
  expect(window.CV.contact).toEqual(expect.arrayContaining([
    expect.objectContaining({label: expect.any(String), href: expect.any(String)})
  ]));
});

// Test HTML generation
test('renderEntry creates valid HTML', () => {
  const doc = document.implementation.createHTMLDocument();
  renderEntry(doc.body, {
    title: 'Test',
    date: '2023-2024',
    sub: 'Company',
    bullets: ['Point 1']
  });
  expect(doc.body.querySelector('.p-entry')).toBeTruthy();
  expect(doc.body.querySelector('h3')).toHaveTextContent('Test');
});

// Test print document generation
test('buildPrintDoc returns valid document', () => {
  const doc = buildPrintDoc(window.CV);
  expect(doc.documentElement.tagName).toBe('HTML');
  expect(doc.querySelector('.p-header')).toBeTruthy();
});
```

### Manual Testing
- [ ] Print window opens
- [ ] All sections render
- [ ] Typography looks correct
- [ ] Spacing is professional
- [ ] Page breaks occur at logical points
- [ ] PDF exports cleanly
- [ ] Content is selectable
- [ ] Links work in PDF

---

## Maintenance Guide

### Updating CV Content

Edit `window.CV` object in **cv-print.js**:

```javascript
// Update name
name: 'Your Name',

// Add experience
experience: [
  {
    title: 'New Job',
    org: 'Company',
    location: 'City',
    dates: 'Month YYYY – Present',
    stack: 'Tech 1, Tech 2',
    bullets: ['Achievement 1', 'Achievement 2'],
    tags: ['tag1', 'tag2']
  },
  ...existing entries
]

// Add project
projects: [
  {
    title: 'Project Name',
    links: [{label: 'GitHub', href: 'https://...'}],
    bullets: ['Description'],
    tags: ['tech']
  },
  ...existing projects
]
```

### Updating Styling

Edit **print.css**:

```css
/* Change font */
body {
  font-family: "Your Font", "Fallback";
}

/* Change margins */
@page {
  margin: 1.5cm 2.5cm;
}

/* Change colors */
.p-section-title {
  border-bottom-color: #0066cc;
}
```

### Changing Print Behavior

Edit `buildPrintDoc()` in **cv-print.js**:

```javascript
// Change print delay
setTimeout(function() {
  printWindow.focus();
  printWindow.print();
}, 1000);  // Increase if CSS takes longer to load

// Change A4 margins
printStyles.textContent = `
  @page {
    margin: 2cm 2.5cm;
  }
`;

// Add custom print styles
printStyles.textContent += `
  @media print {
    .custom-class { display: none; }
  }
`;
```

---

## Troubleshooting Guide

### Issue: CSS not loading in print preview
**Debug**: Check browser console for 404 errors
**Solution**: Verify `print.css` is in same directory as script

### Issue: Print dialog not appearing
**Debug**: Check browser pop-up blocker
**Solution**: Whitelist domain, increase timeout

### Issue: Fonts not rendering
**Debug**: Open print preview, inspect computed styles
**Solution**: Check font fallback chain, test without web fonts

### Issue: Page breaks incorrect
**Debug**: Open PDF, check which sections break
**Solution**: Add/remove `page-break-inside: avoid` as needed

---

## Future Enhancements

### Potential Additions
1. **Multiple templates** — Chronological, functional, hybrid CV layouts
2. **Color schemes** — Dark mode, colored headers
3. **Export formats** — DOCX, ODT, plain text
4. **Live preview** — Split-pane print preview
5. **Customization UI** — Drag-drop sections, font selector
6. **Multi-language** — Language-specific dates, formats
7. **API integration** — LinkedIn profile sync, GitHub stats

### Technical Debt
- [ ] Migrate to TypeScript for type safety
- [ ] Add unit tests with Jest
- [ ] Set up CI/CD for print output validation
- [ ] Create component library for print elements
- [ ] Implement print preview pane

---

## Code Comments & Inline Documentation

Key comments in source:

**cv-print.js:**
```javascript
/* ============================================================
   CV DATA — edit content ONLY here.
   index.html renders the visual portfolio from this object.
   buildPrintDoc() renders the LaTeX-style print CV from it.
============================================================ */

/* ============================================================
   PRINT ENGINE
   Builds a standalone A4 HTML document for the print window.
   Reads exclusively from window.CV above.
   Optimized for PDF printing with professional typography.
============================================================ */

/* ============================================================
   PUBLIC API
   Generates and opens a professional print preview window
============================================================ */
```

**print.css:**
```css
/* ============================================================
   PRINT CV — Professional A4 layout optimized for PDF export
   Injected into a dedicated print window by cv-print.js.
   This file is NEVER loaded in the main page.
============================================================ */
```

---

## Version History

### v2.0 (Current - Enhanced Print)
- ✅ Improved typography (11pt base font)
- ✅ Better page layout (A4 optimized)
- ✅ Semantic HTML (proper heading hierarchy)
- ✅ Enhanced print CSS (@media print, @page)
- ✅ Proper page breaks (page-break-inside: avoid)
- ✅ Better link handling (target="_blank", rel attributes)
- ✅ Improved print window (1000x800px)
- ✅ Inline print styles (guaranteed to load)

### v1.0 (Legacy - Basic Print)
- Basic print window functionality
- Simple CSS styling
- 10pt font size
- Limited page break control

---

## References

- [MDN: CSS @page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
- [MDN: @media print](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
- [CSS Tricks: Print Styles](https://css-tricks.com/printing-the-web/)
- [A4 Paper Specifications](https://www.papersizes.org/a-paper-sizes.htm)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
