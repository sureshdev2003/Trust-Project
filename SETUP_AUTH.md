# Authentication Setup Guide

## Steps to Set Up Admin Authentication

### 1. Install tsx (if not already installed)
```bash
npm install -D tsx
```

### 2. Push Database Schema
```bash
npm run db:push
```

### 3. Create Admin User
```bash
npm run create-admin
```
This will create an admin with password: `admin123`

Or create with custom password:
```bash
npm run create-admin yourpassword
```

### 4. Test the Authentication

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/login`

3. Enter the password (default: `admin123`)

4. You'll be redirected to `/dashboard` if login is successful

5. Click "Logout" in the sidebar to log out

## How It Works

### Session Storage
- Session token is stored in browser's sessionStorage
- Token persists only for the current browser tab/session
- Automatically cleared on logout or browser close

### API Endpoints
- `POST /api/auth/login` - Login with password
- `POST /api/auth/logout` - Logout and clear session
- `POST /api/auth/verify` - Verify session token

### Protected Routes
- Dashboard is wrapped with `ProtectedRoute` component
- Automatically redirects to login if not authenticated
- Verifies session on page load

### Auth Service (Axios)
Located in `lib/authService.ts`:
- `authService.login(password)` - Login
- `authService.logout()` - Logout
- `authService.verifySession()` - Check if session is valid
- `authService.isAuthenticated()` - Quick check if token exists

## Security Notes

- Passwords are hashed using SHA-256
- Session tokens are randomly generated
- All API calls use axios for consistent error handling
- Session data stored in sessionStorage (not localStorage)
