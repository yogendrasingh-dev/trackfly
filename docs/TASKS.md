# TrackFly Execution Roadmap

## Strategy and operating rules

This is TrackFly's six-phase execution tracker. The delivery strategy is **functionality first; final visual verification last**. Make the guest-first offline product useful end to end, then add connected intelligence and monetization, and perform exhaustive UI comparison only after functionality is complete.

Authority remains with the user's instructions, root `AGENTS.md`, `docs/PRODUCT.md`, Google Stitch project `projects/6783092224109966385`, `docs/DESIGN.md`, and `docs/ARCHITECTURE.md` for their documented responsibilities. This tracker sequences work and records evidence; it must not silently redefine those sources.

Use `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, or `COMPLETE`. For Phases 1–5 track **Implemented**, **Functionally verified**, **Automated checks**, and **Notes**. Historical visual evidence in Phases 1–2 may be retained when it was genuinely produced. Starting with Phase 3, implementation phases do not require or claim Stitch, iOS, or Android visual verification. Phase 6 alone tracks **Stitch verified**, **iOS verified**, **Android verified**, **Light verified**, **Dark verified**, **Accessibility verified**, and **Final result**.

Evidence must name only commands and checks actually performed. Compilation, linting, tests, or code review do not count as visual verification.

### Product invariants

- Guest use and manual Task/Reminder management work offline without account, cloud, AI, or voice.
- A Reminder is alert-oriented. A Task due date/time never implies an alert; Task alerts are explicit.
- Snooze applies only to an eligible Reminder occurrence or a Task with an explicit current/pending alert, and never rewrites recurrence.
- Completing a recurring item affects the current occurrence, not its recurrence rule.
- AI never silently creates an item: every interpretation receives a structured preview and explicit confirmation.
- Deterministic code owns validation, persistence, recurrence, completion, Snooze, deletion, notifications, synchronization, permissions, purchases, and feature access.
- Basic authenticated backup and cross-device sync are not Pro-only.
- Recoverable failures preserve user input, drafts, and local data.
- Today, Tasks, Assistant, and History are the only primary destinations.

## Phase 1 — Foundation and Project Setup

**Status:** `COMPLETE`

**Dependencies:** None

### Objective

Provide the Expo Router shell, strict typed project foundation, deterministic mock harness, Redux/theme entry points, and local TrackFly brand asset required by later work.

### Scope

- Expo Router route groups and provider shell.
- Strict TypeScript, deterministic scenarios, minimal shared workflow state, theme entry point, and local brand asset.

### Implementation tasks

- [x] Establish the single `src/app/` route root and onboarding/auth/app/tab/supporting/modal shells.
- [x] Reconcile obsolete starter and reset-script references.
- [x] Add deterministic fixture time, typed mock entities/scenarios, and one scenario registry.
- [x] Add the smallest justified Redux Toolkit foundation; keep ephemeral UI state local.
- [x] Add deterministic development access to themes, sessions, and future states.
- [x] Export and bundle the approved TrackFly brand mark locally.

### Relevant Stitch/screens

- TrackFly Brand Mark — `4bb8af66f60c444c9ff75c90d70bd031`.
- Product screens were not Phase 1 scope.

### Functional verification and evidence

| Date | Check | Result |
|---|---|---|
| 2026-09-20 | `npm run typecheck`; `npm run lint`; `npx expo config --type public` | Passed; Expo resolved SDK 57 configuration and local brand splash paths. |
| 2026-09-20 | Android Pixel_3: `npm run android`, accessibility actions, screenshots | Bundled without application runtime errors; navigation/theme/session scenarios worked; brand matched its Stitch export. |
| 2026-09-20 | iOS iPhone 17: `npm run ios`, simulator screenshot | Bundled without application runtime errors; harness and brand rendered; brand matched its Stitch export. |
| 2026-09-20 | Dedicated development client | Pending by design: Phase 1 did not configure `expo-dev-client` or generated native projects. Native validation begins when Phase 3 requires it. |

### Definition of Done

- [x] Route, provider, theme, store, clock, scenario, and local-brand foundations support later phases.
- [x] Recorded automated and Expo Go checks passed without production integrations.
- [x] The truthful development-client pending note does not reopen the completed foundation phase.

### Blockers/open decisions

- None for the completed Phase 1 scope.

## Phase 2 — Design System and Shared UI Foundation

**Status:** `COMPLETE`

**Dependencies:** Phase 1

### Objective

Provide TrackFly's reusable typed visual foundation and canonical four-destination navigation shell: semantic themes, fonts, adaptive surfaces, headers/dock, actions, forms, cards/rows/chips, feedback/overlays, Assistant primitives, state/skeleton primitives, brand presentation, and subscription presentation primitives.

### Scope

- Typed semantic light/dark tokens, typography, spacing, sizing, shape, borders, and elevation.
- Shared layout, navigation, control, form, content, feedback, Assistant, state, and plan primitives.
- Adaptive safe-area/keyboard foundations and the Today/Tasks/Assistant/History shell.

### Implementation tasks

- [x] Implement typed light/dark colors, typography, spacing, sizing, radii, borders, and platform elevation roles.
- [x] Load Inter and JetBrains Mono through Expo-compatible packages.
- [x] Implement `ScreenSurface`, `AppHeader`, and the canonical `BottomDock`.
- [x] Implement buttons, icon/avatar buttons, cards, list/task/reminder rows, chips/tags, forms, text areas, toggles, and grouped sections.
- [x] Implement sheets, dialogs, state views, skeletons, Assistant messages/actions/capture, and plan/feature primitives.
- [x] Add safe-area, keyboard-aware, accessibility-role/state, touch-target, showcase, and four-destination shell foundations.

### Relevant Stitch/screens

Shared primitives derive from the approved inventory and Ambient Clarity systems without claiming extra screen IDs. The five explicit dark anchors remain assigned to their product families below.

### Functional verification and evidence

| Date | Check | Result |
|---|---|---|
| 2026-09-20 | Current repository implementation inspection | Themes/fonts, shared primitives, overlays, Assistant/subscription primitives, adaptive surfaces, scenario showcase, and Today/Tasks/Assistant/History dock are present. |
| 2026-09-20 | `npm run typecheck`; `npm run lint` | Passed against the current Phase 2 implementation. |
| 2026-09-20 | Simulator/Stitch comparison | No new evidence recorded; do not infer it from implementation or automated checks. Exhaustive comparison belongs to Phase 6. |

### Definition of Done

- [x] Later product screens can use typed tokens and demonstrated reusable primitives.
- [x] Canonical navigation and light/dark foundations are implemented.
- [x] Typecheck and lint pass; unrecorded final calibration remains Phase 6 work.

### Blockers/open decisions

- Final icon mapping, native shadows/elevation, blur fallbacks, and motion values remain Phase 6 work.

## Phase 3 — Core Working TrackFly

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–2

### Objective

Deliver a genuinely useful guest-first TrackFly that works offline end to end, persists local data, and schedules real local notifications without requiring an account or cloud backend.

### Scope

- Welcome, onboarding, and Continue as Guest.
- Today, Tasks, deterministic local Assistant shell, History, and basic Settings.
- Create/Edit/Details and CRUD for Tasks and Reminders; recurrence, occurrences, alerts, completion, Snooze, and local History.
- SQLite persistence, local settings, and real local-notification permissions/scheduling/reconciliation.
- Design local records with stable IDs and the minimum metadata required for future sync compatibility.
- Do not implement the production sync outbox or cloud synchronization machinery until Phase 4 unless it is required for atomic local domain writes.

### Implementation tasks

- [ ] Add an Expo Development Build and configure `expo-sqlite`/`expo-notifications` from official SDK 57 documentation.
- [ ] Add versioned SQLite migrations, foreign keys, tested journal settings, initialization, and transactions.
- [ ] Implement separate Task, Reminder, recurrence-rule, occurrence, alert, scheduled-notification, account-scope, and settings storage only as architecture requires.
- [ ] Add pure domain rules and repository ports/adapters; keep SQLite authoritative and records out of Redux.
- [ ] Implement stable-ID Task/Reminder CRUD, soft deletion, bounded occurrence materialization, idempotent completion, and derived History.
- [ ] Implement Snooze only for eligible current occurrences/alerts and preserve recurrence.
- [ ] Implement the essential entry, primary, editor, details, and Settings screens backed by real local data.
- [ ] Implement only the minimum deterministic Assistant shell needed to verify structured preview → edit/cancel → explicit confirmation → existing local creation path.

  Use a very small fixed set of typed scenarios. Do not build a generalized mock AI/interpreter layer because production interpretation will be implemented with Gemini in Phase 4.
- [ ] Implement notification education/permission handling; denial must not block saving.
- [ ] Reconcile desired SQLite alert state with native notifications: schedule, cancel, reschedule, persist IDs/status, retry, and repair at start/foreground.
- [ ] Support idempotent notification Open/Complete/Snooze actions where the platform allows them.
- [ ] Keep due-only Tasks unscheduled and every deterministic manual flow available offline.

### Relevant Stitch/screens

Welcome/onboarding IDs are `1b21e26c7d884ca993ecfe13cceb95e0`, `54414e8396e34114bbf26a461483d11a`, `e5d3d70bd3044ad5b6e1876425f5aec8`, and `1321379cf0354b159c03485e087a719d`. Core destination and lifecycle references are mapped in the consolidated inventory. Task Create/Edit/Details have no dedicated IDs and derive from approved Reminder patterns with Task semantics and no Reminder-only recurrence controls.

### Functional verification requirements

- [ ] Application and routes run in native development builds without blocking errors.
- [ ] Forms, validation, search/filter, create/edit/delete, completion, eligible Snooze, and History work.
- [ ] Migrations/CRUD pass integration tests and data survives restart/reload.
- [ ] Due-only Tasks and explicit Task alerts remain distinct.
- [ ] Recurrence, occurrences, idempotency, completion, Snooze, and derived views pass deterministic tests.
- [ ] Notification permission, schedule/cancel/reschedule, action handling, and reconciliation pass on representative native builds.
- [ ] Offline manual flows remain usable; typecheck, lint, and applicable tests pass.

### Definition of Done

- A guest can complete the offline loop from onboarding through creation, persisted restart, notification behavior, completion/Snooze, and History.
- SQLite is authoritative and native schedules reconcile safely with desired alert state.
- Product invariants hold and truthful functional/automated evidence is recorded; final UI comparison is deferred to Phase 6.

### Blockers/open decisions

- Recurring edit/delete scope and timezone/DST recurrence semantics remain unresolved. Label any unavoidable interim policy temporary.
- Final notification settings and lock-screen privacy remain unresolved; implement only the minimum core flow.
- Decide whether local database encryption is required before making any encryption claim.

## Phase 4 — Accounts, Cloud Sync, AI, and Voice

**Status:** `NOT STARTED`

**Dependencies:** Phase 3

### Objective

Turn the offline core into the connected intelligent product, in dependency order: Supabase/Auth/cloud sync, production AI, then voice capture/transcription.

### Scope

- Supabase client/Auth, PostgreSQL, RLS, Edge Functions, guest adoption, backup, and cross-device sync.
- Provider-neutral production Assistant interpretation through a server-side Gemini adapter.
- Real microphone capture and transcription feeding the existing Assistant workflow.

### Implementation tasks

#### A. Supabase, authentication, and cloud

- [ ] Resolve approved auth providers; configure environment-separated Supabase public client values.
- [ ] Add PostgreSQL migrations for syncable records and mandatory indexed RLS ownership policies; exclude device-only/transient data.
- [ ] Implement Auth session storage/refresh/lifecycle without tokens in Redux or domain SQLite tables.
- [ ] Implement idempotent guest adoption preserving stable IDs and all local content through failure/retry.
- [ ] Implement transactional local write/outbox, incremental pull, idempotent push, server revisions/cursors, tombstones, bounded retry, and recoverable status.
- [ ] Apply patch-based conflict rules: merge disjoint fields, preserve meaningful losing values, keep domain commands idempotent, and let tombstones win until restoration exists.
- [ ] Keep local writes immediately authoritative and basic authenticated backup/sync non-Pro.

#### B. Production AI

- [ ] Implement mobile Assistant gateway → Supabase Edge Function → server `AIProvider` → `GeminiProvider`; keep keys/model/prompt/provider details server-side.
- [ ] Implement a schema-versioned `ready` / `needs_clarification` / `unsupported` / `failed` contract with syntax and semantic validation.
- [ ] Preserve original input/partial proposal across clarification, timeout, malformed output, rate limit, retry, edit, and cancel.
- [ ] Require structured preview and explicit confirmation; only confirmation calls the real deterministic local creation path.
- [ ] Keep recurrence execution, notifications, persistence, sync, permissions, purchases, completion, Snooze, and delete outside AI.
- [ ] Always provide manual fallback.

#### C. Voice

- [ ] Resolve voice capture/transcription provider, privacy boundary, retention, and platform requirements.
- [ ] Implement contextual permission, capture, transcription, cancel, error/retry, and usable-transcript preservation with typed fallback.
- [ ] Feed transcription into the existing Assistant clarification → preview → confirmation → local creation pipeline; create no parallel voice architecture.

### Relevant Stitch/screens

Account/auth/profile/sync, Assistant/clarification/error/limit, voice, and microphone references are mapped below. Phase 4 connects them to production infrastructure while reusing Phase 3's local product path.

### Functional verification requirements

- [ ] Signup/sign-in/session restoration/expiry/sign-out and approved providers work.
- [ ] Guest adoption and sync upload/download/retry/conflict/tombstone/account-switch cases preserve data and avoid duplicates.
- [ ] RLS and Edge Functions prevent unauthenticated and cross-user access.
- [ ] AI clear/ambiguous/unsupported/error/retry/edit/cancel/confirm cases pass; nothing is created before confirmation.
- [ ] Voice permission/capture/transcription/retry and transcription-to-Assistant pass with manual fallback.
- [ ] Typecheck, lint, mobile, Edge Function, database/RLS, and integration tests pass without blocking runtime errors.

### Definition of Done

- Accounts safely adopt guest data and provide non-Pro backup/sync through the approved local-first protocol.
- Gemini remains server-side behind a validated provider-neutral contract.
- Voice converges on the same reviewed Assistant creation flow, and any connected-service failure leaves manual local TrackFly usable.
- Functional/automated evidence is recorded; final UI comparison remains Phase 6 work.

### Blockers/open decisions

- Exact auth providers and sign-out behavior for cached authenticated data.
- Guest AI identity, abuse prevention, and rate limits.
- Voice provider/privacy policy.
- Background-sync opportunities and acceptable freshness beyond required foreground triggers.

## Phase 5 — Complete Product States and Monetization

**Status:** `NOT STARTED`

**Dependencies:** Phase 4

### Objective

Complete every remaining approved product state and production monetization flow on the real Phase 3/4 architecture before final UI QA.

### Scope

- Remaining approved UI/product states connected to Phase 3/4 production behavior.
- RevenueCat offerings, purchase/restore, entitlements, feature policy, and server enforcement metadata where required.

### Implementation tasks

#### Remaining product states

- [ ] Finish account-entry/auth/password-recovery and local/server validation states.
- [ ] Finish empty/loading Today and Tasks, search/no-results, long-content, and recoverable query states.
- [ ] Finish Task/Reminder success, failure, retry/recovery, and remaining lifecycle states without losing drafts.
- [ ] Finish Assistant clarification/error/usage-limit/listening/transcribing/voice-failure states using real workflows.
- [ ] Finish populated/empty/loading History; Profile; authenticated Settings; and sync progress/success/recoverable failure.
- [ ] Finish approved notification settings, notification/microphone education and disabled recovery, and offline states.
- [ ] Make every state reachable through navigation or an explicit deterministic scenario without duplicate mock service layers.

#### Monetization

- [ ] Approve Free/Pro entitlements, limits, product identifiers, prices, billing periods, trials, discounts, introductory offers, and exact gates before billing implementation.
- [ ] Implement paywall, Free/Pro plan states, and approved feature gates without gating auth or basic backup/sync.
- [ ] Implement a RevenueCat `SubscriptionGateway` for configuration, identity transitions, offerings, purchase, customer refresh, restore, and entitlement snapshots.
- [ ] Implement truthful processing, success, cancellation, failure/retry, restored, nothing-to-restore, and restore-failure states.
- [ ] Prevent duplicate actions while processing; preserve content and core usability after failure, cancellation, unavailability, or Pro expiry.
- [ ] Implement pure feature-access policy, verified webhook handling, and server entitlement metadata only where enforcement requires them.
- [ ] Test receipt/entitlement verification, account switching/logout, offline cache, and recovery.

### Relevant Stitch/screens

All remaining state and monetization references are mapped below. Stitch pricing, limits, providers, benefits, and offers are placeholders until approved as product policy.

### Functional verification requirements

- [ ] Every remaining state is reachable, connected to real infrastructure where applicable, deterministic where intentionally simulated, and recoverable.
- [ ] Query context, drafts, and local records survive loading/no-results and creation/AI/voice/auth/sync/permission failures.
- [ ] Permission denial retains typed/manual fallback.
- [ ] RevenueCat offerings, identity, purchase/cancel/failure/retry/restore, entitlement refresh, webhook, and offline-cache cases pass.
- [ ] Duplicate transactions are blocked and failure never removes content or basic sync.
- [ ] Typecheck, lint, and applicable unit/integration/backend/native purchase tests pass without blocking errors.

### Definition of Done

- Every approved state is functionally reachable and uses production infrastructure where relevant.
- Monetization reflects approved policy, preserves content/core use, and never presents unresolved commerce details as truth.
- Functional/automated evidence is recorded; exhaustive UI comparison remains Phase 6 work.

### Blockers/open decisions

- History retention/restoration/deletion/event representation and final notification settings.
- Final Free/Pro entitlements, limits, gated features, prices, billing periods, trials, and discounts.
- RevenueCat product and entitlement identifiers.

## Phase 6 — Final UI Verification, Hardening, and Release Readiness

**Status:** `NOT STARTED`

**Dependencies:** Phases 1–5

### Objective

With functionality complete, perform the only exhaustive visual-verification phase, correct every meaningful discrepancy, harden accessibility/security/operations, and produce release-ready iOS and Android builds.

### Scope

- Complete Stitch comparison and UI correction across supported phone sizes and themes.
- Accessibility and native presentation hardening.
- Sentry, privacy/security, environment separation, recovery, builds, store readiness, and end-to-end release regression.

### Implementation tasks

- [ ] Render every materially distinct real state, compare with its Stitch reference, record discrepancies, correct, re-render, and repeat until no meaningful mismatch remains.
- [ ] Verify hierarchy, alignment, spacing, dimensions, density, scrolling, typography, wrapping/truncation, colors, surfaces, borders, radii, shadows/elevation, blur, icons, assets, illustrations, sheets/dialogs/dock, keyboard, and system chrome.
- [ ] Verify explicit and derived dark states without redesigning content or behavior.
- [ ] Exercise long titles/names/emails/localized strings, empty optional values, many rows, keyboard-visible forms, and every material loading/error/success state.
- [ ] Audit roles, labels, values, selected/disabled/busy state, announcements, focus, touch targets, contrast, font scaling, and reduced motion.
- [ ] Finalize app icon, native splash/launch presentation, status/navigation bars, native elevation, blur fallbacks, motion, and applicable deep links.
- [ ] Add Sentry behind an observability adapter with environment/release IDs and approved privacy-safe scrubbing.
- [ ] Review secrets, environments, RLS, Edge Functions, AI/deep-link/notification payload validation, purchase enforcement, migration safety, sync/notification/purchase recovery, and data-loss prevention.
- [ ] Validate production development builds, configure EAS/release builds, complete iOS/Android release checks, store assets/metadata, and required privacy/support/legal links.
- [ ] Resolve every release-blocking warning, error, security issue, data-loss risk, and visual discrepancy.

### Relevant Stitch/screens

All 52 approved mobile states and the brand asset listed below. Derived Task Create/Edit/Details receive the same platform/theme/adaptive/accessibility review without being misrepresented as direct Stitch screens.

### Full verification matrix

| Platform | Size | Stitch | Light | Dark | Accessibility/content/keyboard | Final result |
|---|---|---:|---:|---:|---:|---|
| iOS | Compact phone | [ ] | [ ] | [ ] | [ ] | Pending |
| iOS | Large phone | [ ] | [ ] | [ ] | [ ] | Pending |
| Android | Compact phone | [ ] | [ ] | [ ] | [ ] | Pending |
| Android | Large phone | [ ] | [ ] | [ ] | [ ] | Pending |

Representative coverage may be reused for shared verified behavior, but every materially distinct state must be inspected. Record actual devices/viewports, themes, commands/actions, discrepancies, corrections, and results.

### Functional and release verification requirements

- [ ] First launch → onboarding → guest/account → Today.
- [ ] Manual Task → optional explicit alert → completion → History.
- [ ] Manual Reminder → notification → Snooze/complete → History.
- [ ] AI/voice → clarification as needed → preview → edit/cancel/confirm → real creation.
- [ ] Guest adoption, backup/sync, offline/manual fallback, Settings/Profile, permission recovery, purchase/failure/restore, and sign-out/sign-in recovery.
- [ ] Typecheck, lint, all tests, end-to-end regressions, production development builds, and release builds pass.

### Definition of Done

- [ ] Functionality is stable and every Stitch entry is accounted for.
- [ ] Every material state is rendered, compared, corrected, and rechecked.
- [ ] Compact/large iOS and Android, light/dark, accessibility, and content variation are complete.
- [ ] No known meaningful discrepancy or release blocker remains.
- [ ] Security, privacy, observability, migration, sync, notification, and purchase recovery reviews pass.
- [ ] Automated checks and release builds pass; evidence is truthful and the final result is `COMPLETE`.

### Blockers/open decisions

- Final icon/app icon/splash implementation, Sentry scrub policy, lock-screen privacy, and any earlier unresolved decision affecting release behavior.

## Consolidated Stitch inventory and accounting

The inventory contains 52 mobile screens/states and one brand asset. State/theme/permission/sheet/loading/transaction variants normally share routes and components. Final comparison for every entry occurs in Phase 6.

| Family | Stitch title | ID | Primary implementation | Final verification |
|---|---|---|---|---|
| Brand | TrackFly Brand Mark | `4bb8af66f60c444c9ff75c90d70bd031` | Phase 1 | Phase 6 |
| Onboarding | Welcome & Onboarding | `1b21e26c7d884ca993ecfe13cceb95e0` | Phase 3 | Phase 6 |
| Onboarding | Onboarding 1: Remember Less | `54414e8396e34114bbf26a461483d11a` | Phase 3 | Phase 6 |
| Onboarding | Onboarding 2: Say It Naturally | `e5d3d70bd3044ad5b6e1876425f5aec8` | Phase 3 | Phase 6 |
| Onboarding | Onboarding 3: Never Miss | `1321379cf0354b159c03485e087a719d` | Phase 3 | Phase 6 |
| Auth | Account Entry | `83bb7cbbc8b54936b2bb6cc6b636d3d9` | Phase 3 shell / Phase 4 auth | Phase 6 |
| Auth | Sign In | `d526aac9a7c144f19911fe5ccc098ac4` | Phase 4 | Phase 6 |
| Auth | Create Account | `caf84836302f447eadf7629b7ba5c85b` | Phase 4 | Phase 6 |
| Auth | Forgot Password | `5d22a5fe8f7649b397fe6eae17c2746b` | Phase 5 | Phase 6 |
| Today | Today Home | `f3fb0729c1d94468a2cdaa15eed31241` | Phase 3 | Phase 6 |
| Today | Empty Today | `53c6eb7c37dc43e3ae8e18134a7e8dd0` | Phase 5 | Phase 6 |
| Today | Today Loading | `abb6e92c8cb04b0282973ee82c562160` | Phase 5 | Phase 6 |
| Today | Today Dark | `2680f8413ddb4006b3d4356617aed2e0` | Phase 3 | Phase 6 |
| Tasks | Tasks | `23557b5041894319be437ac071777dd9` | Phase 3 | Phase 6 |
| Tasks | Empty Tasks | `c8b60f791ca74b7dad1206326e584647` | Phase 5 | Phase 6 |
| Tasks | Tasks Loading | `af8b1171f33846a8ac1b042293512497` | Phase 5 | Phase 6 |
| Tasks | No Search Results | `55ecc139d25b4fdd85efae3abbc66f37` | Phase 5 | Phase 6 |
| Tasks | Tasks Dark | `98997bdc6b2848ec86f3b800b2cc868c` | Phase 3 | Phase 6 |
| Assistant | AI Assistant | `9c9cc8ae1cf64db5a74b2743a0f2f298` | Phase 3 shell / Phase 4 AI | Phase 6 |
| Assistant | AI Clarification | `79cc7e416dc1461882973d002ca5c5ca` | Phase 4 | Phase 6 |
| Assistant | AI Processing Error | `07ea4107e75e48a2bff88f1bc6f6f4e6` | Phase 5 | Phase 6 |
| Assistant | AI Usage Limit | `b605c6bbac70431f832e35cb39803126` | Phase 5 | Phase 6 |
| Assistant | Assistant Dark | `16289e7783504266854939b91605149a` | Phase 4 | Phase 6 |
| Voice | Voice Listening | `33d974f2957248dfa1ba40bebbd8a76b` | Phase 4 | Phase 6 |
| Voice | Voice Transcribing | `23a67f73e1744294ad78e0d949328613` | Phase 4 | Phase 6 |
| Voice | Voice Failure | `e301979a849a45a48652a8abb3bd9013` | Phase 5 | Phase 6 |
| Reminder | Create & Edit Reminder | `369933a2dc6a46fca18c70d34934ff50` | Phase 3 | Phase 6 |
| Reminder | Reminder Details | `ee12f37d3e34401ebca45d1fabdf9069` | Phase 3 | Phase 6 |
| Reminder | Snooze Bottom Sheet | `4f7e9eb4c9d841f2bb19f79f895970e3` | Phase 3 | Phase 6 |
| Reminder | Reminder Creation Failure | `1336a16636e9419abf847918df469f93` | Phase 5 | Phase 6 |
| Reminder | First Reminder Success | `e7730c85c65b4af99d326166a962ab48` | Phase 5 | Phase 6 |
| History | History | `e70344b315474a5682565a908eed9e43` | Phase 3 | Phase 6 |
| History | Empty History | `624c22838e1f46f68f7d249dcc04c8cd` | Phase 5 | Phase 6 |
| History | History Loading | `578e630779c740af9c6e8a9bc807a7c2` | Phase 5 | Phase 6 |
| Settings | Settings | `28df8e70842d4dafa932d1b7e05768a5` | Phase 3 | Phase 6 |
| Settings | Settings Dark | `06183b0975064707b2a04a7eeae76052` | Phase 3 | Phase 6 |
| Settings | Profile | `dedb164808084f87b70b17466757e250` | Phase 4 | Phase 6 |
| Settings | Notification Settings | `330c9df709d842bdbffcb1f35b7e3075` | Phase 5 | Phase 6 |
| Permission | Notification Pre-Permission | `8e9d0d8eecb148cba4a2c9ad3e6ab2e7` | Phase 3 minimum / Phase 5 complete | Phase 6 |
| Permission | Notifications Off | `fb16cefd254d4069a41d2fe7d16fbe6d` | Phase 3 minimum / Phase 5 complete | Phase 6 |
| Permission | Microphone Permission Sheet | `312c5f1a88b24c3f856fdff94f96d31a` | Phase 4 | Phase 6 |
| Permission | Microphone Access Off | `c11488dd5a8c4223933677e36198de87` | Phase 4 | Phase 6 |
| Account | Account Sync Complete | `b24b591bc8d64ea2bd2285a82c506d42` | Phase 4 | Phase 6 |
| Pro | TrackFly Pro Paywall | `a21995ba7351436a8181ca2bd1fc53e7` | Phase 5 | Phase 6 |
| Pro | Your Plan (Free) | `5801d9fe0f0840dc9cffcbea97fa2acc` | Phase 5 | Phase 6 |
| Pro | Your Plan (Pro) | `bbd4aa7cec814283a12e6657647d2398` | Phase 5 | Phase 6 |
| Pro | Pro Feature Gate | `0523e534e21541c5b23ebb1b38763b4c` | Phase 5 | Phase 6 |
| Pro | Purchase Processing | `0201d9d31a564fb2827a522b743f3473` | Phase 5 | Phase 6 |
| Pro | Purchase Success | `c99bee7639ff4fe1ab79bb0fcb1426c1` | Phase 5 | Phase 6 |
| Pro | Purchase Failed | `6eff4c8c2f1d4e148c0fa407823850e3` | Phase 5 | Phase 6 |
| Pro | Restore Purchases States | `aee3980744d4412fa92f44d10c9ba9e5` | Phase 5 | Phase 6 |
| Pro | TrackFly Pro Dark | `26533e2dd36e473da6883494f5da03b8` | Phase 5 | Phase 6 |
| System | Offline State | `bdb08bf6272245edae7db825d0fe6726` | Phase 5 | Phase 6 |

### Derived screens without Stitch IDs

| Screen | Basis | Implementation | Final verification |
|---|---|---|---|
| Create Task | Approved Reminder form patterns plus Task PRODUCT rules | Phase 3 | Phase 6 |
| Edit Task | Approved Reminder form patterns plus Task PRODUCT rules | Phase 3 | Phase 6 |
| Task Details | Approved Reminder detail pattern plus Task PRODUCT rules | Phase 3 | Phase 6 |

No dedicated splash-screen ID is tracked. Do not invent one; native splash and app-icon finalization belong to Phase 6.

## Blockers and open decisions

Keep these unresolved until explicitly approved:

- Recurring edit/delete scope.
- Timezone/DST recurrence semantics.
- Exact authentication providers.
- History retention, restoration, permanent deletion, and activity representation.
- Final notification settings.
- Final Free/Pro entitlements, limits, and gates.
- Pricing, billing periods, trials, discounts, and introductory offers.
- Sign-out/local authenticated-data behavior.
- Voice provider, privacy boundary, and retention.
- Guest AI identity, abuse prevention, and rate limiting.
- Local database encryption requirement.
- Background-sync opportunities/freshness not already locked.
- Final icon mapping, native app icon/splash, blur, elevation, and motion.
- Sentry data-scrubbing policy.
- Lock-screen notification privacy.

Do not mark a dependent phase complete while a required decision or Definition-of-Done gate remains unresolved.
