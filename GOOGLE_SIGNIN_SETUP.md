# Google Sign-In Setup Guide

Google Sign-In has been added to the Login and Sign-Up pages. Follow these steps to enable it:

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing one)
3. Enable the **Google Identity Services API**

## Step 2: Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth 2.0 Client ID**
3. Choose **Web application**
4. Under "Authorized redirect URIs", add:
   - `http://localhost:3000`
   - `http://localhost:3000/`
5. Copy your **Client ID**

## Step 3: Configure Firebase (Already Done ✅)

The Firebase Google provider is already configured in `src/pages/Login.jsx` and `src/pages/SignUp.jsx`.

## Step 4: Test It Out

1. Start your development server: `npm start`
2. Go to the Login or Sign-Up page
3. Click "Sign in with Google" or "Sign up with Google"
4. Select your Google account
5. You'll be signed in and redirected to the dashboard!

## How It Works

- **First-time users**: Google Sign-In creates a new user account and Firestore profile
- **Returning users**: Google Sign-In logs you back in
- **User data**: Name, email, and profile photo are saved from your Google account
- **Meal plan & preferences**: Default values are created for new users

## Note

The implementation uses Firebase's built-in Google authentication provider, so your Google Client ID from the Google Cloud Console is automatically handled by Firebase. No additional configuration needed in the `.env.local` file unless you want to use Google's APIs separately.
