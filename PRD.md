# StudySpot MVP – Product Requirements Document (PRD)

## 1. Purpose
Deliver a polished MVP web application that demonstrates real-time study space occupancy tracking across a college campus. The goal is to impress prospective investors during a live lecture-hall pitch, showcasing clear product value, intuitive UX, and a credible path to full production.

## 2. Scope
This MVP focuses strictly on the **frontend** experience using hard-coded, time-varying demo data. Backend integration, authentication, sensor hardware, and analytics are out-of-scope for this iteration.

## 3. Target Users
* College students seeking available study spaces
* University staff managing study areas (viewer-only in MVP)
* Potential investors evaluating product viability

## 4. Success Criteria
1. **Seamless demo flow** across three core views with no console errors.
2. **Responsive design** for desktop (primary) and tablet/mobile (secondary) breakpoints.
3. **Perceived real-time occupancy** updates every 10 s (simulated).
4. **<3 s page load** on modern laptops over campus Wi-Fi.
5. Investor feedback: ≥80 % of live audience indicate the value proposition is clear (measured via quick poll).

## 5. Key Features & Requirements
| # | Feature | Functional Requirements | Non-Functional Requirements |
|---|---------|-------------------------|-----------------------------|
| F1 | **Landing Dashboard** | • Display headline occupancy % for 4-6 *Popular Study Areas* (cards).\
• Global search bar (placeholder only).\
• *All Study Areas* table: columns **Study Area**, **Building**, **Occupancy** with color bar & %, sortable by occupancy. | • Update cards & table via simulated timer.\
• Polished hero text + subtle fade-in on load.\
• Responsive grid (Tailwind). |
| F2 | **Room Detail (Seat Map)** | • Dropdown to select study area/floor.\
• SVG/HTML seat map with seats colored **green (open)** / **red (occupied)**.\
• Legend keys.\
• Clicking seat (optional tooltip: “Seat B3 • Open”). | • Seat grid responsive inside fixed aspect container.\
• Smooth transition (opacity/scale) when changing rooms. |
| F3 | **Search & Filter** | • Hero heading + description.\
• Search input debounced.\
• Filter pills/dropdowns: *Time, Location, Type* (front-end only).\
• Data table with columns: **Study Area**, **Location**, **Available/Capacity**, **Occupancy** (progress bar + %), **Last Updated**, **Details** link to F2. | • Table rows striped on hover; show 5–8 demo rows.\
• Sorting & filtering handled in memory. |
| F4 | **Navigation/Header** | • Brand logo left, links (*Home, Dashboard, About*).\
• Right-side: search icon, notification bell (static), user avatar (static). | • Sticky at top, shadow on scroll. |
| F5 | **Footer** | • Brand mark, © year, social icons. | • Consistent across pages. |

## 6. Data Model (Demo-only)
```ts
interface StudyArea {
  id: string;
  name: string;
  building: string;
  capacity: number;
  seatsOpen: number;   // derived
  occupancyPct: number; // 0–100
  lastUpdated: string; // timestamp string
  seats?: Seat[];      // populated for detail page
}

interface Seat {
  id: string;   // e.g., "B3"
  occupied: boolean;
}
```
A small JSON fixture (e.g., `demoData.ts`) will randomize `occupied` seats and `occupancyPct` on an interval to simulate real-time updates.

## 7. Tech Stack
* **React 19 + Vite** – fast dev & HMR
* **TypeScript** – type safety
* **TailwindCSS v4** – utility-first styling
* **React Router v6** – client-side routing
* **React Context / hooks** – lightweight state management
* **Heroicons** – iconography

## 8. Assumptions & Constraints
1. No persistent backend; all data lives in memory.
2. Accessibility (a11y) will be *basic* (color contrast & aria-labels), full compliance later.
3. Cross-browser support limited to latest Chrome, Firefox, Safari.
4. MVP will cover **3 libraries** max to keep scope tight.

## 9. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Interactive seat map complexity | Medium | Use simple flex/SVG grid; cap seats at 36 per room. |
| Performance with many DOM nodes | Low-Med | Memoize seat components; use React `key` properly. |
| Time-based data feels fake | Medium | Randomize within realistic ranges + subtle animation on change. |
| Scope creep | High | Lock feature list above; any additions require explicit approval. |