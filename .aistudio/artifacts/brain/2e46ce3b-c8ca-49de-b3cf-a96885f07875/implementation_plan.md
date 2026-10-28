# Implementation Plan - Multi-Account Auto-Save, Fast Login & Account Switcher

Implement multi-account persistence, fast login matching, and instant account switching in MMU Keep Up.

## User Review Required

> [!IMPORTANT]
> - **Auto-Saving Accounts**: Registered profiles are stored in `localStorage` under `mmu_keep_up_saved_accounts`.
> - **Fast Login**: Users can log in using either their Username or Email + Password matched against saved accounts.
> - **Account Switcher**: Accessible from both the login modal and the top bar profile menu for instant switching between previously saved accounts.

- **Proceed**: Click the Proceed button to execute this plan and update the application.

## Proposed Changes

### Frontend (`/src/App.tsx`)
- Maintain `savedAccounts` state initialized from `localStorage.getItem('mmu_keep_up_saved_accounts')`.
- Update signup handler to push new accounts into `savedAccounts` array.
- Update login handler to match username or email against `savedAccounts`.
- Add an Account Switcher dropdown component in the top bar profile area and inside the authentication login view.

## Verification Plan

### Automated Tests
- Run `compile_applet` and `lint_applet` to verify zero TypeScript or build errors.

### Manual Verification
- Register multiple accounts and verify they persist in `localStorage`.
- Test logging in with username/email and password.
- Test switching accounts instantly using the account switcher in both the top bar and login modal.
