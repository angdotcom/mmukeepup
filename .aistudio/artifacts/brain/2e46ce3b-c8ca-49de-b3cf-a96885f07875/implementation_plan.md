# Implementation Plan - Separate Followed and Unfollowed Clubs Sections

Split campus clubs into two distinct sections ("Following Clubs" and "Explore Clubs") in both the left sidebar and the Clubs Directory tab.

## User Review Required

> [!IMPORTANT]
> - **Following Clubs Section**: Shows clubs where the user is currently following (`followedClubIds.includes(club.id)`), with badge counts and empty state helper text if none followed.
> - **Explore Clubs Section**: Shows remaining available clubs on campus.
> - **Dynamic Transfer**: Clicking Follow instantly moves a club card from Explore to Following, and clicking Unfollow moves it back down.
> - **Dual Placement**: Applied in both the left sidebar and the main Clubs Directory tab.

- **Proceed**: Click the Proceed button to execute this plan and update the application.

## Proposed Changes

### Frontend (`/src/App.tsx`)
- Update sidebar club rendering to split `REGISTERED_CLUBS` into `followedClubs` and `exploreClubs` based on `followedClubIds`.
- Update Clubs Directory tab rendering to also show these two distinct sections.
- Ensure follow/unfollow actions update `followedClubIds` state and trigger notifications.

## Verification Plan

### Automated Tests
- Run `compile_applet` and `lint_applet` to verify zero build or TypeScript errors.

### Manual Verification
- Verify clubs are correctly separated into Following and Explore in both the sidebar and Clubs Directory.
- Click Follow on a club in Explore and verify it instantly moves to Following.
- Click Unfollow and verify it moves back to Explore.
