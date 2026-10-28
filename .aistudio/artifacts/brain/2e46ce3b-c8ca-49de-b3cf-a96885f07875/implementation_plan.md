# Implementation Plan - Club Navigation and Individual Club Page

Implement interactive club navigation and individual club profile pages in MMU Keep Up.

## User Review Required

> [!IMPORTANT]
> - **Sidebar Club List**: Displays registered clubs ("MMU Cyberjaya Student Council", "Google Developer Student Club (GDSC)", "MMU Cyber Law Society", etc.) with avatar, verified checkmark, handle, follower count, bio, and "Follow / Following" interactive toggle buttons.
> - **Dedicated Club Profile View (`activeTab === 'club-detail'`)**: Clicking any club in the sidebar navigates to their profile page, featuring their banner/header info, follower stats, bio, and filtering the feed to show **only** posts by that club.
> - **Back Navigation**: Includes a clear "Back to Home Feed" button.

- **Proceed**: Click the Proceed button to execute this plan and update the application.

## Proposed Changes

### Frontend (`/src/App.tsx`)
- Add a dedicated `ClubProfile` data structure and state for followed clubs (`followedClubs` set).
- Add the "Campus Clubs & Societies" section to the left sidebar with follower counts, bios, and Follow/Following buttons.
- Implement click handlers on club names and avatars to set `activeTab = 'club-detail'` and `selectedClub`.
- Create the individual club profile page view displaying club header, statistics, follow action, and filtered posts by that club.

## Verification Plan

### Automated Tests
- Run `compile_applet` and `lint_applet` to verify zero TypeScript or build errors.

### Manual Verification
- Click on different clubs in the sidebar to verify navigation to their club profile page.
- Test toggling Follow/Following buttons and check post filtering.
- Verify the "Back to Home Feed" button returns correctly.
