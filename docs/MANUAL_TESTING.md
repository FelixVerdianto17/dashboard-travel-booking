# Manual Testing Checklist

## Week 1: Routing and Layouts

### Home Page
- [ ] Open `/`
- [ ] Home page renders correctly
- [ ] Public layout appears
- [ ] No console error appears

### Login Page
- [ ] Open `/login`
- [ ] Login page renders correctly
- [ ] Public layout appears
- [ ] No console error appears

### Dashboard Page
- [ ] Open `/dashboard`
- [ ] Dashboard page renders correctly
- [ ] Dashboard layout appears
- [ ] No console error appears

### Refresh Test
- [ ] Refresh `/`
- [ ] Refresh `/login`
- [ ] Refresh `/dashboard`
- [ ] Page should not become blank after refresh

### Navigation
- [ ] Navbar links go to the correct routes
- [ ] Active/current page is understandable

## Week 2: Auth Flow

### Login
- [ ] Open `/login`
- [ ] Login with invalid credentials
- [ ] Error message appears
- [ ] Login with valid credentials
- [ ] User is redirected to `/dashboard`

### Protected Route
- [ ] Open `/dashboard` without login
- [ ] User is redirected to `/login`

### Persist Session
- [ ] Login successfully
- [ ] Refresh `/dashboard`
- [ ] User stays on `/dashboard`

### Logout
- [ ] Click Logout
- [ ] User is redirected to `/login`
- [ ] Open `/dashboard` again
- [ ] User is redirected to `/login`