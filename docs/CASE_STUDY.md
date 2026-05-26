# Travel Booking Dashboard — Case Study

## Project Summary

Travel Booking Dashboard is a frontend practice project built to simulate a real-world travel booking management system.

The project includes authentication, protected routes, booking list/detail, search and filter, create/edit/delete booking, form validation, local mock persistence, reusable UI components, and TanStack Query for async data management.

## Problem

The goal was to build a project that goes beyond tutorial-level React apps.

Instead of only rendering static UI, this project focuses on real frontend workflows:
- routing
- auth flow
- protected pages
- form handling
- validation
- CRUD
- async data state
- UI refactor
- manual testing
- deployment preparation

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- Tailwind CSS
- shadcn/ui
- Zustand
- React Hook Form
- Zod
- TanStack Query
- localStorage

## Main Features

### Auth Flow

Users can log in with mock credentials. Auth state is stored in Zustand and persisted so private routes remain accessible after refresh.

### Protected Routes

Private pages such as dashboard and bookings are protected using ProtectedRoute. If the user is not authenticated, they are redirected to login.

### Booking Management

Users can view bookings, open booking detail pages, search/filter bookings, create new bookings, edit locally created bookings, and delete locally created bookings.

### Form Validation

Create and edit forms use React Hook Form with Zod schema validation.

### Data Fetching

Booking data is managed with TanStack Query:
- useQuery for list/detail
- useMutation for create/edit/delete
- invalidateQueries after mutations

### Mock Persistence

Because the project does not use a real backend yet, locally created bookings are stored in localStorage.

## Technical Decisions

### Why Zustand for Auth?

Auth is global client state. It needs to be accessed by ProtectedRoute, DashboardLayout, and logout flow.

### Why TanStack Query for Bookings?

Bookings behave like async/server state. TanStack Query helps manage loading, error, cache, refetch, and mutation state.

### Why localStorage?

localStorage is used as mock persistence to simulate saved user-created bookings before connecting to a real backend.

### Why React Hook Form + Zod?

React Hook Form reduces form boilerplate. Zod centralizes validation rules for create and edit forms.

## Limitations

- No real backend yet
- No real database yet
- Auth is mock-based
- Token is dummy
- localStorage data only exists in the user's browser
- Seed bookings cannot be edited or deleted permanently
- No pagination yet
- No real role-based access control

## What I Learned

- How to structure a React project by feature
- How to separate page logic, reusable components, and service layer
- How auth flow works in a frontend app
- How to protect routes
- How to manage global auth state
- How to handle form validation
- How to use TanStack Query for async data
- How to refactor UI without changing behavior
- How to manually test real user flows

## Future Improvements

- Connect to real backend API
- Add real authentication
- Add pagination and sorting
- Add role-based access
- Add toast notifications
- Add tests
- Improve mobile layout
- Add real dashboard analytics