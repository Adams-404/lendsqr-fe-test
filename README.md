# Frontend Engineering Assessment

This repository contains my submission for the Frontend Engineering Assessment. The application is a React-based admin dashboard built to replicate the provided design specifications with high fidelity, focusing on code quality, responsiveness, and performance.

## Deployed Application

**Live URL:** https://mohammed-aliyu-adamu-lendsqr-fe-test.vercel.app

## Tech Stack

- **Core:** React 18, TypeScript
- **Styling:** SCSS (Sass) - Using BEM methodology, mixins, and variables for a scalable design system. No CSS frameworks (Tailwind, Bootstrap) were used, adhering strictly to the assessment requirements.
- **Build Tool:** Vite
- **Testing:** Vitest, React Testing Library
- **State Management & Routing:** React Router v6, Context API, Local Storage.

## Project Structure

The project follows a scalable feature-based folder structure:

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── pages/          # Page views
├── services/       # Mock API services
├── styles/         # Global SCSS
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## Features

- **High-Fidelity Implementation:** Meticulously implemented UI matching the provided design mockups.
- **Responsive Layout:** Adaptive sidebar, tables, and cards optimized for mobile, tablet, and desktop viewports.
- **Authentication:** Mock login flow with session persistence.
- **Users Dashboard:**
  - Data fetching from a simulated API (500 records).
  - Advanced Filtering (Organization, Username, Email, Phone, Date).
  - Pagination (10/20/50/100 items per page).
  - Persistence of user view settings.
- **User Details:** Detailed profile view with local storage caching for performance.
- **Unit Testing:** Comprehensive test coverage for core components.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Adams-404/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run production build locally:
   ```bash
   npm run build
   npm run preview
   ```

### Running Tests

```bash
npm run test
```

## Design Decisions

- **SCSS Architecture:** Adopted SCSS modules and a global variable system to maintain design consistency without relying on external UI libraries.
- **Mock Data Layer:** Implemented a robust data generation service to simulate realistic API latency and pagination.
- **Component Design:** Focused on atomic design principles to ensure components are reusable and easily testable.

## License

This project is for assessment purposes only.
