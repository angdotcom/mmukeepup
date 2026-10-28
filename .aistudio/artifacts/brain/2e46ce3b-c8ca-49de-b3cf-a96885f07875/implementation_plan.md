# Implementation Plan - MMU Keep Up Authentication Integration

Integrate the streamlined user authentication modal and profile management provided by the user into the full-featured MMU Keep Up application, maintaining the campus feed, event calendar, clubs directory, and KeepUp AI assistant.

## User Review Required

> [!IMPORTANT]
> - **Streamlined Auth Modal**: Allows users to pick their role (Student, Club, Lecturer, Outsider), enter their name and MMU email, and persist their session in `localStorage`.
> - **Full Feature Retention**: Keeps the Campus Feed, Event Calendar, Clubs Directory, KeepUp AI Assistant, and AI Post Moderator intact.
> - **Role Enforcement**: Unauthenticated users or guests (Outsiders) will be prompted to sign in when attempting to post or sync events.

- **Proceed**: Click the Proceed button to execute this plan and update the application.

## Proposed Changes

### Frontend (`/src/App.tsx`)
- Integrate `UserProfile` state and `localStorage` persistence.
- Add the Streamlined Sign In / Registration Modal supporting Student, Club, Lecturer, and Outsider roles.
- Update top navigation and sidebar to display the logged-in user profile, avatar, verification status, and switch/logout controls.
- Protect post creation and event synchronization actions using `requireAuthAction`.
- Retain all tabs: Campus Feed, Event Calendar, Clubs Directory, and KeepUp AI Assistant.

## Verification Plan

### Automated Tests
- Run `compile_applet` and `lint_applet` to ensure zero compilation or TypeScript errors.

### Manual Verification
- Verify the sign-in modal appears on first load or when switching users.
- Test posting announcements as a Club or Lecturer versus a Student.
- Verify event calendar syncing and KeepUp AI chat functionality.
