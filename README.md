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

The **home** and **next bus** pages read `bus_schedules` **without logging in**. Rules must allow **public read** on that collection, and restrict **writes** to your admin account only.

In **Firebase Console → Firestore Database → Rules**, use something like this (same admin email as in `ADMIN_EMAILS` in `AuthContext.tsx`):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bus_schedules/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null
        && request.auth.token.email == "admin@transport.com";
    }
  }
}
```

Replace `admin@transport.com` with your real admin email, then **Publish** the rules.

A copy of these rules is in `firestore.rules` in this repo (for reference or `firebase deploy --only firestore` if you use the Firebase CLI).

## Project structure

- `src/App.tsx` - routes and navigation
- `src/pages/user` - public user pages
- `src/pages/admin` - admin dashboard and form
- `src/firebase/config.ts` - Firebase initialization (reads `VITE_*` from `.env`)
- `.env.example` - template for required environment variables
- `src/contexts/AuthContext.tsx` - authentication state
- `src/services/busService.ts` - Firestore bus schedule service

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com) and deploy (framework: Vite is detected automatically).
2. In the Vercel project → **Settings → Environment Variables**, add every variable from `.env.example` (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc.) for **Production** (and Preview if you want previews to work).
3. **Redeploy** after saving env vars (Deployments → … → Redeploy).
4. In **Firebase Console → Authentication → Settings → Authorized domains**, add your Vercel URL (e.g. `your-app.vercel.app`) and any custom domain. Without this, sign-in can fail on the live site.

`vercel.json` includes a SPA rewrite so routes like `/admin` or `/login` load the app instead of 404.

## Notes

- No admin account is stored in code, only the allowed admin email list.
- If you see permission errors, verify both Firebase Authentication and Firestore rules.
