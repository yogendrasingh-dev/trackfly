# TrackFly Technical Architecture

This document defines how TrackFly should be implemented technically in production. It describes the intended architecture without changing the active delivery phase.

The current phase remains **complete application UI first using deterministic, typed mock data**. Production persistence, authentication, synchronization, AI, notifications, subscriptions, and observability must not be installed or implemented until an explicitly approved phase permits them. The root `AGENTS.md` governs that phase boundary and the required implementation workflow.

Responsibilities remain separated:

- `docs/PRODUCT.md` defines product behavior, terminology, scope, and unresolved product decisions.
- Google Stitch defines screen-specific visual appearance.
- `docs/DESIGN.md` defines reusable visual tokens, components, and adaptive behavior.
- This document defines technical boundaries and production implementation direction.
- Future `docs/TASKS.md` will track sequencing and verification; it must not redefine this architecture.

When these sources appear to conflict, do not silently change product or design behavior to simplify implementation.

## Architecture Principles

TrackFly follows three complementary principles:

### Local-first core

Tasks, reminders, deterministic recurrence behavior, completion, snoozing, and local notification scheduling must continue working without internet access, Supabase availability, or AI availability. SQLite is the primary on-device working store.

### Cloud-enhanced

Supabase provides authentication, backup, cross-device synchronization, PostgreSQL storage, and server-side execution. Cloud failure must not invalidate or roll back a valid local operation.

### AI-assisted

Gemini helps interpret natural language into a structured proposal. AI does not own deterministic business rules, persist data, schedule notifications, complete items, snooze occurrences, or bypass explicit user confirmation.

The resulting production flow is:

```text
TrackFly UI
  → React local state and Redux Toolkit workflow state
  → application command/use case where justified
  → repository port
  → SQLite transaction
  → immediate local UI update
  → notification reconciliation where applicable
  → synchronization outbox
  → Supabase Edge Function / PostgreSQL
```

Natural-language creation adds a server-side interpretation step before the deterministic write:

```text
Natural-language input
  → Supabase Edge Function
  → server-side AIProvider
  → GeminiProvider
  → structured output
  → runtime and semantic validation
  → TrackFly structured preview
  → explicit user confirmation
  → deterministic local creation
```

## Locked Technology Direction

| Area | Decision |
|---|---|
| Mobile runtime | Expo SDK 57, React Native, TypeScript |
| Navigation | Expo Router with typed routes |
| Native development | Expo Development Build; production capabilities must not rely on Expo Go |
| Application/workflow state | Redux Toolkit |
| Local working data | `expo-sqlite` |
| Backend | Supabase |
| Cloud database | PostgreSQL |
| Authentication | Supabase Auth |
| Authorization | Supabase Row Level Security |
| Server logic | Supabase Edge Functions |
| AI | Gemini behind an Edge Function and provider abstraction |
| Notifications | `expo-notifications`, using local scheduling for ordinary reminders |
| Subscriptions | RevenueCat, introduced near monetization/release |
| Crash reporting | Sentry, introduced before production release |
| Styling | React Native `StyleSheet` plus typed semantic TrackFly tokens |
| Visual authority | Google Stitch and `docs/DESIGN.md` |

RTK Query is not required initially. Firebase, Convex, Clerk, Redis, a separate Node.js backend, microservices, Kafka, Zustand, TanStack Query, GraphQL, event sourcing, CQRS, and elaborate dependency-injection frameworks are not part of the approved architecture.

## Runtime and Native Build Model

TrackFly should use Expo Continuous Native Generation and configuration plugins unless a future native requirement demonstrates that committed native projects are necessary.

- Use an Expo Development Build as the normal development runtime once native production capabilities are introduced.
- Install Expo-compatible native packages with `npx expo install` during an approved implementation task.
- Rebuild the development client when native dependencies or native configuration change.
- Do not treat a successful Expo Go preview as verification of notifications, SQLite configuration, subscriptions, secure session behavior, or other native production capabilities.
- Keep platform configuration in `app.json` or an approved `app.config.ts` until there is a concrete need for another approach.

The current project has no committed `ios/` or `android/` directory and no development-client configuration. Those are implementation tasks for a later phase, not documentation work to perform now.

## Project Organization

TrackFly uses a feature-oriented application structure with narrow shared and infrastructure layers.

```text
src/
  app/                         # The only Expo Router route root
    _layout.tsx
    index.tsx
    +not-found.tsx
    (onboarding)/
    (auth)/
    (app)/
      _layout.tsx
      (tabs)/
      tasks/
      reminders/
      settings/
      pro/

  components/                  # Proven cross-feature UI components
    ui/
    navigation/
    feedback/

  theme/                       # Typed TrackFly design tokens and theme tools

  features/                    # Screen implementations and feature UI behavior
    onboarding/
    today/
    tasks/
    reminders/
    assistant/
    history/
    settings/
    auth/
    subscriptions/

  mocks/                       # UI-phase fixtures and scenario control
    fixtures/
    scenarios/

  store/                       # Redux configuration and justified workflow slices

  domain/                      # Production-phase pure entities and rules
    tasks/
    reminders/
    recurrence/
    alerts/
    shared/

  application/                 # Production-phase use cases and ports
    use-cases/
    ports/

  infrastructure/             # Production adapters, added only by phase
    database/
    repositories/
    sync/
    notifications/
    auth/
    ai/
    subscriptions/
    observability/

supabase/                      # Future server-side project
  functions/
    interpret-intent/
    sync/
    _shared/
  migrations/
  tests/
```

Do not create the complete directory tree in advance. A directory should be introduced only when its responsibility is being implemented.

Avoid a catch-all `services/` directory. Production application ports belong in `src/application/ports`; concrete adapters belong in the matching `src/infrastructure` area.

### Route root decision

The Expo Router route root for this repository is **`src/app/`**.

- `package.json` uses `expo-router/entry`.
- The current project already uses `src/app/_layout.tsx` and `src/app/index.tsx`.
- `tsconfig.json` maps `@/*` to `./src/*`.
- Expo Router supports the `src/app` layout used by this project.

Do not create a second root-level `app/` directory. All route and layout files remain under `src/app/`; non-route implementation code remains outside it.

Route files should be thin composition boundaries. A route normally imports a feature screen, supplies typed route parameters, and configures navigation. It should not contain reusable components, database access, synchronization code, AI calls, or large feature implementations.

Example separation:

```text
src/app/(app)/(tabs)/today.tsx
  → imports TodayScreen from src/features/today/screens/TodayScreen
```

## Expo Router Architecture

The target route layout is:

```text
src/app/
  _layout.tsx                       # Root providers and root Stack
  index.tsx                         # Bootstrap/onboarding redirect
  +not-found.tsx

  (onboarding)/
    _layout.tsx
    welcome.tsx
    onboarding.tsx                 # Step state belongs inside the flow unless URL state is needed

  (auth)/
    _layout.tsx
    account.tsx
    sign-in.tsx
    create-account.tsx
    forgot-password.tsx

  (app)/
    _layout.tsx

    (tabs)/
      _layout.tsx                  # Canonical custom four-destination dock
      today.tsx
      tasks.tsx
      assistant.tsx
      history.tsx

    tasks/
      new.tsx
      [taskId].tsx
      [taskId]/edit.tsx

    reminders/
      new.tsx
      [reminderId].tsx
      [reminderId]/edit.tsx

    settings/
      index.tsx
      profile.tsx
      notifications.tsx
      plan.tsx

    pro/
      index.tsx                    # Route-backed paywall/presentation
```

This is a direction, not authorization to create every route immediately. Exact filenames may be refined when the corresponding screen family is implemented, but the single `src/app/` route root and separation from `src/features/` are fixed.

### Navigation rules

- Root bootstrap routes according to onboarding state, not authentication; guests can enter the application.
- Today, Tasks, Assistant, and History are the only tabs.
- Use Expo Router's JavaScript tabs with a custom tab-bar component for the highly specific TrackFly dock.
- Do not use the starter `unstable-native-tabs` pattern as the production navigation architecture.
- Editors, details, settings, and profile are stack destinations.
- A paywall may use a route-backed modal because it can be entered from multiple features and needs normal navigation/back behavior.
- Deep links and notification responses resolve to stable item-detail routes with validated identifiers.

### Route versus UI state

Create a route when a destination benefits from addressability, history, deep linking, or independent back behavior. Keep transient presentations inside their owning route.

Normally not routes:

- Empty and loading states.
- Search-empty states.
- Clarification steps and structured-preview variants.
- Voice listening, transcription, and failure states.
- Permission education sheets.
- Snooze sheets.
- Save, sync, purchase, and restore processing/success/failure states.
- Theme variants.

These should use shared components and typed workflow state rather than duplicate route files.

## Styling and Theming

TrackFly uses **React Native `StyleSheet` plus centralized, typed semantic design tokens**. NativeWind and Tailwind are not part of the architecture.

This is the simpler and more reliable fit because:

- `docs/DESIGN.md` already defines a semantic token system rather than a generic utility vocabulary.
- Pixel-faithful implementation requires native safe-area values, shadows, elevation, blur fallbacks, platform differences, and rendered calibration.
- Typed token access discourages arbitrary color and spacing values.
- Component variants are easier to audit than repeated utility-class strings.
- NativeWind would add CSS, Babel, Metro, Tailwind configuration, and type augmentation without removing the need for native styling APIs.

The theme layer should expose:

- Semantic light and dark colors.
- Typography roles and loaded font families.
- Spacing, sizing, radius, border, and elevation roles.
- Component-specific tokens where `DESIGN.md` provides evidence.
- A typed theme provider and theme hook.

Use `StyleSheet.create` for stable geometry. Use style composition or typed style factories for theme variants. Inline styles are appropriate for values derived at runtime, including safe-area insets, measured dimensions, animations, and content-driven state.

Class names must not become a parallel design system. Web Tailwind CSS must never be copied from Stitch into React Native.

## State Ownership

### React local state

Use component-local state for state that is short-lived and owned by one mounted UI subtree:

- Input focus and temporary field interaction.
- Local disclosure or expansion.
- Non-shared sheet visibility.
- Pressed and animation state.
- Draft values that do not need to survive navigation or remounting.

### Redux Toolkit

Use Redux for application and workflow state shared across screens or providers:

- Assistant input, clarification, preview, and confirmation workflow.
- Cross-route editor workflow when a draft must survive navigation.
- Global scenario selection during the UI-only phase.
- Authentication and synchronization status suitable for presentation.
- Purchase/restore workflow state.
- Global banners or recoverable operation state.

Redux may mirror a small status snapshot from an authoritative subsystem. It must not become that subsystem's source of truth.

### SQLite

SQLite owns persistent on-device working data:

- Tasks and reminders.
- Recurrence rules and materialized occurrences.
- Explicit alerts.
- Completion and history-producing state.
- Persistent settings where appropriate.
- Notification scheduling metadata.
- Synchronization metadata and outbox operations.

### Supabase

Supabase owns the authenticated cloud replica, account identity, server revisions, server-side usage accounting, and server-authorized metadata. The mobile UI should not read Supabase tables into Redux as an alternative database.

### Derived state

Today groups, task filters, upcoming ordering, history sections, alert eligibility, and similar views are derived from canonical records. Do not persist or synchronize them as separate truth unless a future requirement demonstrates that they have independent meaning.

### State that must not live in Redux

- The authoritative task or reminder collection.
- Supabase table caches duplicating SQLite.
- Authentication tokens.
- OS notification identifiers as their durable source.
- Gemini keys or raw provider responses.
- RevenueCat entitlement truth independent of its SDK/customer information.
- Cheaply derived view groupings.

RTK Query is optional and not justified by the initial local-first synchronization model.

## Domain Model Direction

Domain rules remain pure and independent of React, Redux, Expo APIs, SQLite, Supabase, Gemini, and RevenueCat.

### Shared concepts

Common fields may be composed in TypeScript without forcing a common persistence table:

- Stable ID.
- Local account scope.
- Authenticated owner association where applicable.
- Title and notes.
- Created and updated timestamps.
- Soft-deletion state.
- Synchronization revision metadata outside the core entity where practical.

### Task

A task is a work item with optional due information. A due date/time does not imply an alert. An alert exists only after an explicit user choice.

### Reminder

A reminder is schedule- and alert-oriented. It must have enough validated information to calculate an occurrence and alert.

### Recurrence rule

A recurrence rule is a versioned, structured definition interpreted by deterministic local code. AI may propose a rule but cannot calculate or enforce it.

### Occurrence

An occurrence represents a concrete scheduled instance of a reminder. It carries the state needed for occurrence-specific completion and snoozing without mutating the parent rule.

### Alert

An alert represents notification intent. It targets a reminder occurrence or an explicitly alerted task. Platform scheduling identifiers are infrastructure metadata, not domain identity.

### Completion and History

Task completion and reminder-occurrence completion are canonical entity state. History is initially a projection of that state rather than an independent manually managed entity.

## SQLite Data Model Direction

Use separate task and reminder models/tables. This preserves their distinct product invariants and avoids a single nullable-field-heavy item table.

Conceptual local tables:

### `account_scopes`

Separates a device-local guest profile from authenticated account caches. This supports account adoption and future sign-out decisions without mixing data from different users.

### `tasks`

Contains stable ID, scope, title, notes, optional due information, task status, completion timestamp, timestamps, and soft-deletion marker.

### `reminders`

Contains stable ID, scope, title, notes, schedule anchor, optional recurrence-rule reference, timestamps, and soft-deletion marker.

### `recurrence_rules`

Contains a versioned structured rule and sufficient date/time context to support the final timezone policy. Avoid storing only an opaque human phrase.

### `reminder_occurrences`

Contains the parent reminder, original scheduled time, effective alert time, occurrence state, completion data, snooze data, and any future occurrence-specific override.

### `alerts`

Represents reminder alerts and explicit task alerts. Database constraints should ensure exactly one valid target kind.

### `scheduled_notifications`

Stores the device-local platform notification identifier, intended schedule, current reconciliation state, and recoverable scheduling error.

### `app_settings`

Stores only durable preferences that are not better owned by the operating system or another subsystem.

### `sync_records`

Stores per-entity server revision, last acknowledgement, and synchronization status when those fields should not live directly on every domain row.

### `sync_outbox`

Stores idempotent local mutations awaiting cloud acknowledgement, including operation ID, entity identity, base revision, changed fields or command payload, attempt metadata, and last recoverable error.

A dedicated `sync_conflicts` table is **not required for V1**. A true same-field conflict may remain attached to the relevant outbox operation as `needs_attention`, with the losing local value preserved there or in a temporary recovery payload. Add a persistent conflict table only if an approved user-facing conflict/recovery flow requires independent records, history, or retention.

### History storage

Initially derive History from completed tasks and reminder occurrences. Introduce a dedicated history record only after retention, restoration, or audit requirements demonstrate independent lifecycle needs.

### Local database rules

- Use schema migrations and never mutate production schema ad hoc.
- Enable and verify foreign keys.
- Use transactions around domain writes and their outbox entries.
- Use prepared/parameterized statements for user data.
- Use a tested journal configuration appropriate to `expo-sqlite`.
- Keep platform notification identifiers device-local.
- Retain tombstones until deletion has synchronized safely.
- Do not claim local encryption unless it is explicitly designed and verified.

## Supabase Data Model Direction

PostgreSQL mirrors only syncable product data:

- `profiles`
- `tasks`
- `reminders`
- `recurrence_rules`
- `reminder_occurrences`
- `alerts`
- Approved cross-device preferences
- `sync_operations` for idempotency
- A lightweight `sync_changes` index or equivalent revision mechanism for incremental pull
- Future subscription metadata needed for server-side entitlement enforcement

Device-local notification IDs, temporary UI state, permission snapshots, Redux state, and raw provider responses do not belong in cloud tables.

Every user-owned record requires:

- Stable client-generated entity ID.
- `user_id` linked to Supabase Auth.
- Server revision.
- Server-controlled timestamps.
- Soft-deletion/tombstone state where deletion must propagate.

Enable RLS on every exposed user-data table. Define explicit policies for select, insert, update, and delete using authenticated ownership. Index ownership and synchronization columns used by policies and incremental queries.

Conflict-sensitive writes should go through a sync Edge Function backed by a transactional PostgreSQL function or equivalent transaction boundary. The Edge Function authenticates the request, validates the operation, applies revisions/idempotency, and returns canonical records.

Do not create SQL migrations during the UI-only phase.

## Local-to-Cloud Synchronization

V1 synchronization is deterministic, incremental, and designed for one person using multiple devices. It is not collaborative document editing and does not require realtime subscriptions.

### Local mutation path

1. Validate a deterministic domain command.
2. Write the local change and its outbox operation in one SQLite transaction.
3. Refresh local queries immediately.
4. Reconcile local notifications if the change affects alerts.
5. Attempt synchronization when authenticated and connected.

Cloud failure never rolls back a valid local operation.

### Synchronization cycle

1. Validate the current authenticated session.
2. Pull server changes and tombstones after the last acknowledged cursor.
3. Apply non-conflicting remote changes locally.
4. Push pending idempotent outbox operations.
5. Receive canonical server rows and revisions.
6. Mark acknowledged operations complete.
7. Pull again when the server reports newer changes.

Trigger synchronization on successful authentication, application startup or foregrounding, connectivity recovery, relevant local mutations, explicit refresh, and permitted background opportunities. Correctness must not depend on background execution.

### Stable identity and idempotency

- Generate UUIDs locally before cloud access.
- Assign every mutation a unique operation ID.
- The server records handled operation IDs so retries cannot duplicate writes.
- Track server revision separately from user-visible timestamps.
- Use a server-issued cursor or monotonic revision for incremental pull.
- Propagate deletion using tombstones rather than immediate hard deletion.

### Conflict policy

Use patch-based optimistic concurrency:

- Every mutation includes its base server revision and the fields or domain command it changes.
- Disjoint field changes may merge.
- Completion, snooze, and deletion are idempotent domain commands, not full-record replacement.
- An unrelated edit must not reopen a completed occurrence.
- A tombstone wins over an ordinary edit until restoration is explicitly supported.
- On a true same-field conflict, the existing canonical server value wins for deterministic convergence.
- Preserve the losing local value in the pending/recovery operation instead of silently discarding it.
- Surface user intervention only if the conflict affects meaningful content and cannot be reconciled automatically.

Persistent conflict records remain an optional future mechanism, not a required V1 table.

### Retry behavior

- Use bounded exponential backoff with jitter for recoverable network/server failures.
- Pause on authentication failure until the session is refreshed or the user signs in again.
- Do not retry validation, authorization, or schema-version failures indefinitely.
- Preserve actionable error state locally.
- Manual local work remains available during all sync failures.

## Guest-to-Authenticated Adoption

Every installation starts with a stable local guest scope. Local records receive stable UUIDs before authentication.

On successful sign-in:

1. Create or resume an idempotent adoption batch.
2. Atomically associate eligible guest records with the authenticated local account scope.
3. Queue upserts using their existing record IDs.
4. Pull the account's remote data.
5. Merge by stable ID and revision.
6. Upload guest records through the normal sync protocol.
7. Mark adoption complete only after server acknowledgement.

Repeated attempts reuse stable record and operation IDs, preventing duplicates caused by retry. Do not automatically merge different records merely because their titles and times resemble each other.

If authentication or synchronization fails:

- Keep all local records intact.
- Keep the adoption process retryable.
- Continue normal local use.
- Do not report sync completion.
- Do not delete the guest copy before acknowledgement.

Use account scopes to isolate local data so the unresolved sign-out policy can later choose preservation, removal, encryption, or explicit user choice without redesigning every entity.

## Recurrence and Occurrences

A reminder is the series or one-time schedule definition. An occurrence is a concrete instance.

- A one-time reminder creates one occurrence.
- A recurring reminder stores a structured, versioned recurrence rule.
- Materialize only occurrences needed for the scheduling horizon or those with user-visible state.
- Preserve completed, snoozed, skipped, or otherwise modified occurrences.
- Do not generate an unbounded series.
- Completing a recurring reminder affects only the current occurrence.
- Snoozing affects only the current occurrence's effective alert time.
- Completion and snooze do not mutate the recurrence rule.
- Generate future occurrences through deterministic, tested local logic.

Persist enough date/time context to support the eventual timezone/DST decision, including the original local components and relevant zone identifier. Do not choose local-wall-clock, fixed-instant, or user-selectable behavior until `PRODUCT.md` resolves it.

Recurring edit/delete commands must not default to occurrence, future occurrences, or entire series. Their application interface should require an explicit scope only after the product decision is approved.

## Notification Architecture

Normal personal reminders use local scheduling through `expo-notifications`. Supabase push notifications are not required for ordinary reminder delivery.

### Desired-state reconciliation

SQLite stores the desired alert state; the operating-system notification scheduler is an external side effect.

1. A domain transaction writes the alert or occurrence state.
2. A notification reconciler compares desired alerts with scheduled native notifications.
3. It cancels obsolete schedules.
4. It schedules required alerts.
5. It stores returned platform identifiers and reconciliation status.
6. Failures remain retryable without deleting the task or reminder.

This compensating/reconciliation design is required because SQLite and the operating-system scheduler cannot share an atomic transaction.

### Notification rules

- Reminders generate scheduled alert intent.
- Tasks generate alert intent only when the user explicitly adds an alert.
- Notification payloads carry stable entity/occurrence IDs and minimal non-sensitive context.
- Editing an alert reschedules it.
- Completion and deletion cancel obsolete schedules.
- Snooze replaces the current eligible notification without altering recurrence.
- Complete and Snooze notification actions dispatch idempotent domain commands.
- Permissions are queried through the notification adapter and reflected to UI state.
- Denied permission does not prevent saving the underlying item.

### Recurring scheduling

Use a rolling scheduling horizon rather than depending exclusively on indefinitely repeating platform triggers. Reconcile after:

- Relevant local mutations.
- Application start and foreground.
- Permission changes.
- Observed timezone/clock changes once the product policy exists.
- Synchronization changes that affect alerts.

After application or device restart, SQLite remains desired truth. Query scheduled native notifications where supported and repair missing or obsolete schedules. Platform-specific restart behavior must be verified on actual development builds rather than assumed.

Exact categories, quiet hours, sounds, previews, and channel controls remain unresolved product scope.

## AI Architecture

The mobile application never calls Gemini directly.

```text
Assistant UI
  → client AssistantGateway
  → Supabase Edge Function
  → server-side AIProvider interface
  → GeminiProvider
  → Gemini API
```

### Provider boundary

`AIProvider` is a server-side abstraction with a provider-neutral interpretation operation. `GeminiProvider` translates the common request into Gemini configuration and translates the validated response back into the common result.

The mobile application knows only the TrackFly request and result contracts. It does not know the provider SDK, model name, prompt implementation, or credentials.

### Edge Function responsibilities

- Authenticate or otherwise validate the approved guest request identity.
- Validate input size and schema.
- Apply abuse prevention and usage limits.
- Supply reference date, locale, timezone context, and supported capabilities.
- Invoke the configured provider with a timeout.
- Require structured output.
- Validate syntax and semantics again after the provider responds.
- Return only the provider-neutral result.
- Record minimal redacted diagnostics and server-side usage accounting.

### Provider and model configuration

- Store Gemini credentials only in Edge Function secrets.
- Select provider and model through server configuration.
- Do not allow the client to choose an arbitrary model.
- Use request/correlation IDs for retry and diagnostics.
- Keep provider-specific error codes behind the adapter.
- A future provider or model change adds/replaces an adapter without changing screen behavior.

### Failure behavior

- Timeouts, rate limits, malformed output, and unsupported requests produce typed recoverable results.
- Preserve original input on the client.
- Offer retry and manual creation.
- No AI failure may prevent deterministic manual task/reminder use.
- Do not automatically create records during interpretation or retry.

## Structured Intent Contract

The conceptual response is a discriminated, schema-versioned result:

### Ready

- Result kind: `ready`.
- Proposed item kind: task or reminder.
- Title.
- Optional notes.
- Interpreted date/time fields.
- Reminder alert or explicit task alert intent.
- Optional recurrence proposal.
- User-relevant warnings.

### Needs clarification

- Result kind: `needs_clarification`.
- Missing or ambiguous field.
- Plain-language question.
- Optional suggestions.
- Preserved partial proposal.

### Unsupported

- Result kind: `unsupported`.
- Plain-language boundary or manual fallback.

### Failed

- Result kind: `failed`.
- Safe recoverable error category.
- Retry guidance without provider internals.

The request supplies the user's text, locale, reference date/time, timezone context, previous clarification answers, approved capabilities, and schema version.

AI output is untrusted input even when it conforms to JSON syntax. Validate:

- Discriminator and schema version.
- Required fields.
- Valid and supported dates/times.
- Reminder scheduling completeness.
- Explicit task-alert intent.
- Supported recurrence shapes.
- Scope boundaries.

Confidence or ambiguity values may guide server logic, but should not be exposed unless they provide a concrete user benefit. Every `ready` AI result remains a preview until the user explicitly confirms it.

## Authentication Architecture

### Guest mode

- Guest mode starts from a local account scope.
- Basic local use requires no Supabase session.
- Authentication absence is not an error.
- AI access for guests may require a future server-issued request identity, but manual/local behavior must not depend on it.

### Authenticated mode

- Supabase Auth owns authenticated identity and sessions.
- A dedicated auth adapter owns session persistence, refresh, foreground/background lifecycle, and auth events.
- Redux may mirror presentation status such as guest, authenticating, authenticated, expired, or error.
- Redux never stores access or refresh tokens.
- Authenticated `user_id` is the cloud ownership and RLS key.
- All authenticated users receive basic backup and cross-device sync.

### Account adoption

Account adoption invokes the idempotent guest migration described above. Sign-in must not directly rewrite or delete local records outside that process.

### Provider neutrality

Exact identity providers remain unresolved. Auth routes and application boundaries must not assume Apple, Google, or email/password until approved. Provider-specific callbacks remain behind the auth adapter.

### Sign-out

The product has not decided whether authenticated local data is retained, removed, encrypted, or offered as a user choice on sign-out. Account-scope isolation supports these options. Do not silently choose one during implementation.

## Subscription Architecture

RevenueCat is introduced during the monetization/release phase, not during UI or initial backend work.

A future `SubscriptionGateway` owns:

- SDK configuration.
- Anonymous and authenticated RevenueCat identity transitions.
- Offerings retrieval.
- Purchase initiation.
- Customer information refresh.
- User-triggered purchase restoration.
- Entitlement snapshot updates.
- Account switching and logout behavior.

Responsibility boundaries:

- Apple and Google remain the billing systems.
- RevenueCat normalizes purchases and active entitlements.
- Redux owns transient purchase/restore UI workflow only.
- RevenueCat customer information is the client entitlement authority.
- Supabase may store verified webhook-derived entitlement metadata for server-side feature enforcement.
- A pure feature-access policy maps approved entitlements to capabilities.
- Basic authentication, backup, and cross-device sync are never Pro-gated.

Do not define product identifiers, entitlement names, prices, limits, trials, or discounts before product approval. Failed or unavailable RevenueCat access must not break non-premium local functionality.

## Error Handling and Observability

### Typed error boundary

Translate infrastructure-specific failures into application-level categories before they reach UI:

- Validation.
- Permission.
- Offline/unavailable.
- Authentication.
- Synchronization.
- Notification scheduling.
- AI timeout, rate limit, or invalid response.
- Purchase or restore.
- Unexpected internal error.

User-facing handling must preserve drafts and local data, provide an actionable recovery path, and avoid exposing provider stack traces or codes.

### Logging

Use structured logs with subsystem, severity, operation/correlation ID, and safe error classification. Redact:

- Access and refresh tokens.
- Gemini credentials.
- Raw task/reminder notes unless explicitly approved for diagnostics.
- Raw AI prompts by default.
- Purchase and payment data.
- Personal notification content.

### Sentry

Add Sentry before production release behind an observability adapter.

- TrackFly must function when Sentry is disabled or unavailable.
- Expected offline, permission-denied, validation, and cancellation outcomes are not crashes.
- Configure environment and release identifiers.
- Apply data scrubbing before enabling production capture.
- Never make a user operation await successful telemetry delivery.

## Security Model

- Gemini API keys live only in Supabase Edge Function secrets.
- Supabase secret/service-role credentials never enter the mobile bundle.
- The client may contain only the Supabase project URL and publishable client key intended for public use.
- RLS is mandatory for every exposed user-data table.
- Edge Functions authenticate and authorize callers before handling user data.
- Use separate development, staging, and production Supabase projects and credentials.
- Persist auth sessions through a reviewed React Native storage adapter; never place tokens in Redux, logs, analytics, or ordinary SQLite domain tables.
- Parameterize all SQLite and PostgreSQL queries containing user data.
- Treat AI, synchronization, notification, deep-link, and purchase payloads as untrusted until validated.
- Minimize sensitive text in lock-screen notifications.
- Redact sensitive values before future Sentry capture.
- Do not commit secrets, production `.env` values, database passwords, signing material, or store credentials.
- Do not claim local database encryption, end-to-end encryption, or on-device AI unless those properties are separately designed and verified.

## Testing Strategy

Testing should follow architectural ownership rather than relying on broad snapshots.

### Unit tests

- Task/reminder invariants.
- Explicit task-alert eligibility.
- Completion and snooze commands.
- Recurrence expansion.
- Date/time boundary handling.
- Derived Today, Tasks, and History selectors.
- Conflict resolution.
- Feature-access policy once entitlements exist.
- Error translation.
- Structured-intent validation.

### Component and workflow tests

- Screens rendered with typed scenarios.
- Clarification, preview, explicit confirmation, editing, and cancellation.
- Empty, loading, error, offline, permission, and purchase states.
- Redux workflow reducers and selectors.
- Long content and theme variants where suitable for automated checks.

These tests do not replace the rendered Stitch comparison required by `AGENTS.md`.

### SQLite integration tests

- Migrations and rollback behavior.
- Transactions and foreign-key constraints.
- Local write plus outbox atomicity.
- Tombstones.
- Occurrence and completion invariants.
- Notification reconciliation metadata.
- Account-scope isolation.

Run behavior that depends on native `expo-sqlite` against the actual module in development builds.

### Synchronization tests

- Initial upload and incremental pull.
- Idempotent retries.
- Interrupted operations.
- Offline edits.
- Disjoint-field merge.
- Same-field deterministic conflict handling.
- Completion or snooze concurrent with unrelated edits.
- Tombstone propagation.
- Authentication expiration.
- Interrupted guest adoption and repeated retry without duplication.

### Supabase and RLS tests

- User isolation across at least two accounts.
- Unauthenticated denial.
- Operation-specific RLS policies.
- Edge Function authentication/authorization.
- Revision and operation-id idempotency.
- Sync transaction rollback.

Use a disposable local or dedicated test Supabase environment, never production data.

### Notification tests

- Desired schedule generation.
- Edit rescheduling.
- Completion/deletion cancellation.
- Eligible snooze replacement.
- Explicit task alerts versus due-only tasks.
- Permission transitions.
- Application restart reconciliation.
- Representative device-restart behavior on iOS and Android development builds.

### AI tests

- Provider-neutral contract fixtures.
- Valid structured results.
- Schema-valid but semantically invalid results.
- Clarification and unsupported requests.
- Timeout, malformed output, and rate-limit handling.
- GeminiProvider contract tests in the Edge Function environment.
- Confirmation remains mandatory after every valid AI proposal.

### Authentication tests

- Guest mode without a session.
- Session restoration and expiration.
- Account adoption success, interruption, and retry.
- Local preservation on auth/sync failure.
- Provider-specific flows only after providers are approved.

### Subscription testing phase boundary

RevenueCat SDK, purchase, restoration, entitlement, and webhook verification tests belong to the **future monetization/release phase**. They are not part of the current UI phase or the initial backend implementation.

When that phase is approved, test:

- RevenueCat identity transitions.
- Offerings and purchase workflow.
- User-triggered restoration.
- Entitlement refresh and offline cache behavior.
- Verified webhook handling and server-side entitlement metadata.
- Non-premium behavior when RevenueCat is unavailable.
- The invariant that basic backup and sync remain available without Pro.

Until then, subscription states use deterministic typed mocks only.

### End-to-end tests

As the relevant production phases are implemented, critical flows include:

- Guest manual creation while offline.
- AI request → clarification → preview → confirmation → local creation.
- Reminder notification → snooze or completion.
- Explicit task alert.
- Guest-to-account adoption.
- Cross-device synchronization and conflict recovery.
- Purchase and restoration only during the monetization phase.

## Current UI-Only Mock Architecture

The current phase should remain substantially smaller than the future production architecture.

### Approved mock structure

- Product-facing TypeScript view models.
- Central deterministic fixtures.
- Named scenarios for normal, empty, loading, error, offline, permission, purchase, and theme states.
- A fixed or injectable scenario clock.
- Feature-level mock hooks/controllers exposing data and actions.
- React local state for screen-owned interaction.
- Redux only when a workflow genuinely crosses routes or must survive remounting.
- Explicit simulated transitions for AI, voice, authentication, sync, notification, and purchase states.

Screens should not import raw fixture modules directly. A feature hook or mock provider selects a scenario and exposes the view data and actions required by the screen.

Use UI-facing types such as:

- `TaskListItemView`
- `ReminderCardView`
- `AssistantPreviewView`
- `HistoryRowView`
- `PlanView`

Do not make screens consume future SQLite rows, Supabase responses, Gemini responses, or RevenueCat customer objects.

### Replacement seam

Production feature controllers should later replace mock hooks while keeping screen-facing view models and actions stable where appropriate. This is a UI boundary, not a reason to build fake production repositories now.

During the current phase, do not create or install:

- SQLite migrations or database adapters.
- Repository implementations.
- Synchronization queues.
- Supabase clients or Edge Functions.
- Gemini clients.
- Real notification scheduling or permission requests.
- RevenueCat integration.
- Sentry initialization.
- Production environment configuration.

## Open Decisions

The architecture must keep these product decisions explicitly unresolved:

- Recurring edit/delete scope.
- Timezone and daylight-saving recurrence behavior.
- Exact authentication providers.
- History retention and restoration.
- Exact V1 notification settings.
- Final Free and Pro entitlements and limits.
- Pricing, trials, and discounts.
- Sign-out handling for locally cached authenticated data.

Additional implementation decisions remain open until their phase:

- Voice recording and transcription technology and privacy boundary.
- Guest AI request identity and abuse prevention.
- Whether local database encryption is required.
- Exact background-sync opportunities and acceptable freshness.
- Final icon library and glyph mapping.
- Sentry data-scrubbing policy.
- Lock-screen notification content/privacy policy.

None of these authorizes inventing a product answer during implementation.

## Current Repository Alignment and Gaps

The current repository is a deliberately minimal Expo SDK 57 project:

- The route root is `src/app/` and currently contains only `_layout.tsx` and `index.tsx`.
- TypeScript strict mode and the `@/*` → `src/*` path alias are configured.
- Expo Router typed routes and React Compiler are enabled.
- Portrait orientation and automatic system appearance are configured.
- No root-level `app/`, native `ios/`/`android/`, or production infrastructure folders exist.
- Redux Toolkit, `expo-sqlite`, Supabase, `expo-notifications`, RevenueCat, Sentry, and NativeWind are not installed.
- No development-client or EAS configuration exists yet.

These are expected gaps, not instructions to install anything during the UI-only phase.

The documents are compatible when their responsibilities are observed:

- `AGENTS.md` governs the active UI-only phase and prohibits implementing production integrations now.
- `PRODUCT.md` defines the final behavior this architecture must eventually support.
- `DESIGN.md` controls the visual system; it does not select storage, state, or backend technology.
- The attachment treatment mentioned by the reusable `QuickCaptureBar` design does not create an attachment product capability because `PRODUCT.md` has not approved one.
- Voice is approved product scope, but its production capture/transcription technology remains unresolved.

Existing code is implementation reality, not authority over these approved boundaries.
