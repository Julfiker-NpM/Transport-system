# Transport System

A small React + Firebase transport schedule app with admin login and Firestore integration.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser at:
   ```
   http://localhost:5173
   ```

## Firebase

This app uses Firebase Authentication and Firestore.

### Required setup

- Create a Firebase project
- Enable Authentication (Email/Password)
- Enable Firestore database
- In Firebase Console → Project settings → Your apps, copy the web app config values
- Copy `.env.example` to `.env` and fill in the `VITE_FIREBASE_*` variables (never commit `.env`)

### Admin access

The app allows admin access for pre-created admin users only.

1. In Firebase Console, create an auth user with email/password.
2. Make sure the admin email is present in `src/contexts/AuthContext.tsx` under `ADMIN_EMAILS`.

For example:
```ts
const ADMIN_EMAILS = ["admin@transport.com"];
```

### Firestore rules

To allow the admin to read and write `bus_schedules`, use rules like:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bus_schedules/{document=**} {
      allow read, write: if request.auth != null
        && request.auth.token.email == "admin@transport.com";
    }
  }
}
```

Replace the email with your actual admin email if needed.

## Project structure

- `src/App.tsx` - routes and navigation
- `src/pages/user` - public user pages
- `src/pages/admin` - admin dashboard and form
- `src/firebase/config.ts` - Firebase initialization (reads `VITE_*` from `.env`)
- `.env.example` - template for required environment variables
- `src/contexts/AuthContext.tsx` - authentication state
- `src/services/busService.ts` - Firestore bus schedule service

## Notes

- No admin account is stored in code, only the allowed admin email list.
- If you see permission errors, verify both Firebase Authentication and Firestore rules.
