# Project Architecture: Travel Booking Dashboard

This project is built using React, Vite, and React Router v7. It adopts a **Feature-Based Folder Structure** (also known as a modular architecture) which separates concerns by functional domain rather than just technical types.

## Folder Directory Tree

```text
src/
  ├── app/                  # App-wide configurations (routing, global context provider wrappers)
  │   └── router.jsx        # Routing system definitions
  ├── components/           # Global reusable UI components
  │   └── common/           # Generic building blocks (Buttons, Inputs, Modals, etc.)
  ├── features/             # Business modules/features
  │   ├── auth/             # Authentication module
  │   │   └── pages/        # Auth pages (e.g. LoginPage.jsx)
  │   ├── dashboard/        # Dashboard module
  │   │   └── pages/        # Dashboard pages (e.g. DashboardPage.jsx)
  │   └── home/             # Public landing module
  │       └── pages/        # Landing pages (e.g. HomePage.jsx)
  ├── layouts/              # Main layout templates (e.g. Sidebar, Navbar wrappers)
  ├── services/             # API services, interceptors, and external clients (e.g. axios config)
  ├── store/                # Global state management configuration (Zustand/Redux/Context)
  └── utils/                # Helper functions, formatting tools, and constants
docs/                       # System & architectural documentation
```

## Architectural Guidelines

1. **Features Isolation**: Try to keep a feature self-contained. A feature can have its own local `components/`, `hooks/`, `services/`, and `pages/` inside its own directory if they are not shared with other features.
2. **Global Components**: Only place components in `src/components/common` if they are highly reusable across multiple features (e.g., standard layout grids, buttons, dropdowns).
3. **Routing**: All main pages are registered and wired through `src/app/router.jsx`.
4. **State Management**: If state is local to a feature, keep it in the feature. If it's globally accessed (like user credentials or system-wide settings), manage it in `src/store/`.
