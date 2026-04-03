AI Design Tool Prompt: Namibia Superior Courts / eJustice Portal (Redesign)
1. Project Context
You are designing a modern, responsive, high‑trust website for the Namibia Superior Courts (Supreme Court, High Court) and eJustice services. The current site (SharePoint‑based) is outdated. The redesign must retain all existing content (see full sitemap below) but reorganise it into an intuitive, task‑driven, mobile‑first information architecture. The target audiences are legal professionals and the general public.

2. Brand & Visual Style
Primary colour: Deep navy blue (#1A2F4E or similar) – authority, calm.

Secondary colour: Gold/amber (#D4A02B or #C68E17) – accents, calls to action, hover states.

Neutral background: Off‑white (#F8F9FA) for body, pure white (#FFFFFF) for cards.

Typography: Sans‑serif – e.g., Inter, Roboto, or Open Sans. Use 16px base for body text.

Spacing: Generous (at least 24px between sections), clear visual hierarchy.

Icons: Simple line icons (Feather or Font Awesome style) for navigation, actions, and file types.

Rounded corners: Subtle (8px on cards, 4px on buttons).

Shadows: Light – only on cards and dropdowns for depth.

3. Mandatory Content – Complete Sitemap (All Items Must Be Reachable)
About Us (10 pages)
Independent State with a Constitutional Dispensation

The Constitution and Human Rights

Judicial Power

The Judiciary

Judicial Independence

Appointment and Removal of Judges

The Supreme Court of Namibia

The High Court of Namibia

Access to Justice and Legal Representation

Fair Trial

High Court
Mediation (Diary, Contact Details, Registers & Reports, Directives, Forms & Precedents)

Court Rolls (Continuous Rolls, Day Rolls, Motion Court Rolls, Fixed Dates)

Judgments (Civil, Criminal, Labour, Tax)

Legislation & Directives (Acts of Parliament, Regulations, Directives, Fees & Tariffs)

Forms & Precedents (High Court Rules, High Court Practice Directives, Labour Court Rules, Regulations to Labour Court Rules, Pro Forma Orders, General)

Important Contacts

Registers & Reports

Media (Speeches, Media Releases)

Supreme Court
Judgments

Court Rolls

Legislation & Directives

Media (Speeches, Media Releases)

Judiciary
Supreme Court Judges

High Court Judges

Namibian Constitution

Acts of Parliament

Regulations

Directives

eJustice
Sign In

New User Registration

Forget Password

Quick Links (external)
Law Society of Namibia

Namibia Society of Advocates

Legal Assistance Centre (LAC)

SAFLII

Ministry of Justice

The Hague Apostille Section

Additional (from sitemap)
Search (site‑wide search must be prominent)

4. Proposed Information Architecture (Top Navigation)
Create a sticky top navigation bar with the following menu items (desktop: horizontal; mobile: hamburger menu). All content from section 3 must be reachable under these headings.

Top Menu (desktop):

Find & Research

File & eServices

Resolve a Dispute

About the Judiciary

Legal Resources

Contact & Support

Utility area (top‑right):

Search icon/bar

Sign In button (persistent – links to eJustice login)

Footer (bottom):

Quick Links (external links)

Disclaimer, Terms & Conditions, Privacy Policy

Copyright notice

5. Page‑by‑Page Design Requirements
A. Homepage Layout (Desktop & Mobile)
Hero section: Welcome message (“Namibia Superior Courts – Your gateway to justice”) + large search bar (site‑wide).

Quick action cards (4 cards):

Find a Judgment
Check Court Rolls
File via eJustice
Track My Case
Announcements / News (latest 3 items – speeches, media releases).

Featured resource (e.g., “How to access mediation”).

Footer as described.

B. Find & Research → Court Rolls (dynamic page)
Filters (top of page):

Court dropdown (Supreme Court / High Court)

Roll type dropdown (Day Rolls, Motion Court Rolls, Continuous Rolls, Fixed Dates)

Date picker

Results table (sortable by date, court, type) with columns: Date, Court, Roll Type, Link (PDF icon).

Pagination (10 per page).

Mobile view: Filters become accordion; results become cards.

C. Find & Research → Judgments (search page)
Search bar (keyword) + advanced filters (collapsible):

Court (Supreme/High)

Category (Civil, Criminal, Labour, Tax)

Year range

Judge name

Party name / case number

Results as list: Case title, citation, date, download PDF.

Sorting by date or relevance.

D. Resolve a Dispute → Mediation → Diary (filterable table)
Filters: Year (dropdown, e.g., 2026, 2025…), Court Division (Main, Coastal, Northern – map old codes to readable names, but optionally show code in tooltip).

Table columns: Year, Division, Diary Link (PDF icon).

Pagination and search within results.

Replace the current long flat list of “2026 NAHCMD Coastal Court…” with this table.

E. File & eServices → Forms & Precedents (library)
Category grid: High Court Rules, High Court Practice Directives, Labour Court Rules, Regulations to Labour Court Rules, Pro Forma Orders, General.

Clicking a category opens a searchable table with: Form Title, Version/Date, Download PDF.

Alternatively, a unified search across all forms.

F. About the Judiciary → Constitutional Background
Left sidebar or accordion listing the 10 About Us pages.

Main content area displays the selected page’s text (from current site).

Clean typography, readable line length.

G. About the Judiciary → Judges
Two sections: Supreme Court Judges, High Court Judges.

Each judge as a card: Name, title, photo (placeholder), short bio link.

H. Legal Resources → Acts of Parliament / Regulations / Court Rules
Filterable list by year, title, or act number.

Each row: Title, year, download PDF.

I. Contact & Support → Important Contacts
List or cards for court registries, IT helpdesk, mediation contacts.

Include phone, email, physical address, map link.

6. Deep Content Improvements (Must Implement)
Where the current site uses long, unsorted flat lists (e.g., 15+ mediation diary entries by year), replace with:

Filterable, sortable, paginated tables (as described in sections D and E).

Human‑readable labels for cryptic codes (e.g., “NAHCMD” → “High Court Main Division”) – can show both or use tooltip.

Search within every index page (judgments, rolls, forms, diary).

7. Responsive & Mobile Requirements
Mobile navigation: Hamburger menu, slide‑in from left or right.

Touch targets: Minimum 44x44px.

Tables on mobile: Convert to stacked cards (each row becomes a card with key fields).

Filters on mobile: Use bottom sheet or collapsible panel.

8. Accessibility (WCAG 2.1 AA)
High contrast between text and background.

Keyboard navigable: Tab order, focus indicators.

Screen‑reader friendly: ARIA labels on icons and interactive elements.

Alt text for all images.

Skip to main content link.

9. Performance & Security
No pop‑up windows for eJustice login – use a secure modal or dedicated page.

Lazy load images and PDF previews.

Optimise for low bandwidth (compress images, use system fonts).

10. Deliverables from AI Design Tool
High‑fidelity UI mockups for:

Homepage (desktop + mobile)

Find & Research → Court Rolls (desktop + mobile)

Find & Research → Judgments search results

Resolve a Dispute → Mediation Diary (filterable table)

File & eServices → Forms & Precedents (library view)

About the Judiciary → Constitutional Background (with sidebar)

Contact & Support → Important Contacts

Clickable prototype linking the above pages.

UI style guide (colours, typography, buttons, form inputs, tables, cards).

Component library (buttons, search bar, filter panel, table, card, pagination).

11. Examples of International Standards (for AI reference)
Information architecture similar to UK judiciary (judiciary.uk).

eServices integration like Singapore eJudiciary (judiciary.gov.sg).

Mobile & accessibility like Colorado Judicial Branch (courts.state.co.us).

12. Final Notes
Do not remove any content listed in section 3 – all must be accessible within 3 clicks.

Preserve familiar legal terms (Court Rolls, Judgments, Mediation, eJustice, High Court, Supreme Court) as primary labels or filters.

Use modern, trustworthy, clean aesthetics – no decorative clutter.