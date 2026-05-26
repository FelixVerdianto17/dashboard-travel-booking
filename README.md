# Travel Booking Dashboard

A practical frontend project built with React and Vite to practice real-world frontend workflows, including authentication, protected routes, booking CRUD, form validation, local mock persistence, reusable UI components, and data fetching/mutation management using TanStack Query.

## Live Demo

Add your deployed link here.

## Demo Login

Email: demo@example.com  
Password: password123

## Features

- Mock login and logout flow
- Protected dashboard routes
- Persisted auth session with Zustand
- Dashboard summary and recent bookings
- Booking list and booking detail page
- Search and status filter with URL query params
- Create booking form
- Edit locally created bookings
- Delete locally created bookings
- React Hook Form + Zod validation
- localStorage mock persistence
- TanStack Query for booking data fetching and mutations
- Tailwind CSS + shadcn/ui + Lucide icons

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- Zustand
- React Hook Form
- Zod
- TanStack Query
- localStorage

## Project Structure

```txt
src/
  app/
    router.jsx

  components/
    common/

  features/
    auth/
      pages/
      services/

    bookings/
      components/
      pages/
      queries/
      schemas/
      services/

    dashboard/
      components/
      pages/

  layouts/
  store/
Setelah paste, simpan. Lalu:

```bash
git add README.md
git commit -m "docs: update README"
git push