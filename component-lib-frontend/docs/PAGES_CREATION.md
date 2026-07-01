PAGES_CREATION.md
🎯 Goal

This project includes a documentation website for the component library.
The AI must generate pages that are:

Clean
Visually appealing
Consistent layout
Easy to navigate
Focused on developer experience
Showcase real implementation, not only docs

The site is both:

Documentation
Visual playground / implementation preview
🧭 Required Pages
1. Home Page (/)

Purpose: First impression of the library.

Must include:

Hero section (library purpose)
Short introduction
Preview of components
CTA to Documentation
CTA to Implementation Examples

Design rules:

Spacious layout
Modern typography
Subtle colors
Component previews as cards
2. Documentation Page (/docs)

Purpose: Technical explanation of every component.

Each component section must include:

Component name
Description
Props table
Variants
Code snippet
Import instruction

Layout:

Sidebar navigation (components list)
Content area on the right
Sticky sidebar
3. Implementation / Templates Page (/templates)

Purpose: Show real-world usage.

This page shows complete forms and UI sections built using the components.

Examples to include:

Registration form
Login form
Profile form
Settings form
CRUD table layout
Modal form example

Rules:

These are NOT snippets
These are full realistic UI examples
Users should visually understand how components work together
🤖 AI-Decided Pages

AI is allowed to add helpful pages such as:

/playground — live component testing
/theme — theme customization preview
/changelog — component updates
/about — purpose of the project
🎨 Design Principles (VERY IMPORTANT)

AI must follow:

Use consistent spacing (8px system)
Use card-based layout
Use soft shadows and rounded corners
Avoid clutter
Prioritize readability
Use visual hierarchy (titles, subtitles, sections)
Every page must look like a modern SaaS UI
🧩 Layout Rules

All pages must use:

Shared Layout
Header
Sidebar (when needed)
Content container with max width
Proper padding
🧪 Component Preview Rule

Whenever a component is documented, AI must also render a live preview of it.

🧱 Folder Rule

Pages must be inside:

app/
  (pages)/
    page.tsx
    docs/page.tsx
    templates/page.tsx
✅ Output Expectation from AI

When asked to create a page, AI must:

Create clean layout
Use components from the library
Follow design rules
Avoid placeholder UI — must look production-ready
💡 Philosophy

This website is a living showcase of the component library.

Not just documentation.
Not just examples.
But a visual proof of how beautiful and reusable the components are.