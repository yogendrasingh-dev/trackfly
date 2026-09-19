# TrackFly UI Implementation Tasks

## Purpose

This document is the execution tracker for TrackFly. It translates the approved product, design, and architecture decisions into ordered implementation and verification work.

The active development phase is:

> Complete the application UI first using centralized, deterministic, typed mock data.

Production repositories, persistence, cloud services, AI calls, notification scheduling, purchases, telemetry, and other integrations are future work. Their architecture may be documented, but they must not be implemented during this phase unless the user explicitly changes the phase.

## Authority and working rules

- Follow root `AGENTS.md` for repository-wide workflow, quality gates, and phase boundaries.
- Follow `docs/PRODUCT.md` for product behavior, terminology, and approved flows.
- Use Google Stitch as the screen-specific visual source of truth.
- Follow `docs/DESIGN.md` for reusable visual tokens, component conventions, and approved design interpretations.
- Follow `docs/ARCHITECTURE.md` for technical boundaries and the future production direction.
- Use this file for sequencing, scope, progress, blockers, and verification evidence. It must not redefine the documents above.
- Do not silently resolve a material conflict. Record it under **Blockers and decisions needed** and escalate it.

## Status model

Each screen or materially distinct state is tracked independently across four dimensions:

- **Implemented:** the route, component, or scenario exists and uses typed mock data.
- **Functionally verified:** the intended local navigation and mock interactions were exercised successfully.
- **Visually verified iOS:** the rendered state was compared with Stitch on a representative iOS phone.
- **Visually verified Android:** the rendered state was compared with Stitch on a representative Android phone.

Checkboxes remain empty until the corresponding work has actually been performed. Compilation, linting, tests, or a code review do not count as visual verification.

Use these phase labels:

- `NOT STARTED`
- `IN PROGRESS`
- `BLOCKED`
- `COMPLETE`

A phase is `COMPLETE` only when its Definition of Done is satisfied. If an emulator or simulator cannot be accessed, record the affected checks as `visual verification pending`; never infer or claim visual completion.

## Active-phase guardrails

### Included

- Expo Router routes and navigation needed to demonstrate all approved UI flows.
- Local component state and Redux Toolkit application/workflow/UI state where justified.
- Centralized typed fixtures, deterministic dates, and explicit mock scenarios.
- Simulated authentication, assistant interpretation, voice states, permissions, offline behavior, account sync, notifications, subscriptions, purchase states, loading, errors, and success flows.
- Light and dark themes.
- Adaptive layouts for supported iOS and Android phones.
- Accessibility, keyboard, scrolling, safe-area, content-variation, and system-chrome behavior.
- Reusable semantic tokens and reusable React Native components.

### Excluded until an explicit phase change

- Supabase, PostgreSQL, Supabase Auth, Row Level Security, and Edge Functions.
- SQLite persistence, migrations, repositories, synchronization, and background upload/download queues.
- Gemini or any other live AI provider.
- Real microphone capture, speech transcription, or media upload.
- Local or push notification scheduling and production permission integrations.
- RevenueCat, StoreKit, Google Play Billing, real purchases, and receipt validation.
- Sentry or another production telemetry service.
- Production environment configuration, secrets, or credentials.
- Speculative service layers or abstractions created only for future integrations.

## Global implementation checklist

- [ ] Keep Expo Router route files under `src/app/`; keep feature implementation code outside route files.
- [ ] Keep route components thin and focused on route parameters and feature composition.
- [ ] Use React Native `StyleSheet` plus typed semantic TrackFly tokens; do not add NativeWind or web Tailwind.
- [ ] Use strict TypeScript and avoid unnecessary `any` and unsafe assertions.
- [ ] Use functional components and hooks.
- [ ] Keep mock entities, dates, and scenario fixtures centralized, typed, and deterministic.
- [ ] Present mock data through feature hooks/controllers instead of importing raw fixtures throughout screens.
- [ ] Do not imitate future production repositories merely to serve mock data.
- [ ] Preserve the canonical dock destinations: Today, Tasks, Assistant, and History.
- [ ] Ensure every AI-interpreted creation shows a structured preview and requires explicit confirmation.
- [ ] Preserve the distinction between tasks and reminders: a due time alone does not create a task alert.
- [ ] Offer Snooze only for reminders or tasks with an explicit alert/current alerted occurrence.
- [ ] Keep basic account backup/sync presentation separate from Pro gating.
- [ ] Do not invent Audio Notes behavior.
- [ ] Keep unresolved pricing, entitlements, limits, providers, and settings visibly provisional in mocks.
- [ ] Bundle approved runtime assets and fonts locally; do not depend on Stitch-hosted runtime URLs.
- [ ] Investigate runtime warnings and console errors before marking a phase complete.

## Required screen workflow

For every screen or materially distinct state:

1. Inspect the exact Stitch screen and relevant metadata/reference output.
2. Inspect existing reusable tokens and components.
3. Implement with typed mock data.
4. Run the application.
5. Render the target state in a simulator or emulator.
6. Compare layout, type, spacing, colors, geometry, imagery, icons, elevation, system chrome, scrolling, and interaction behavior with Stitch.
7. Record meaningful discrepancies.
8. Correct them.
9. Render and compare again.
10. Repeat until no meaningful discrepancy remains.
11. Record functional and visual verification evidence.
12. Mark the state complete only after all applicable checks pass.

Representative coverage may be reused when states share the same already-verified layout and component behavior. Do not test every redundant device × theme × state permutation, but visually inspect every materially distinct layout/state and retain compact/large, iOS/Android, and light/dark representative coverage across the relevant screen family.

## Phase 1 — Foundation, route shell, and mock harness

**Status:** `NOT STARTED`

**Dependencies:** None

### Objective

Establish a clean UI-only foundation that can support the complete Stitch inventory without introducing production integrations.

### Scope

- Reconcile the remaining starter project and reset-script references without restoring unused template UI.
- Establish the approved `src/app/` Expo Router structure and route groups.
- Add the typed theme, asset, mock-scenario, and state foundations needed by later phases.
- Preserve development-build compatibility; do not design around Expo Go limitations.

### Stitch coverage

| Reference | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| TrackFly Brand Mark | `4bb8af66f60c444c9ff75c90d70bd031` | [ ] | [ ] | [ ] | [ ] | Asset/component, not a route |

### Implementation tasks

- [ ] Inspect the brand-mark asset in Stitch before adding it to the application.
- [ ] Reconcile `package.json` scripts with the current repository state, including the deleted reset script.
- [ ] Define route groups for onboarding/auth, tabs, supporting flows, and true modal routes.
- [ ] Add a predictable development entry path for reaching mock scenarios without turning every state into a route.
- [ ] Define shared TypeScript types for mock entities and scenario identifiers.
- [ ] Define deterministic fixture dates/times and a controllable mock clock.
- [ ] Define a single mock scenario registry with stable IDs and descriptions.
- [ ] Establish the smallest justified Redux Toolkit store for cross-route UI/workflow state.
- [ ] Keep ephemeral form, focus, expanded/collapsed, and animation state local to components.
- [ ] Ensure theme selection and scenario selection can be exercised locally.
- [ ] Acquire or confirm local production-usable brand and font assets before depending on them.

### Likely areas

- `src/app/`
- `src/features/`
- `src/mocks/`
- `src/store/`
- `src/theme/`
- `src/components/`
- `src/assets/` or the existing approved asset location

### Mock scenarios

- [ ] Default guest session.
- [ ] Simulated authenticated session.
- [ ] Light and dark theme selection.
- [ ] Deterministic current date/time.
- [ ] Direct selection of later screen states for verification.

### Verification checklist

- [ ] App starts in the development build without runtime errors.
- [ ] Root navigation and scenario selection are deterministic across reloads as intended.
- [ ] Brand mark renders from a local approved asset and is not redrawn from a generic icon.
- [ ] Type checking and linting pass using the repository's actual commands.
- [ ] No production integration package or configuration was added.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- The route shell, theme entry point, store entry point, and typed scenario registry support subsequent phases.
- The brand mark is locally available and visually checked where it first appears.
- There are no remaining broken starter references in active scripts or routes.
- No production persistence, backend, AI, notification, subscription, or telemetry implementation exists.

## Phase 2 — Visual system, shared primitives, and navigation shell

**Status:** `NOT STARTED`

**Dependencies:** Phase 1

### Objective

Implement the reusable visual foundation demonstrated by Stitch and documented in `docs/DESIGN.md`.

### Scope

- Semantic light/dark color tokens, typography, spacing, radii, borders, and elevation roles.
- Shared screen surfaces, headers, controls, cards, rows, chips, fields, state views, overlays, and dock navigation.
- Adaptive phone behavior without a fixed 390-point canvas.

### Implementation tasks

- [ ] Inspect representative Stitch screens for each shared component family before implementation.
- [ ] Add typed semantic light and dark theme tokens.
- [ ] Load Inter and JetBrains Mono from approved local assets.
- [ ] Implement `ScreenSurface` with safe-area, static/scrolling, and bottom-dock accommodations.
- [ ] Implement `AppHeader` variants supported by Stitch.
- [ ] Implement the canonical `BottomDock` with Today, Tasks, Assistant, and History.
- [ ] Implement `Button`, `IconButton`, and `AvatarButton` variants supported by evidence.
- [ ] Implement `SurfaceCard`, `ListRow`, chips/tags, fields, text areas, and grouped sections.
- [ ] Implement `QuickCaptureBar`, assistant message/card primitives, and task/reminder row primitives.
- [ ] Implement reusable bottom sheet, dialog, state-view, skeleton, and purchase presentation primitives.
- [ ] Select an Expo-compatible icon approach based on visual fidelity; Stitch's Material Symbols markup does not approve a dependency.
- [ ] Use optional press scaling only where approved Stitch behavior/reference supports it.
- [ ] Add semantic accessibility roles, labels, state, focus behavior, and touch targets.

### Verification checklist

- [ ] Shared components render correctly in light and dark themes.
- [ ] Compact and large phone widths do not clip or over-stretch core primitives.
- [ ] Safe areas and bottom system insets are respected on iOS and Android.
- [ ] Dynamic text wraps or grows without fixed-height clipping.
- [ ] Keyboard-sensitive primitives remain reachable.
- [ ] Hairlines, shadows/elevation, blur fallbacks, and system chrome are calibrated per platform.
- [ ] No arbitrary visual values are scattered across route screens when a semantic token exists.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- Later screens can be composed primarily from shared tokens and primitives.
- The dock and global surfaces are adaptive, accessible, and visually compared on representative iOS and Android phones.
- Shared abstractions reflect demonstrated repetition and do not form a speculative design-system framework.

## Phase 3 — Welcome, onboarding, and simulated account entry

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–2

### Objective

Deliver the guest-first entry experience, onboarding sequence, and locally simulated account flows.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| Welcome & Onboarding | `1b21e26c7d884ca993ecfe13cceb95e0` | [ ] | [ ] | [ ] | [ ] | Guest-first entry |
| Onboarding 1: Remember Less | `54414e8396e34114bbf26a461483d11a` | [ ] | [ ] | [ ] | [ ] | Onboarding state |
| Onboarding 2: Say It Naturally | `e5d3d70bd3044ad5b6e1876425f5aec8` | [ ] | [ ] | [ ] | [ ] | Onboarding state |
| Onboarding 3: Never Miss | `1321379cf0354b159c03485e087a719d` | [ ] | [ ] | [ ] | [ ] | Onboarding state |
| Account Entry | `83bb7cbbc8b54936b2bb6cc6b636d3d9` | [ ] | [ ] | [ ] | [ ] | Simulated choices only |
| Sign In | `d526aac9a7c144f19911fe5ccc098ac4` | [ ] | [ ] | [ ] | [ ] | No Supabase Auth |
| Create Account | `caf84836302f447eadf7629b7ba5c85b` | [ ] | [ ] | [ ] | [ ] | No real account creation |
| Forgot Password | `5d22a5fe8f7649b397fe6eae17c2746b` | [ ] | [ ] | [ ] | [ ] | Simulated submission |

### Implementation tasks

- [ ] Implement the complete onboarding sequence and skip/continue navigation.
- [ ] Preserve guest continuation as a first-class path.
- [ ] Implement account entry, sign-in, account creation, and password recovery forms.
- [ ] Use local validation and deterministic simulated success/error states.
- [ ] Keep exact identity-provider availability unresolved; do not imply a production provider decision.
- [ ] Handle keyboard avoidance, autofill semantics, password visibility, focus order, and long error text.
- [ ] Ensure simulated authentication does not discard guest mock data.

### Mock scenarios

- [ ] First launch.
- [ ] Returning guest.
- [ ] Simulated sign-in success.
- [ ] Invalid or incomplete credentials.
- [ ] Simulated account creation success.
- [ ] Simulated password-reset submission.
- [ ] Long name/email and localized-style strings.

### Verification checklist

- [ ] All entry routes and local interactions are reachable end-to-end.
- [ ] Keyboard-open layouts remain usable on compact iOS and Android phones.
- [ ] Onboarding art, type, controls, progress, and spacing have been compared with Stitch.
- [ ] Light and derived dark presentations use semantic tokens without changing layout or content.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- Guest and simulated account paths work locally without real authentication.
- Every materially distinct entry/onboarding layout has been visually inspected.
- Forms remain adaptive and accessible with the keyboard visible and content variations applied.

## Phase 4 — Today, Tasks, and search

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–2

### Objective

Implement the primary task/reminder browsing surfaces and their populated, empty, loading, search, and dark states.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| Today Home | `f3fb0729c1d94468a2cdaa15eed31241` | [ ] | [ ] | [ ] | [ ] | Populated light |
| Empty Today | `53c6eb7c37dc43e3ae8e18134a7e8dd0` | [ ] | [ ] | [ ] | [ ] | Empty state |
| Today Loading | `abb6e92c8cb04b0282973ee82c562160` | [ ] | [ ] | [ ] | [ ] | Skeleton/loading |
| Today Dark | `2680f8413ddb4006b3d4356617aed2e0` | [ ] | [ ] | [ ] | [ ] | Explicit dark authority |
| Tasks | `23557b5041894319be437ac071777dd9` | [ ] | [ ] | [ ] | [ ] | Structure derives from Tasks Dark where needed |
| Empty Tasks | `c8b60f791ca74b7dad1206326e584647` | [ ] | [ ] | [ ] | [ ] | Empty state |
| Tasks Loading | `af8b1171f33846a8ac1b042293512497` | [ ] | [ ] | [ ] | [ ] | Skeleton/loading |
| No Search Results | `55ecc139d25b4fdd85efae3abbc66f37` | [ ] | [ ] | [ ] | [ ] | Search state |
| Tasks Dark | `98997bdc6b2848ec86f3b800b2cc868c` | [ ] | [ ] | [ ] | [ ] | Structural and dark authority |

### Implementation tasks

- [ ] Implement Today with typed task, reminder, alert, and occurrence fixtures.
- [ ] Implement Tasks with filters/search supported by the references.
- [ ] Use the Tasks Dark structure as the approved source for populated light Tasks, mapped through light tokens.
- [ ] Implement deterministic empty, loading, no-results, and populated scenarios.
- [ ] Implement local completion/toggle behavior without persistence.
- [ ] Show Snooze only for reminders and tasks with an explicit alert/current alerted occurrence.
- [ ] Keep due task metadata distinct from task alert metadata.
- [ ] Use list virtualization where fixture volume is substantial.
- [ ] Reserve dock clearance and preserve scroll position during local state changes.

### Mock scenarios

- [ ] Mixed populated Today.
- [ ] Empty Today.
- [ ] Today loading.
- [ ] Populated Tasks with enough rows to scroll.
- [ ] Empty Tasks.
- [ ] Tasks loading.
- [ ] Search matches.
- [ ] No search results.
- [ ] Long titles/tags, empty optional metadata, and many items.
- [ ] Reminder, due-only task, and explicitly alerted task.

### Verification checklist

- [ ] Today and Tasks are reachable through the canonical dock.
- [ ] Search and local filters behave deterministically.
- [ ] Completion and eligible snooze affordances follow product rules.
- [ ] Compact/large phone, iOS/Android, and light/dark representative coverage is recorded.
- [ ] Every materially distinct populated/empty/loading/no-results layout is visually inspected.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- Today and Tasks support all listed scenarios and local interactions.
- Their shared rows, sections, loading states, search behavior, and dock integration are visually faithful and adaptive.
- No task gains notification or Snooze semantics merely from having a due date/time.

## Phase 5 — Task and reminder lifecycle

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–4

### Objective

Implement manual task and reminder creation/editing, details, reminder success/failure feedback, and occurrence-aware Snooze UI using local mock state. Task create/edit/details are derived from the approved reminder patterns because they do not have dedicated Stitch references.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| Create & Edit Reminder | `369933a2dc6a46fca18c70d34934ff50` | [ ] | [ ] | [ ] | [ ] | Shared form presentation |
| Reminder Details | `ee12f37d3e34401ebca45d1fabdf9069` | [ ] | [ ] | [ ] | [ ] | Detail state |
| Snooze Bottom Sheet | `4f7e9eb4c9d841f2bb19f79f895970e3` | [ ] | [ ] | [ ] | [ ] | Current occurrence only |
| Reminder Creation Failure | `1336a16636e9419abf847918df469f93` | [ ] | [ ] | [ ] | [ ] | Recoverable error |
| First Reminder Success | `e7730c85c65b4af99d326166a962ab48` | [ ] | [ ] | [ ] | [ ] | Success state |

### Derived task-screen coverage

These screens are not direct Stitch references. Their visual structure must be derived from the approved reminder create/edit/details patterns and reuse the same TrackFly design tokens, form primitives, headers, cards, spacing, and interaction conventions. They still require full iOS and Android visual verification and a consistency review against those approved patterns.

| Route/scenario | Visual basis | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| Create Task | Derived from approved reminder patterns | [ ] | [ ] | [ ] | [ ] | Not a direct Stitch reference |
| Edit Task | Derived from approved reminder patterns | [ ] | [ ] | [ ] | [ ] | Not a direct Stitch reference |
| Task Details | Derived from approved reminder patterns | [ ] | [ ] | [ ] | [ ] | Not a direct Stitch reference |

### Implementation tasks

- [ ] Implement the manual reminder form with local validation.
- [ ] Support create and edit presentation without implying persistence.
- [ ] Implement details and local completion behavior.
- [ ] Implement derived Task create, edit, and details screens using the approved reminder patterns and shared TrackFly primitives.
- [ ] Adapt derived Task content and controls to `docs/PRODUCT.md` task semantics rather than copying reminder-only behavior.
- [ ] Make a task's due date/time optional and ensure a due date/time alone never implies an alert.
- [ ] Present task alert controls explicitly and distinctly from due date/time controls.
- [ ] Offer Task Snooze only when the task has an explicit alert/current alerted occurrence.
- [ ] Do not introduce reminder-only recurrence behavior into Task create, edit, or details UI.
- [ ] Implement Snooze as an occurrence action, not a recurrence-rule rewrite.
- [ ] Implement deterministic success and failure scenarios with retry/recovery.
- [ ] Preserve unresolved recurring edit/delete scope; do not add unsupported scope choices.
- [ ] Avoid hardcoding unresolved timezone/DST recurrence behavior into UI logic.
- [ ] Keep form fields reachable with the keyboard visible.
- [ ] Do not infer attachment behavior from visual decoration alone.

### Mock scenarios

- [ ] One-time reminder.
- [ ] Recurring reminder with a current occurrence.
- [ ] Task without a due date/time or alert.
- [ ] Task with an optional due date/time and no alert.
- [ ] Task with an explicit alert/current alerted occurrence.
- [ ] Create and edit modes.
- [ ] Validation error.
- [ ] Simulated creation failure and retry.
- [ ] First reminder success.
- [ ] Snooze preset and custom presentation where supported.
- [ ] Long title/notes and compact-height keyboard state.

### Verification checklist

- [ ] Create/edit/detail navigation works with local state.
- [ ] Derived Task create/edit/details screens are reviewed for consistency with the approved reminder patterns without being represented as direct Stitch designs.
- [ ] Derived Task screens receive full iOS and Android visual verification.
- [ ] Due date/time, explicit alert, and Snooze eligibility remain visually and behaviorally distinct in every Task scenario.
- [ ] No reminder-only recurrence control or behavior appears in Task UI.
- [ ] Snooze changes only the selected mock occurrence.
- [ ] Failure does not erase entered mock form data.
- [ ] Sheets use the correct underlying context, scrim, insets, and adaptive height.
- [ ] Materially distinct form, detail, sheet, error, and success layouts are visually inspected.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- The complete task and reminder lifecycles can be demonstrated locally.
- Task create/edit/details are clearly recorded as derived from approved reminder patterns and have passed full iOS/Android visual verification and consistency review.
- Task due date/time remains optional, alert UI remains explicit, and Task Snooze appears only for an explicit alert/current alerted occurrence.
- Derived Task UI contains no reminder-only recurrence behavior.
- Product rules for recurrence occurrences and Snooze are preserved without deciding open recurring edit/delete behavior.
- All listed states have functional and required representative visual verification.

## Phase 6 — Assistant, clarification, AI states, and voice presentation

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–5

### Objective

Implement the complete assistant experience as deterministic local simulation, including mandatory structured preview and explicit confirmation.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| AI Assistant | `9c9cc8ae1cf64db5a74b2743a0f2f298` | [ ] | [ ] | [ ] | [ ] | Local simulated assistant |
| AI Clarification | `79cc7e416dc1461882973d002ca5c5ca` | [ ] | [ ] | [ ] | [ ] | Ambiguous input flow |
| AI Processing Error | `07ea4107e75e48a2bff88f1bc6f6f4e6` | [ ] | [ ] | [ ] | [ ] | Recoverable error |
| AI Usage Limit | `b605c6bbac70431f832e35cb39803126` | [ ] | [ ] | [ ] | [ ] | Placeholder policy/copy |
| Assistant Dark | `16289e7783504266854939b91605149a` | [ ] | [ ] | [ ] | [ ] | Explicit dark authority |
| Voice Listening | `33d974f2957248dfa1ba40bebbd8a76b` | [ ] | [ ] | [ ] | [ ] | Simulated, no capture |
| Voice Transcribing | `23a67f73e1744294ad78e0d949328613` | [ ] | [ ] | [ ] | [ ] | Simulated, no transcription |
| Voice Failure | `e301979a849a45a48652a8abb3bd9013` | [ ] | [ ] | [ ] | [ ] | Recoverable simulated error |

### Implementation tasks

- [ ] Build deterministic assistant fixtures for task intent, reminder intent, clarification, error, and usage-limit responses.
- [ ] Present every interpreted task/reminder as a structured preview.
- [ ] Require explicit user confirmation before adding the mock item to local application state.
- [ ] Ensure cancellation or editing of a preview does not create the item.
- [ ] Keep deterministic business rules outside the simulated AI response layer.
- [ ] Implement listening, transcribing, and failure as local visual/workflow states only.
- [ ] Do not request real microphone access or invoke real speech/AI services.
- [ ] Keep provider/model details and confidence internals out of user-facing UI unless Stitch explicitly shows them.
- [ ] Preserve the canonical four-destination dock; state changes occur within Assistant rather than adding destinations.

### Mock scenarios

- [ ] Clear reminder interpretation.
- [ ] Clear task interpretation without an alert.
- [ ] Task interpretation with an explicit alert.
- [ ] Ambiguous date/time requiring clarification.
- [ ] Preview edit, cancel, and confirm.
- [ ] Simulated processing failure and retry.
- [ ] Simulated usage limit.
- [ ] Voice listening, transcribing, and failure.
- [ ] Keyboard-open typed input and long structured preview.

### Verification checklist

- [ ] No simulated AI creation bypasses preview and confirmation.
- [ ] Manual creation remains reachable when assistant scenarios fail or are offline.
- [ ] Assistant composer clears system insets, dock, and keyboard.
- [ ] Voice states are visibly and semantically distinguishable.
- [ ] Explicit Assistant dark and derived dark voice/error states are visually inspected.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- The complete assistant flow is demonstrable without network, Gemini, or microphone access.
- Structured preview and explicit confirmation are enforced for all interpreted creations.
- All listed assistant and voice states are implemented and appropriately verified.

## Phase 7 — History, Settings, Profile, and simulated account sync

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–6

### Objective

Implement history, settings, profile, and authenticated backup/sync presentation using local scenarios.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| History | `e70344b315474a5682565a908eed9e43` | [ ] | [ ] | [ ] | [ ] | Populated history |
| Empty History | `624c22838e1f46f68f7d249dcc04c8cd` | [ ] | [ ] | [ ] | [ ] | Empty state |
| History Loading | `578e630779c740af9c6e8a9bc807a7c2` | [ ] | [ ] | [ ] | [ ] | Loading state |
| Settings | `28df8e70842d4dafa932d1b7e05768a5` | [ ] | [ ] | [ ] | [ ] | Light authority |
| Settings Dark | `06183b0975064707b2a04a7eeae76052` | [ ] | [ ] | [ ] | [ ] | Explicit dark authority |
| Profile | `dedb164808084f87b70b17466757e250` | [ ] | [ ] | [ ] | [ ] | Local form/profile state |
| Account Sync Complete | `b24b591bc8d64ea2bd2285a82c506d42` | [ ] | [ ] | [ ] | [ ] | Simulated sync success |

### Implementation tasks

- [ ] Implement populated, empty, and loading History scenarios.
- [ ] Keep history retention and restoration behavior unresolved; do not add unapproved restore actions.
- [ ] Implement Settings groups and navigation using only approved/documented entries.
- [ ] Implement Profile with local editable fields and deterministic validation.
- [ ] Simulate account/sync status without Supabase, persistence, or network calls.
- [ ] Present basic backup/cross-device sync as an authenticated capability, not a Pro entitlement.
- [ ] Preserve local guest fixtures when switching to a simulated authenticated state.
- [ ] Ensure simulated auth/sync failure cannot destroy or reset local mock data.

### Mock scenarios

- [ ] Populated History.
- [ ] Empty History.
- [ ] History loading.
- [ ] Guest Settings.
- [ ] Authenticated Settings.
- [ ] Profile edit and validation.
- [ ] Simulated sync in progress, success, and recoverable failure where needed for flow completeness.

### Verification checklist

- [ ] History is reachable from the canonical dock.
- [ ] Settings and Profile navigation works without real account infrastructure.
- [ ] Simulated sign-out/account changes do not silently discard guest data.
- [ ] Explicit Settings dark and derived dark supporting states are visually inspected.
- [ ] Long profile values and long settings labels wrap without breaking rows.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- History, Settings, Profile, and account-sync presentations work end-to-end with local state.
- The UI does not imply that basic authenticated backup/sync is Pro-only.
- Open history, identity-provider, and production sync decisions remain undecided.

## Phase 8 — Notification UI, permissions, and offline behavior

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–7

### Objective

Implement notification settings, permission education, disabled-access states, and offline presentation without calling production permission or scheduling APIs.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| Notification Settings | `330c9df709d842bdbffcb1f35b7e3075` | [ ] | [ ] | [ ] | [ ] | Controls remain provisional where unresolved |
| Notification Pre-Permission | `8e9d0d8eecb148cba4a2c9ad3e6ab2e7` | [ ] | [ ] | [ ] | [ ] | Educational UI only |
| Notifications Off | `fb16cefd254d4069a41d2fe7d16fbe6d` | [ ] | [ ] | [ ] | [ ] | Simulated system state |
| Microphone Permission Sheet | `312c5f1a88b24c3f856fdff94f96d31a` | [ ] | [ ] | [ ] | [ ] | Presentation only |
| Microphone Access Off | `c11488dd5a8c4223933677e36198de87` | [ ] | [ ] | [ ] | [ ] | Simulated system state |
| Offline State | `bdb08bf6272245edae7db825d0fe6726` | [ ] | [ ] | [ ] | [ ] | Local-first messaging |

### Implementation tasks

- [ ] Implement notification settings presentation without deciding unresolved V1 settings.
- [ ] Implement pre-permission education and notifications-off recovery UI.
- [ ] Implement microphone permission sheet and access-off recovery UI.
- [ ] Simulate permission choices locally; do not invoke system permission APIs in this phase.
- [ ] Implement offline messaging and local fallback actions.
- [ ] Keep manual creation and deterministic local interactions available in offline scenarios.
- [ ] Avoid implying that normal reminder delivery depends on cloud push.
- [ ] Keep platform-specific settings links or permission behavior mocked unless explicitly approved.

### Mock scenarios

- [ ] Notification permission not determined.
- [ ] Notifications disabled.
- [ ] Microphone permission not determined.
- [ ] Microphone disabled.
- [ ] Offline while browsing local data.
- [ ] Offline while attempting simulated assistant interpretation.
- [ ] Return to manual creation from an unavailable assistant/voice flow.

### Verification checklist

- [ ] Permission surfaces render as sheets/screens according to their Stitch evidence.
- [ ] Denial and dismissal paths do not trap the user.
- [ ] Offline state preserves access to local mock content and manual creation.
- [ ] Insets, scrims, and platform system chrome are checked on iOS and Android.
- [ ] Derived dark permission/offline variants retain their light layouts.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- All listed notification, microphone, and offline states are locally demonstrable.
- The UI does not perform real permission requests or notification scheduling.
- Local-first fallback behavior is clear and usable.

## Phase 9 — Pro, plan, purchase, and restore presentation

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–8

### Objective

Implement the complete subscription and purchase UI as deterministic local simulation while leaving pricing and entitlement policy unresolved.

### Stitch coverage

| Route/scenario | Stitch ID | Implemented | Functional | iOS | Android | Notes |
|---|---|---:|---:|---:|---:|---|
| TrackFly Pro Paywall | `a21995ba7351436a8181ca2bd1fc53e7` | [ ] | [ ] | [ ] | [ ] | Placeholder offer data |
| Your Plan (Free) | `5801d9fe0f0840dc9cffcbea97fa2acc` | [ ] | [ ] | [ ] | [ ] | No final entitlement claims |
| Your Plan (Pro) | `bbd4aa7cec814283a12e6657647d2398` | [ ] | [ ] | [ ] | [ ] | Simulated entitlement |
| Pro Feature Gate | `0523e534e21541c5b23ebb1b38763b4c` | [ ] | [ ] | [ ] | [ ] | Gate target remains provisional |
| Purchase Processing | `0201d9d31a564fb2827a522b743f3473` | [ ] | [ ] | [ ] | [ ] | Blocking simulated state |
| Purchase Success | `c99bee7639ff4fe1ab79bb0fcb1426c1` | [ ] | [ ] | [ ] | [ ] | Simulated success |
| Purchase Failed | `6eff4c8c2f1d4e148c0fa407823850e3` | [ ] | [ ] | [ ] | [ ] | Recoverable simulated failure |
| Restore Purchases States | `aee3980744d4412fa92f44d10c9ba9e5` | [ ] | [ ] | [ ] | [ ] | Deterministic state sequence |
| TrackFly Pro Dark | `26533e2dd36e473da6883494f5da03b8` | [ ] | [ ] | [ ] | [ ] | Explicit dark authority |

### Implementation tasks

- [ ] Implement paywall, Free plan, Pro plan, and feature-gate presentation.
- [ ] Implement deterministic processing, success, failure, and restore state transitions.
- [ ] Keep all offers, prices, discounts, trials, entitlements, and usage limits explicitly provisional.
- [ ] Do not gate basic authenticated backup or cross-device sync behind Pro.
- [ ] Do not add RevenueCat, billing SDKs, receipt handling, or store calls.
- [ ] Ensure failure and cancellation return to a stable usable state.
- [ ] Prevent duplicate local action while the simulated transaction is processing.

### Mock scenarios

- [ ] Free plan.
- [ ] Simulated Pro plan.
- [ ] Feature gate.
- [ ] Purchase processing.
- [ ] Purchase success.
- [ ] Purchase failure and retry.
- [ ] Restore processing, restored, nothing-to-restore, and failure as supported by the reference.
- [ ] Long localized-style price/offer copy.

### Verification checklist

- [ ] Every purchase state is reachable without a real store or RevenueCat.
- [ ] Processing overlays block only the intended interactions.
- [ ] Purchase errors are recoverable.
- [ ] Explicit Pro dark and derived dark transaction states are visually inspected.
- [ ] Compact-height devices can scroll to all actions and legal/support copy.

### Verification evidence

| Date | Platform/device | Theme/state | Command or action | Result/discrepancies |
|---|---|---|---|---|
| — | — | — | Not yet run | Pending |

### Definition of Done

- The complete Pro and transaction presentation is demonstrable with local scenarios.
- No production purchase or entitlement behavior is implied or implemented.
- The UI remains adaptable when final pricing and entitlement copy changes.

## Phase 10 — Dark-mode completion, adaptive layout, and accessibility hardening

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–9

### Objective

Complete cross-screen theme derivation and harden the full UI for supported phone sizes, content variation, keyboard behavior, and accessibility.

### Implementation tasks

- [ ] Audit every screen/state for semantic token usage.
- [ ] Treat the five explicit dark references as authoritative anchors.
- [ ] Derive missing dark screens from the approved dark tokens while preserving light layout and behavior.
- [ ] Verify no dark variant introduces new content, navigation, or product behavior.
- [ ] Audit compact and large phone layouts on iOS and Android.
- [ ] Audit safe areas, status bar, Android navigation bar, home indicator, headers, docks, sheets, and overlays.
- [ ] Audit keyboard-visible forms and assistant composer states.
- [ ] Audit long names, long localized-style strings, empty values, many list rows, wrapping, and content growth.
- [ ] Audit supported accessibility font scaling and record any intentionally constrained text.
- [ ] Audit roles, labels, state announcements, focus behavior, contrast, and touch targets.
- [ ] Audit reduced-motion behavior for any implemented animation.
- [ ] Remove avoidable duplicated styles/components discovered during the audit.
- [ ] Fix every meaningful visual discrepancy found before completion.

### Representative verification matrix

Record the actual available devices rather than inventing or hardcoding model names.

| Platform | Size class | Light | Dark | Keyboard/content/accessibility coverage | Status |
|---|---|---:|---:|---|---|
| iOS | Compact phone | [ ] | [ ] | [ ] | Pending |
| iOS | Large phone | [ ] | [ ] | [ ] | Pending |
| Android | Compact phone | [ ] | [ ] | [ ] | Pending |
| Android | Large phone | [ ] | [ ] | [ ] | Pending |

Representative results may cover states that share the same verified component/layout behavior. Every materially distinct layout/state must still be rendered and inspected at least once on an appropriate platform/theme combination.

### Verification evidence

| Date | Platform/device/viewport | Theme | Screen/scenario | Checks performed | Discrepancies and corrections | Result |
|---|---|---|---|---|---|---|
| — | — | — | — | Not yet run | Pending | Pending |

### Definition of Done

- Every materially distinct layout/state has been visually inspected.
- The matrix includes representative compact and large iOS and Android phones and light/dark coverage.
- Shared behavior is not redundantly retested without reason, but no unique layout or state is skipped.
- No known meaningful mismatch remains in hierarchy, spacing rhythm, alignment, typography, color role, component geometry, iconography, responsive behavior, or interaction state.
- Any unavailable simulator/emulator coverage is explicitly pending, which prevents this phase from being marked complete.

## Phase 11 — End-to-end UI verification and phase completion

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–10

### Objective

Verify that the complete mock application is coherent, reachable, stable, and visually faithful before beginning any production integration phase.

### End-to-end flows

- [ ] First launch → onboarding → continue as guest → Today.
- [ ] First launch → onboarding → simulated account entry → Today.
- [ ] Today/Tasks → manual task or reminder creation → details → completion/Snooze where eligible → History.
- [ ] Assistant input → clarification if needed → structured preview → edit/cancel/confirm → local item visible.
- [ ] Assistant/voice failure or offline → manual creation fallback.
- [ ] Settings → Profile → simulated authenticated sync completion.
- [ ] Settings → notification and microphone permission education/recovery states.
- [ ] Free plan → feature gate/paywall → simulated processing → success/failure/restore states.
- [ ] Canonical dock navigation across Today, Tasks, Assistant, and History.

### Repository checks

- [ ] Run the actual TypeScript check command and record the result.
- [ ] Run the actual lint command and record the result.
- [ ] Run applicable unit/component/integration tests and record the result.
- [ ] Run development builds on representative iOS and Android targets and record the result.
- [ ] Confirm there are no unresolved runtime errors or warnings.
- [ ] Confirm no production service, credential, migration, repository, or integration package was added.
- [ ] Confirm no Stitch-hosted asset URL is a runtime dependency.
- [ ] Confirm every Stitch entry is accounted for exactly once in this tracker.

### Final verification record

| Date | Check/flow | Platform/device | Command or action | Result | Remaining work |
|---|---|---|---|---|---|
| — | — | — | Not yet run | Pending | Pending |

### Overall UI-phase Definition of Done

- [ ] Every applicable Stitch state is reachable through navigation or an explicit mock scenario.
- [ ] All 52 mobile UI screens/states and the brand asset are accounted for.
- [ ] Shared semantic tokens and components are used consistently.
- [ ] All four primary destinations and supporting flows work end-to-end.
- [ ] Typed deterministic mock data covers normal, empty, loading, error, permission, offline, success, and content-variation cases.
- [ ] Every AI-interpreted creation requires structured preview and explicit confirmation.
- [ ] Task, reminder, alert, occurrence, and Snooze behavior follows `docs/PRODUCT.md`.
- [ ] Required representative iOS and Android visual checks are complete.
- [ ] Required light and dark checks are complete.
- [ ] Every materially distinct layout/state has been visually inspected.
- [ ] Meaningful discrepancies were corrected and rechecked.
- [ ] Accessibility, keyboard, safe-area, scrolling, and content-growth checks are complete.
- [ ] Type checking, linting, and applicable automated tests pass.
- [ ] No prohibited production integration or speculative future architecture has been introduced.
- [ ] Verification evidence records only work actually performed.
- [ ] No known blocker remains for the UI-only phase.

## Stitch inventory accounting

The phase assignments account for the complete current Stitch inventory without treating every entry as a route:

| Phase | Owned entries |
|---|---:|
| Phase 1 — Foundation/brand asset | 1 |
| Phase 3 — Welcome/onboarding/account entry | 8 |
| Phase 4 — Today/Tasks/search | 9 |
| Phase 5 — Task/reminder lifecycle | 5 |
| Phase 6 — Assistant/voice | 8 |
| Phase 7 — History/Settings/Profile/sync | 7 |
| Phase 8 — Notifications/permissions/offline | 6 |
| Phase 9 — Subscription/purchase | 9 |
| **Total** | **53** |

Phases 2, 10, and 11 provide shared implementation and verification work and do not claim additional unique Stitch entries.

## Blockers and decisions needed

These items must remain visible and must not be silently invented during implementation:

- **Recurring edit/delete scope:** Whether actions affect one occurrence, future occurrences, or the series remains unresolved.
- **Timezone and DST recurrence behavior:** Production semantics remain unresolved; mock UI must not encode an accidental policy.
- **Authentication providers:** Exact providers remain unresolved; provider buttons in mock UI are presentation only.
- **History retention/restoration:** Exact retention and restoration behavior remains unresolved.
- **Notification settings:** The exact V1 settings set remains unresolved; do not turn visual controls into product commitments.
- **Free/Pro policy:** Final entitlements, limits, prices, trials, and discounts remain unresolved.
- **Icon implementation:** Final Expo-compatible icon library and glyph mapping require implementation-time fidelity evaluation.
- **Assets and fonts:** Licensing and final local files for fonts, brand assets, and any photography must be confirmed before shipping.
- **Native app presentation:** Final app icon, native splash, blur fallback, native shadow/elevation calibration, and detailed motion values need implementation-time confirmation.
- **Device availability:** Exact representative simulator/emulator models depend on the local environment. Missing platform coverage must remain marked pending.

## Future production phases — inactive

The following phases may be planned in more detail only after an explicit phase change. They are not active checklist work now:

1. SQLite local persistence and migrations.
2. Deterministic local notification scheduling and permission integration.
3. Supabase Auth, PostgreSQL schema, RLS, and guest-data adoption.
4. Local-to-cloud synchronization, retries, tombstones, and conflict handling.
5. Supabase Edge Functions and the server-side Gemini provider.
6. RevenueCat and store billing integration near monetization/release.
7. Sentry and production observability before release.
8. Production security, privacy, release, and store-readiness verification.

Activating any future phase requires explicit authorization and a corresponding update to this tracker. RevenueCat webhook and subscription verification belongs to the future monetization phase, not the current UI phase or the initial backend implementation.
