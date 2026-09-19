# TrackFly Repository Instructions

This file is the repository-wide operating policy for Codex and other coding agents working on TrackFly. It governs every file below the repository root unless a more specific nested `AGENTS.md` adds compatible local instructions.

## 1. Current Phase and Working Mandate

TrackFly is currently in the **complete application UI phase**.

Build the full iOS and Android phone UI with deterministic, typed mock data so that every applicable product flow and Stitch state can be demonstrated end to end. Navigation and local mock interactions are in scope. Backend services and production integrations are not.

Work autonomously within the approved task and this phase. Do not stop for confirmation after routine implementation decisions. Ask only when a material product/design contradiction, destructive action, missing authority, or genuine blocker cannot be resolved from the sources of truth below.

An explicit phase change is required before introducing backend or production-integration architecture.

## 2. Sources of Truth

Use each source for its own responsibility rather than treating the list as a single global precedence order:

1. The user's explicit instructions define the active task and may override repository defaults.
2. This `AGENTS.md` defines workflow, engineering conduct, quality gates, and phase boundaries.
3. `docs/PRODUCT.md` defines product behavior, terminology, requirements, copy, and intended flows.
4. The approved Google Stitch project defines screen-specific visual appearance and interaction presentation.
5. `docs/DESIGN.md` defines reusable design tokens, components, adaptive-layout rules, and documented cross-screen design guidance.
6. `docs/ARCHITECTURE.md` defines approved technical boundaries, project structure, and dependency decisions.
7. `docs/TASKS.md` defines sequencing, progress, Stitch-to-implementation coverage, and verification status. It must not silently redefine product, design, or architecture requirements.
8. Existing code describes implementation reality; it is not authority over approved product or design requirements.

The documentation files may be added in later tasks. Until a document exists, do not invent its contents or weaken the other sources of truth.

For visual conflicts, the corresponding Stitch screen controls screen-specific appearance while `docs/DESIGN.md` controls documented reusable and cross-screen conventions. Do not silently choose between material contradictions. Resolve minor implementation details with best judgment; report or escalate conflicts that would change product behavior, approved visuals, or phase scope.

## 3. Expo 57 Requirement

Consult the relevant pages in the official, exact versioned Expo SDK 57 documentation when using or configuring Expo APIs or packages, when version compatibility matters, or when behavior is uncertain:

- https://docs.expo.dev/versions/v57.0.0/

Ordinary React Native UI changes that do not depend on version-specific behavior do not require repeatedly rereading the Expo documentation. When version-specific guidance is relevant, do not rely on memory, unversioned examples, or behavior from an older Expo release. Use Expo Router and its typed routes for navigation. Install Expo-compatible packages with `npx expo install` unless the official SDK 57 documentation requires another method.

## 4. Google Stitch Policy

Google Stitch is the approved visual source of truth.

The approved project is:

- Project: `TrackFly`
- Resource: `projects/6783092224109966385`

Before implementing or materially changing a screen or state:

1. Inspect the exact corresponding Stitch screen/state with the connected Stitch MCP.
2. Inspect its screenshot and available metadata; consult generated markup/code only when useful for understanding structure or content.
3. Record the Stitch screen title and ID used for the task in `docs/TASKS.md` when that tracker exists.
4. Inspect existing tokens, components, layouts, and mock scenarios before adding new ones.

Never generate, edit, restyle, regenerate, apply a design system to, or otherwise modify Stitch screens or assets unless the user explicitly requests it. Read-only inspection does not authorize design changes.

Stitch-generated HTML, CSS, or frontend code is reference material only. Do not paste it into the application or reproduce web-only implementation patterns. Implement the design idiomatically with React Native, TypeScript, Expo, and Expo Router.

Stitch currently includes 52 mobile screens/states and one brand-mark asset. Do not turn every entry into a route: loading, empty, error, theme, overlay, permission, sheet, and transaction variants should normally share routes and reusable components with their related screen. Track the brand mark as an asset, not as a route.

Stitch exports may be 780 pixels wide and represent an approximately 390-point mobile canvas. Export width and full-content height are reference dimensions, not fixed React Native screen dimensions.

### Dark mode

Support the complete UI in light and dark mode. Where Stitch provides an explicit dark screen, inspect and match it. Where it does not, derive the dark appearance strictly from the approved Stitch **Ambient Clarity Dark** design system and shared dark tokens. Preserve the light screen's structure, content, hierarchy, and behavior; do not use dark-mode derivation as permission to redesign it.

## 5. UI-Only Phase Boundaries

In scope:

- All applicable Stitch screens and states, including happy paths, empty, loading, error, offline, disabled, permission, purchase, and limit states.
- Expo Router navigation needed to demonstrate the full app.
- Local component state and deterministic mock interactions.
- Clean, centralized, typed mock entities and scenario fixtures.
- Simulated onboarding, authentication, notification, AI, voice, sync, and purchase experiences that remain clearly local mocks.

Out of scope unless explicitly requested:

- Real authentication or account services.
- Supabase or any other backend/API integration.
- SQLite or other persistence.
- Gemini or any real AI service.
- RevenueCat, StoreKit, Google Play Billing, or real purchases.
- Sentry, analytics, telemetry, or remote logging.
- Cloud sync or network-backed data.
- Push/local notification registration, permission requests, or scheduling.
- Real speech recognition, microphone capture, or uploads.
- Production secrets, environment configuration, migrations, repositories, service layers, or speculative abstractions for future phases.

Do not make a mock behave like a hidden real integration. Keep mock sources and state transitions explicit, local, deterministic, and easy to replace later. Do not introduce future architecture merely because it may eventually be useful.

## 6. Implementation Standards

- Keep TypeScript strict. Avoid `any`, unsafe assertions, duplicated domain types, and untyped route parameters.
- Prefer functional React components and hooks.
- Keep route files focused on route composition and navigation. Keep reusable UI, design tokens, and mock scenarios in appropriate shared modules.
- Centralize stable mock fixtures. Use fixed clocks/dates or injectable time for time-sensitive scenarios so renders and screenshots are reproducible.
- Model state variants through shared components and scenario data rather than duplicated screens.
- Extract reusable tokens and components when repetition is demonstrated. Do not build a speculative component framework.
- Prefer existing React Native/Expo capabilities and already-approved dependencies. Add a dependency only when the current task justifies it.
- Use local bundled production assets and fonts. Stitch-hosted URLs must not become application runtime dependencies.
- Preserve platform-appropriate native behavior when Stitch does not specify a visual difference.
- Do not make arbitrary changes to product copy, flow, information hierarchy, design, or Stitch assets.
- Investigate runtime warnings and console errors; a visually plausible render with errors is not complete.

## 7. Adaptive Layout, Interaction, and Accessibility

The supported UI-phase targets are **iOS phones and Android phones in portrait orientation**. Web and tablets are out of scope unless explicitly requested.

- Never hardcode the app to the 390-point Stitch reference canvas or a single device height.
- Handle safe areas, status bars, Android system navigation, home indicators, and display cutouts.
- Ensure floating navigation, sheets, and bottom actions clear both content and system insets.
- Support compact and large phone widths/heights, differing aspect ratios, and content that grows or wraps.
- Avoid fixed heights for text-bearing containers unless the design explicitly requires a bounded/truncated presentation and that behavior is verified.
- Use scrolling and keyboard avoidance deliberately. Confirm focused fields and primary actions remain reachable with the keyboard visible.
- Use appropriate virtualization for substantial repeated content.
- Exercise long names, long localized-style strings, empty values, many list items, and other non-ideal content.
- Support accessibility font scaling unless an approved design requirement explicitly constrains it; verify that essential content and actions remain available.
- Provide correct accessibility roles, labels, state, focus behavior, contrast, and minimum touch targets. Accessibility changes must preserve the approved visual design unless a genuine conflict is documented.
- Verify native status-bar and Android navigation-bar appearance as part of the screen, not as unrelated system chrome.

## 8. Mandatory Screen Workflow

Every screen/state task must follow this loop:

**Inspect Stitch → inspect existing reusable code → implement → run → render → compare → correct → repeat → verify → complete**

More explicitly:

1. Inspect the corresponding Stitch screen/state and applicable light/dark design system.
2. Inspect existing tokens, primitives, components, routes, and mock scenarios.
3. Implement with idiomatic React Native and strict TypeScript.
4. Run the application, not just the compiler.
5. Render the target state in an emulator or simulator.
6. Compare it visually with Stitch for layout, typography, spacing, alignment, color roles, elevation, imagery, iconography, component geometry, content, system chrome, scrolling, and interaction state.
7. Identify and correct meaningful discrepancies.
8. Render and compare again.
9. Repeat until no meaningful discrepancy remains.
10. Complete functional, accessibility, content-variation, and verification-record checks.

A meaningful visual discrepancy is a visible mismatch in hierarchy, spacing rhythm, alignment, typography, color role, elevation, component geometry, iconography, responsive behavior, or interaction state. Unavoidable platform rasterization differences alone are not meaningful discrepancies.

Compilation, linting, unit tests, snapshots, or code review alone never count as UI verification.

Never claim that a screen is pixel-perfect, visually verified, or complete unless it was actually rendered and inspected against Stitch. If the environment cannot access an emulator or simulator, state exactly which platform, device/viewport class, theme, and state remain **visual verification pending**.

## 9. Verification Matrix and Evidence

For each primary screen family, verify at minimum:

- iOS compact phone.
- iOS large phone.
- Android compact phone.
- Android large phone.
- Light mode.
- Dark mode.

Use available representative devices rather than hardcoding simulator model names. Across applicable scenarios, exercise normal, empty, loading, error, offline, disabled, long-content, and keyboard-visible states.

The matrix requires representative coverage, not redundant verification of every possible device × theme × state permutation. When several states use the same already-verified layout and shared component behavior, verify a representative set across the compact/large, iOS/Android, and light/dark dimensions rather than repeating equivalent combinations. Every materially distinct layout or visual state must still be rendered and visually inspected. Meaningful visual discrepancies must always be corrected before completion.

Maintain a concise record in `docs/TASKS.md` when it exists, including:

- Route/screen family and state.
- Stitch screen title and ID.
- Platform and representative device/viewport class.
- Theme.
- Command actually run.
- Functional result.
- Visual-comparison result and discrepancies found.
- Corrections made and remaining work.

Track these statuses separately:

- `implemented`
- `functionally verified`
- `visually verified iOS`
- `visually verified Android`

If `docs/TASKS.md` has not been created yet, provide the same evidence in the task handoff and mark persistent tracking as pending. Do not invent a successful verification record.

Never claim that a test, command, emulator/simulator run, or comparison was performed unless it actually was.

## 10. Definition of Done

### Per screen/state

A screen or state is complete only when all applicable conditions are satisfied:

- The exact Stitch reference and relevant design system were inspected.
- Existing reusable code was evaluated before new code was added.
- The state is driven by centralized, typed mock data/scenarios.
- Navigation and local interactions work end to end.
- Type checking, linting, and relevant automated tests pass.
- The screen/state was rendered on required representative iOS and Android phone sizes and in applicable themes.
- It was visually compared with Stitch and meaningful discrepancies were corrected through repeated render/compare cycles.
- Safe areas, scrolling, keyboard behavior, content variation, and accessibility were checked as applicable.
- Runtime warnings/errors were resolved or explicitly documented as blockers.
- Verification evidence and any pending checks were recorded truthfully.

### Overall UI phase

The UI phase is complete only when:

- Every applicable Stitch screen/state is reachable through navigation or an explicit mock scenario.
- The four primary destinations—Today, Tasks, Assistant, and History—and their supporting flows work end to end.
- Shared tokens and components are used consistently without unnecessary duplication.
- Complete light and dark UI coverage is present under the approved dark-mode policy.
- Required iOS and Android phone visual checks are complete.
- There are no known meaningful visual discrepancies.
- There are no prohibited production integrations or speculative backend architecture.
- The Stitch-to-route/scenario/verification mapping is complete in `docs/TASKS.md`.

## 11. Change and Reporting Discipline

- Preserve unrelated user changes and work safely in a dirty worktree.
- Avoid destructive commands and unnecessary broad rewrites.
- Keep changes scoped to the approved task and current phase.
- Do not modify Stitch or make arbitrary product/design decisions.
- Report files actually changed, commands actually run, functional checks actually performed, visual checks actually completed, and all pending verification.
- Do not mark work complete merely because it compiles.
