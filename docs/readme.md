# Travel Booking Dashboard

A frontend practice project for building a real-world travel booking dashboard using React and modern frontend workflow.

## Project Goal

This project is built to practice practical frontend engineering skills:
- Routing
- Layout structure
- Authentication flow later
- API integration later
- Loading/error/empty states later
- Form handling later
- Git workflow
- AI-assisted coding workflow

## Tech Stack

- React
- Vite
- JavaScript
- React Router

## Current Progress

### Week 1: Project Foundation
- [x] Initialize React Vite project
- [x] Set up Git and GitHub repository
- [x] Set up basic routing
- [x] Create public and dashboard layouts
- [x] Add project documentation for AI-assisted coding
- [x] Add README documentation

### Week 2: Auth Flow
- [ ] Create login form
- [ ] Add auth state
- [ ] Add protected route
- [ ] Add logout flow
- [ ] Add redirect after login/logout
- [ ] Add session persistence

## Week 3: Booking API Integration

### Dashboard Summary
- [ ] Login successfully
- [ ] Open `/dashboard`
- [ ] Dashboard summary loading state appears
- [ ] Dashboard summary cards appear
- [ ] No console error appears

### Recent Bookings
- [ ] Open `/dashboard`
- [ ] Recent bookings list appears
- [ ] Click a recent booking
- [ ] User is redirected to `/bookings/:bookingId`
- [ ] Booking detail appears

### Booking Detail
- [ ] Open `/bookings/1`
- [ ] Booking detail loading state appears
- [ ] Booking detail appears
- [ ] Open `/bookings/999`
- [ ] Friendly not found/error state appears
- [ ] Open `/bookings/1` without login
- [ ] User is redirected to `/login`

### Booking List
- [ ] Open `/bookings`
- [ ] Loading state appears
- [ ] Booking list appears
- [ ] Each booking links to its detail page
- [ ] Empty state appears when bookings data is empty

### Search and Filter
- [ ] Search by customer name
- [ ] Search by destination
- [ ] Filter by status
- [ ] Search and status filter work together
- [ ] Empty state appears when no booking matches filter
- [ ] Clear search and choose `All`
- [ ] All bookings appear again

### URL Query Params
- [ ] Search updates the `search` query param
- [ ] Status filter updates the `status` query param
- [ ] Refresh page keeps search/filter from URL
- [ ] Opening copied filtered URL shows the same filtered result
## Routes
### Week 4: Refactor and Reusable Components
- [x] Extract reusable common UI components
- [x] Refactor booking detail UI
- [x] Refactor booking list UI
- [x] Refactor dashboard UI
- [x] Keep auth, routing, and service behavior unchanged
- [x] Re-test main user flows after refactor

### Month 2: Forms and Mock CRUD
- [x] Add create booking form
- [x] Refactor create booking form with React Hook Form
- [x] Persist created bookings with localStorage
- [x] Show created bookings in booking list
- [x] Support detail page for created bookings
- [x] Delete locally created bookings

| Route | Description |
|---|---|
| `/` | Home page |
| `/login` | Login page |
| `/dashboard` | Dashboard page |

## Folder Structure

```txt
src/
  app/
  components/
  features/
  layouts/
  services/
  store/
  utils/
docs/