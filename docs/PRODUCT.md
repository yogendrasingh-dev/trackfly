# TrackFly Product Specification

This document defines TrackFly's intended product behavior, terminology, requirements, and user journeys. It describes the product independently of the current mock implementation and remains authoritative when production services are introduced in later phases.

The root `AGENTS.md` governs working practices, phase boundaries, and verification. Google Stitch governs screen-specific visual appearance, while `docs/DESIGN.md` governs reusable visual language and adaptive design guidance. Future `docs/ARCHITECTURE.md` and `docs/TASKS.md` documents may define implementation boundaries and delivery status, but they must not silently redefine the product described here.

## Product Vision

TrackFly is a calm personal reminder and task assistant. Its core promise is:

> Tell TrackFly something naturally, and it remembers it for you.

The product reduces the effort required to capture and act on everyday commitments. A user should be able to speak or type naturally, review what TrackFly understood, and create a reliable task or reminder without learning a command language or managing a complex productivity system.

TrackFly is not a general-purpose chatbot, calendar replacement, or large project-management suite. The assistant exists to help users capture and manage tasks and reminders clearly and safely.

## Product Principles

### Natural input, structured result

Users may begin with ordinary language. TrackFly turns that input into a clear task or reminder with understandable fields such as title, schedule, recurrence, and alert behavior.

### Review before creation

Every AI-interpreted task or reminder creation must show a structured preview and require explicit user confirmation before final creation. TrackFly must not silently create an AI-interpreted item, even when the request appears unambiguous.

### Clarify instead of guessing

If information required to preserve the user's intent is missing or ambiguous, TrackFly asks a focused clarification question. It must not invent a material date, time, recurrence, or item type merely to finish the flow.

### Useful before sign-in

The core experience is guest-first. A user can create and manage local tasks and reminders without first creating an account. Authentication adds backup and cross-device continuity; it does not unlock basic product usefulness.

### Calm, human communication

TrackFly communicates in concise, ordinary language. It explains what happened, what needs attention, and what the user can do next without exposing internal AI or system terminology.

### Reliable deterministic actions

AI may interpret intent, but deterministic product actions remain explicit and dependable. Completion, snoozing, deletion, recurrence calculation, notification scheduling, permissions, storage, synchronization, and purchases are not delegated to generative interpretation.

### Graceful degradation

Loss of connectivity, AI availability, microphone access, notification permission, or account access must not unnecessarily block local manual task and reminder management. Failures preserve the user's work and offer a clear recovery path.

## V1 Scope

### Included

V1 includes:

- Welcome and onboarding.
- Guest-first local use.
- Natural-language text capture.
- Voice capture and transcription.
- AI-assisted intent understanding and clarification.
- Structured preview and explicit confirmation before every AI-interpreted creation.
- Manual task and reminder creation and editing.
- One-time and recurring reminders.
- Tasks with optional due dates, due times, and explicit alerts.
- Today, Tasks, Assistant, and History destinations.
- Upcoming-item behavior where it is relevant within approved destinations.
- Reminder details, completion, snoozing, and deletion.
- Empty, loading, search-empty, error, permission, offline, and success states.
- Local notification behavior.
- Optional authentication, basic cloud backup, and cross-device sync.
- Settings, profile, notification settings, and light/dark appearance.
- Free and Pro plan concepts, feature gates, purchase states, and purchase restoration.

### Excluded

The following are outside V1 unless separately approved:

- Expense tracking.
- Health or medicine tracking.
- Receipt capture or management.
- Family or team sharing.
- Location-based reminders.
- Complex calendar intelligence or calendar replacement behavior.
- Travel booking or itinerary management.
- General-purpose conversational assistance.
- Large project-management or productivity-suite features.
- Audio notes as a standalone item type.
- Autonomous creation or execution of actions without required user review.

Examples or prompts visible in a design reference do not expand the approved scope by themselves.

## Product Model and Terminology

### Task

A **task** is a work item the user intends to complete.

- A task may be undated or may have a due date and time.
- A due date or time does not automatically create an alert.
- A task notifies the user only when the user explicitly adds an alert.
- A task may be active or completed.
- Tasks may appear in Today when their dates or explicit scheduling make them relevant there.

### Reminder

A **reminder** is inherently alert- and schedule-oriented.

- A reminder requires enough scheduling information to determine when it should alert the user.
- A reminder may occur once or recur.
- Missing or ambiguous scheduling information must be clarified or supplied manually before creation.
- A reminder may be completed or snoozed.
- If notification permission is unavailable, the reminder still exists, but TrackFly must clearly explain that it cannot currently deliver the alert.

### Alert

An **alert** is an explicit notification instruction associated with a reminder or task. Reminders inherently include scheduled alert behavior. Tasks include alert behavior only when the user explicitly adds it.

### Occurrence and recurrence

An **occurrence** is one scheduled instance of a repeating item. **Recurrence** is the rule that produces future occurrences.

Completing or snoozing the current occurrence must not silently rewrite the recurrence rule. The detailed scope of editing or deleting recurring items remains unresolved and is recorded in Open Product Decisions.

### Completion

Completion records that the user finished a task or reminder occurrence.

- Completing a one-time item marks it completed and makes it available in History.
- Completing a recurring item applies to the current occurrence; its recurrence remains active and produces the next occurrence.
- Completion must provide immediate, visible feedback.
- Repeated taps, retries, or reopened views must not produce duplicate completions.

### Snooze

Snooze applies only to reminders and to tasks that have an explicit alert with a current alert or pending occurrence. It postpones that current alert or occurrence.

- Snoozing does not alter the underlying recurrence rule.
- The user may choose an offered duration or a custom date and time when available.
- TrackFly shows the resulting snooze time before or immediately after confirmation.
- It must not report a successful snooze unless the action was accepted.

### History

History is a chronological record of relevant completed and past activity. It is not a separate content type or a place into which users must manually move items.

- History may group records into understandable periods such as Today, Yesterday, and This Week.
- Filters must use approved V1 item types. Audio Notes is not a V1 History filter.
- History should distinguish tasks from reminders without introducing unnecessary technical metadata.
- Retention duration, restoration behavior, and permanent deletion from History remain unresolved.

## Canonical Navigation

TrackFly has four primary destinations:

1. **Today** — the user's immediate and date-relevant tasks and reminders.
2. **Tasks** — task discovery, filtering, searching, and management.
3. **Assistant** — natural-language and voice capture, clarification, and structured review.
4. **History** — completed and past activity.

Assistant may receive stronger visual emphasis, but it remains one of these four destinations. State-specific labels such as Ask, New, or a microphone symbol do not create additional destinations.

Settings, profile, account, notification, plan, and purchase flows are supporting destinations.

V1 does not define a fifth primary **Upcoming** destination. Upcoming items should be ordered or grouped within the relevant approved destination unless a later product decision establishes a separate experience.

## Canonical User Journeys

### Guest onboarding and first item

1. The user opens TrackFly and sees the welcome/onboarding experience.
2. The user may begin without an account.
3. The user enters Assistant or a supported quick-capture entry point.
4. The user types or speaks a request naturally.
5. TrackFly interprets the request and asks for clarification if needed.
6. TrackFly shows a structured preview.
7. The user explicitly confirms or edits the preview.
8. TrackFly creates the item and reports success.
9. The item appears in the relevant Today or Tasks context.

Account creation may be offered during or after onboarding, but it must not prevent guest use.

### AI-interpreted creation

1. The user provides natural-language text or transcribed speech.
2. TrackFly identifies whether the request describes a task or reminder and extracts its user-relevant fields.
3. If a required or material field is ambiguous, TrackFly asks a focused clarification question.
4. The user answers, selects a suggestion, edits the request, or cancels.
5. TrackFly presents the complete structured preview.
6. The user chooses to confirm, edit, or cancel.
7. Only explicit confirmation finalizes creation.

An AI-interpreted item must never bypass the preview because TrackFly considers its interpretation sufficiently confident.

### Manual creation and editing

1. The user opens a manual task or reminder form.
2. The user supplies or changes structured fields directly.
3. TrackFly identifies missing required information in plain language.
4. The user saves or cancels.
5. A successful save updates the relevant views and communicates the result.

Manual entry remains available when voice, AI, or connectivity is unavailable. Direct manual creation does not require an AI review step, though normal field validation still applies.

### Clarification

For a request such as “Call Mom tomorrow” when a reminder time is required:

1. TrackFly preserves the original request.
2. TrackFly asks, “What time tomorrow?”
3. It may offer useful choices such as 9:00 AM, noon, and 6:00 PM, plus a way to choose another time.
4. The answer is reflected in the structured preview.
5. The user still confirms the complete item before creation.

Clarification should request only information necessary to preserve the user's intent. Prefer one focused question at a time over a long questionnaire.

### Notification, completion, and snooze

1. A scheduled reminder or explicitly alerted task reaches its alert time.
2. The notification identifies the item clearly.
3. The user may open it or use supported Complete and Snooze actions.
4. Completion updates the relevant item and History.
5. Snooze postpones the current alert without silently changing recurrence.
6. TrackFly reflects the resulting state consistently when the application is next opened.

### Finding and managing work

1. Today presents immediate and date-relevant items.
2. Tasks presents task-focused filtering, search, and active/completed states.
3. The user opens an item to review details or edit it.
4. The user may complete or delete the item, and may snooze a reminder or explicitly alerted task when a current alert or pending occurrence exists.
5. Completed activity appears in History.

### Account adoption and sync

1. A guest chooses to sign in or create an account.
2. TrackFly explains that an account enables basic backup and cross-device sync.
3. Existing guest data is preserved during account adoption.
4. Local and account data are combined without silent duplication or loss.
5. TrackFly reports success or presents a recoverable failure.
6. Authentication or sync failure leaves local data available.

The exact authentication providers remain unresolved.

### Pro and purchase states

1. The user encounters an approved Pro entry point or feature gate.
2. TrackFly explains only benefits and limits that have been approved as product requirements.
3. The user may start a purchase or restore a previous purchase.
4. Processing, success, cancellation, failure, and restoration states communicate their status unambiguously.
5. Existing content and basic authenticated backup/sync remain available regardless of Pro status.

## Assistant and AI Behavior

### Approved AI responsibilities

AI may assist with:

- Understanding natural-language requests.
- Identifying whether the user intends a task or reminder.
- Extracting titles, dates, times, recurrence, alert intent, and notes.
- Recognizing material ambiguity.
- Asking focused clarification questions.
- Producing a structured preview for user review.

### Actions AI does not control

Generative interpretation must not own:

- Final creation without explicit confirmation.
- Completion or snoozing.
- Deletion.
- Notification scheduling or delivery.
- Recurrence calculation.
- Storage or synchronization.
- Permission management.
- Purchase, restoration, or entitlement decisions.

### Review requirements

Every AI-interpreted creation preview should expose the fields needed for an informed decision, as applicable:

- Item type.
- Title.
- Date and time.
- Recurrence.
- Alert behavior.
- Notes or other recognized supporting details.

The user must be able to confirm, edit, or cancel. Technical confidence scores and parsing terminology should not be required for the user to understand the result.

### Failure and offline behavior

- Preserve the user's original input when interpretation fails.
- Offer Retry and Create Manually.
- Preserve any usable transcription if voice processing fails.
- Do not claim that offline AI is available unless that capability is separately approved.
- When AI requires connectivity, explain that briefly while keeping deterministic local task and reminder actions available.

## Guest and Authenticated Behavior

### Guest capabilities

A guest can:

- Complete or skip onboarding as supported by the approved flow.
- Create, edit, complete, search, and review local tasks and reminders, and snooze reminders or explicitly alerted tasks when a current alert or pending occurrence exists.
- Use Today, Tasks, Assistant, and History.
- Use local notification behavior after granting permission.
- Use manual creation when AI or voice is unavailable.
- Configure applicable local appearance and notification preferences.

The absence of an account must not be presented as an error state.

### Authenticated capabilities

Signing in enables basic backup and cross-device sync for every authenticated user. These capabilities are not Pro-only.

Authenticated users also receive:

- Account and profile management.
- Clear sync status.
- Preservation and safe incorporation of guest-created content.
- Recoverable handling of authentication and sync failures.

### Guest-to-account transition

- Explain the benefit of signing in without using coercive language.
- Preserve all local items during sign-in or account creation.
- Do not silently create duplicate items during the initial merge.
- Do not claim completion until the account transition has actually succeeded.
- If the operation fails, keep local content intact and provide a retry path.

Exact sign-out data behavior will need to align with future account and privacy decisions; it must not be inferred from visual references alone.

## Notifications and Permissions

### Permission request

- Ask for notification permission contextually when notification behavior becomes relevant.
- Before the system prompt, briefly explain the user benefit in plain language.
- Allow the user to choose Not Now.
- Denial must not block task or reminder creation.
- When permission is disabled, explain that alerts cannot currently be delivered and provide an Open Settings action where appropriate.

### Delivery expectations

- Reminders are alert-oriented and should schedule their approved alerts.
- Tasks schedule an alert only when the user explicitly adds one.
- Editing an item updates its future alert behavior.
- Completing or deleting an item or occurrence prevents obsolete future alerts for that item or occurrence.
- TrackFly must not promise delivery beyond what the operating system can provide.
- An item remains visible and manageable if notification delivery is unavailable.

### Notification actions

Where supported, a notification may offer:

- **Complete** — completes the applicable item or occurrence.
- **Snooze** — postpones the current alert or occurrence.
- **Open** — opens the relevant item details.

Actions must be idempotent from the user's perspective and must reconcile visibly with application state.

The exact set of V1 notification settings is unresolved. Detailed categories, quiet hours, and channel-level controls depicted in Stitch must not be treated as committed requirements until approved.

## Free and Pro

### Established rules

- TrackFly has Free and Pro plan concepts.
- Guests and Free users receive a useful core task and reminder experience.
- All authenticated users receive basic cloud backup and cross-device sync.
- Basic backup and sync must not be marketed or enforced as Pro-only.
- Pro gates only separately approved premium capabilities.
- Existing user content must not be removed or held inaccessible solely because Pro expires or a purchase fails.
- Purchase and restoration flows must represent processing, success, failure, and cancellation truthfully.

### Not yet established

The following are not product facts until separately approved:

- Final Free and Pro feature entitlements.
- Usage or item limits.
- Pricing and billing periods.
- Trials, discounts, or introductory offers.
- Whether voice capture is premium.
- Whether advanced recurrence is premium.
- Any form of priority AI processing.

Prices, limits, and benefit lists visible in Stitch are presentation references and placeholders, not entitlement truth.

## Product Language and Copy

### Canonical terms

Use these product terms consistently:

- Today
- Tasks
- Assistant
- History
- Task
- Reminder
- Alert
- Repeat or recurrence
- Snooze
- Complete or Mark done
- Sign in
- Back up and sync
- TrackFly Pro

Use **Assistant** as the destination name. Contextual action labels or icons may change within an Assistant state, but they do not rename the destination.

### Voice and tone

Product copy should be:

- Calm and concise.
- Human rather than technical.
- Specific about what happened.
- Clear about the next available action.
- Reassuring without making unsupported guarantees.

Preferred patterns include:

- “What time tomorrow?”
- “Review reminder”
- “Ready to create”
- “Saved on this device” when local-only status matters.
- “Turn on notifications in Settings to receive alerts.”

Avoid language such as:

- Neural engine.
- Thought engine.
- Semantic engine.
- Capture engine.
- Operational.
- Real-time parsing.
- Other internal processing terminology that does not help the user act.

Do not use unverified claims such as “on-device,” “never stored,” “end-to-end encrypted,” or similar security and privacy assurances until the corresponding product and technical guarantees have been approved.

## States, Errors, and Recovery

### Empty and loading states

- Empty states explain the purpose of the destination and offer a relevant next action.
- Loading states preserve the destination's recognizable structure and do not imply that user data is absent.
- Loading must not remain indefinitely without a recoverable error path when an operation can fail.

### Search with no results

- Preserve the user's query.
- State clearly that no matching items were found.
- Offer a clear way to adjust or reset the search.
- Do not present no-results as though the user's underlying data has disappeared.

### AI processing failure

- Preserve the complete original input.
- Explain that TrackFly could not interpret the request.
- Offer Retry and Create Manually.
- Do not create a partially interpreted item silently.

### Voice failure and microphone access

- Preserve any usable transcription.
- Offer retry where appropriate.
- Always retain typed input as a fallback.
- If microphone permission is denied, explain why access is useful and offer Open Settings without blocking typed capture.

### Creation and editing failure

- Preserve every user-entered field and clarification answer.
- Explain that the item was not created or updated.
- Offer retry, editing, or cancellation.
- Do not show success or remove the draft prematurely.

### Offline behavior

- Deterministic local task and reminder actions remain available when they do not require connectivity.
- Manual creation and editing remain available.
- If AI interpretation is unavailable, preserve the request and offer manual creation or a later retry.
- Clearly distinguish locally completed work from operations still awaiting connectivity.
- Do not represent offline behavior as on-device AI.

### Authentication and sync failure

- Preserve local content.
- Explain which operation failed without claiming data loss.
- Offer retry or continued local use.
- Do not silently duplicate local and account items during recovery.

### Notification permission or delivery limitation

- Preserve the task or reminder.
- Explain that its alert cannot currently be delivered.
- Provide a settings path where the user can resolve a permission problem.
- Do not claim that an undeliverable notification was sent.

### Purchase and restoration states

- Processing is not success.
- Cancellation is not failure and should not be presented as an error.
- Failure provides a retry or exit path.
- Restoration reports whether an eligible purchase was found.
- Failed, cancelled, or unavailable purchases do not remove existing content or basic account sync.

## Accessibility and Trust

- Essential actions must remain understandable without relying on color alone.
- Status and error messaging should identify both the condition and the next action.
- Voice capture must always have a typed alternative.
- Permission denial must have a non-blocking fallback where the core product can still function.
- User input and drafts must survive recoverable failures.
- Destructive actions require clear labeling and appropriate confirmation.
- TrackFly must not claim that a command, creation, save, sync, notification, or purchase succeeded before it actually has.
- AI uncertainty must be resolved through clarification and review, not hidden from the user.

## Open Product Decisions

These matters are intentionally unresolved and must not be inferred from Stitch, mock behavior, or future implementation convenience:

### Recurring edit and delete scope

Decide whether editing or deleting a recurring item can affect:

- Only the current occurrence.
- The current and future occurrences.
- The entire series, including past representation where applicable.

Until resolved, product copy and mock flows must not imply a final policy beyond preserving the recurrence when completing or snoozing the current occurrence.

### Time-zone and daylight-saving recurrence behavior

Decide whether a recurring item follows local wall-clock time, a fixed instant, or a user-selectable rule when the user travels or daylight-saving time changes.

### Exact authentication providers

Apple, Google, and email/password appear in Stitch, but the required V1 provider set has not been approved.

### History retention and restoration

Decide:

- How long History is retained.
- Whether completed items may be restored.
- Whether users may permanently delete History records.
- Whether snooze and other activity events appear as separate records.

### Exact V1 notification settings

Decide which category controls, quiet-hour controls, previews, sounds, and platform-specific settings are included. Stitch examples do not establish the final set.

### Final Free and Pro entitlements and limits

Decide which separately approved capabilities are premium and whether any usage limits apply. Basic authenticated backup and cross-device sync are not candidates for a Pro-only gate.

### Pricing, trials, and discounts

No price, billing period, trial, introductory offer, or discount is approved. Stitch values must remain placeholders until a separate commercial decision is made.

## V1 Product Acceptance Criteria

The V1 product experience is behaviorally complete when:

- A guest can reach and use the four primary destinations without creating an account.
- A user can type or speak a natural request and recover gracefully if voice or AI is unavailable.
- Every AI-interpreted task or reminder is shown as a structured preview and requires explicit confirmation before creation.
- Ambiguous requests are clarified without TrackFly inventing material details.
- A user can create and edit tasks and reminders manually.
- Tasks do not notify merely because they have a due date or time; alerts are explicit.
- Reminders provide schedule-oriented alert behavior.
- One-time and recurring items can be reviewed and completed according to the established rules; Snooze is available only for reminders or explicitly alerted tasks when an alert or pending occurrence exists.
- Today, Tasks, Assistant, and History present consistent item state.
- Notification and microphone permission denial leave usable fallback paths.
- Offline and failure states preserve user input and local content.
- Signing in preserves guest data and enables basic backup and cross-device sync for all authenticated users.
- Free and Pro presentation does not invent unresolved prices, limits, or entitlements.
- Purchase and restore states never report false success or remove existing content on failure.
- Product copy uses the canonical terminology and avoids unsupported AI, privacy, security, and billing claims.
- Every unresolved decision listed above remains clearly identified until it is explicitly approved.
