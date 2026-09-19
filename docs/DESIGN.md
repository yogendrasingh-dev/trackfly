# TrackFly Design System

This document defines what TrackFly should look and feel like and the reusable visual rules needed to reproduce the approved designs in Expo, React Native, and TypeScript. It complements the workflow and quality gates in the root `AGENTS.md`; it does not replace or repeat them.

Google Stitch is the visual source of truth:

- Project: `TrackFly`
- Resource: `projects/6783092224109966385`
- Light design system: `Ambient Clarity` (`assets/0d01248eb2384892b793ea4894d01e83`)
- Dark design system: `Ambient Clarity Dark` (`assets/50df3b99b9804353a530b6de80595754`)

Stitch screenshots and metadata control screen-specific appearance. Generated web markup may support measurement and component-anatomy analysis, but it is not application architecture and must not be copied into the React Native implementation.

## Evidence Model

Rules in this document use three evidence levels:

- **Direct:** supplied explicitly by a Stitch design system, screen screenshot, or screen metadata.
- **Derived:** repeated consistently across multiple approved screens and safe to standardize.
- **Adaptive:** React Native behavior required to preserve the approved design across phone sizes and platforms.

Do not invent an exact value when Stitch does not provide enough evidence. Not every observed measurement needs to become a token.

## Visual Language

TrackFly uses a calm, information-dense mobile aesthetic described by Stitch as **Ambient Clarity**.

- Warm alabaster surfaces define light mode; violet-tinted graphite surfaces define dark mode.
- Electric Iris emphasizes primary actions, assistant activity, and focus.
- Emerald communicates success, completion, readiness, and synchronization.
- Amber communicates attention, pending or time-sensitive information.
- Red is reserved for destructive actions and errors.
- Layered tonal surfaces, hairline borders, diffuse shadows, and restrained violet glows establish hierarchy without heavy outlines.
- Rounded cards and controls, compact pills, circular icon containers, and larger rounded sheets create a tactile handheld character.
- Dense task and reminder information remains orderly through clear hierarchy, compact metadata, badges, and predictable alignment.
- Photography is sparse and contextual. Most state illustrations are composed from icons, circles, glow fields, and cards.
- Motion is fast and restrained: press feedback, subtle pulses or progress indicators, skeletons, and sheet transitions rather than decorative animation.

Avoid arbitrary gradients, decoration, color roles, or visual motifs not supported by Stitch.

## Brand Mark

The approved brand-mark reference is `4bb8af66f60c444c9ff75c90d70bd031`.

The mark is a rounded Electric Iris square containing a white curved flight/path form, three trailing dots, and a subtle highlight. Use the approved asset as an image. Do not reconstruct it with CSS, a generic icon, text glyphs, or improvised vector paths.

- Preserve its proportions and internal clear space.
- Use it as an app/destination identity mark, not as a generic decorative icon.
- Do not recolor, crop, distort, rotate, or add unapproved effects.
- Stitch-hosted URLs are references only; production UI must use a local bundled asset.

## Color System

Use semantic roles rather than selecting colors by appearance. The brand overrides, semantic `primary`, and `primary-container` are intentionally distinct; do not collapse every violet, green, or amber into one value.

### Core light and dark roles

| Role | Light | Dark | Evidence |
|---|---|---|---|
| Canvas / surface | `#FBF8FC` | `#13121B` | Direct |
| Base ground | Canvas role | `#0F0E17` | Direct dark extension |
| Surface lowest | `#FFFFFF` | `#0E0D16` | Direct |
| Surface low | `#F6F2F7` | `#1C1A24` | Direct |
| Specialized elevated surface | Use the light surface hierarchy | `#161524` | Direct dark extension |
| Surface container | `#F0EDF1` | `#201E28` | Direct |
| Specialized card surface | White or the appropriate light tier | `#1E1D30` | Direct dark extension |
| Surface high | `#EAE7EB` | `#2A2933` | Direct |
| Surface highest | `#E4E1E6` | `#35333E` | Direct |
| Specialized overlay | Highest/floating light tier | `#26243D` | Direct dark extension |
| Primary text | `#1B1B1E` | `#E5E0EE` | Direct |
| Emphasized dark text | Primary text role | `#F4F1FF` | Direct dark extension |
| Secondary text | `#464554` | `#C7C4D7` | Direct |
| Specialized dark secondary text | Secondary text role | `#A5A3B8` | Direct dark extension |
| Tertiary text | Use the appropriate muted semantic/outline role | `#6E6B82` | Dark value direct; exact light counterpart unresolved |
| Outline | `#777586` | `#918FA0` | Direct |
| Subtle outline | `#C7C4D7` | `rgba(255,255,255,0.08)` | Direct |
| Focused border | Primary focus treatment | `rgba(94,92,230,0.45)` | Direct dark extension |

### Accent and semantic roles

| Role | Light | Dark | Evidence |
|---|---|---|---|
| Brand Iris override | `#5E5CE6` | `#5E5CE6` | Direct and repeated visually |
| Semantic primary | `#4441CC` | `#C2C1FF` | Direct |
| Primary container | `#5E5CE6` | `#5E5CE6` | Direct |
| On primary | `#FFFFFF` | `#1800A7` when paired with dark semantic primary | Direct |
| On primary container | `#F4F1FF` | `#F4F1FF` | Direct |
| Success semantic | `#006C49` | `#4EDEA3` | Direct |
| Success container | `#6CF8BB` | `#00A572` | Direct |
| Brand success anchor | `#10B981` | `#10B981` | Direct override |
| Attention semantic | `#7A4C00` | `#FFB95F` | Direct |
| Attention fixed | `#FFB95F` | `#FFB95F` | Direct |
| Brand attention anchor | `#F59E0B` | `#F59E0B` | Direct override |
| Error | `#BA1A1A` | `#FFB4AB` | Direct |
| Error container | `#FFDAD6` | `#93000A` | Direct |
| On error | `#FFFFFF` | `#690005` | Direct |

The override colors are brand anchors, not replacements for every semantic shade. Components should consume semantic roles such as `primary`, `primaryContainer`, `success`, `attention`, or `error`, selected according to the approved reference.

## Typography

Inter is the main interface family. JetBrains Mono is a specialized metadata family.

| Token | Family | Size | Line height | Weight | Source letter spacing |
|---|---|---:|---:|---:|---:|
| `display` | Inter | 56 | 60 | 600 | `-0.035em` |
| `headlineLarge` | Inter | 36 | 42 | 600 | `-0.025em` |
| `headlineLargeMobile` | Inter | 28 | 34 | 600 | `-0.02em` |
| `headlineMedium` | Inter | 24 | 30 | 600 | `-0.02em` |
| `headlineSmall` | Inter | 20 | 26 | 500 | `-0.015em` |
| `bodyLarge` | Inter | 17 | 26 | 400 | `-0.01em` |
| `bodyMedium` | Inter | 15 | 23 | 400 | `-0.005em` |
| `bodySmall` | Inter | 13 | 20 | 400 | `0` |
| `labelMedium` | Inter | 14 | 20 | 500 | `-0.005em` |
| `labelSmall` | Inter | 12 | 16 | 500 | `0.01em` |
| `monoCaption` | JetBrains Mono | 11 | 14 | 500 | `0.04em` |

These sizes and line heights are direct Stitch values expressed as React Native point-like numbers. CSS `em` letter spacing is retained as source evidence; calibrate the React Native numeric equivalent visually rather than copying it blindly.

### Usage rules

- Use Inter for headings, body copy, buttons, form labels, navigation labels, and ordinary controls in both themes.
- Use `monoCaption` only for timestamps, cadence, parsed entities, machine/status metadata, technical labels, and compact badges.
- Use the mobile headline token on compact screens when the larger headline would create unintended wrapping.
- Allow headings and body content to wrap naturally. Do not use fixed text-container heights unless an approved reference clearly truncates the content.
- Prefer weight and semantic color changes over adding unsupported type sizes.

The light Stitch metadata names JetBrains Mono as its label family while the dark metadata names Inter. Repeated screen evidence supports Inter for ordinary control labels and JetBrains Mono only for technical metadata; that is the canonical interpretation.

## Spacing and Sizing

### Direct spacing scale

| Token | Value |
|---|---:|
| `spaceXs` | 4 |
| `spaceSm` | 8 |
| `spaceMd` | 16 |
| `spaceLg` | 24 |
| `spaceXl` | 40 |
| `mobileMargin` | 20 |
| `mobileGutter` | 16 |

### Derived sizing rules

- Default card padding is usually 12–16.
- Dense rows typically maintain 52–56 points of visual height.
- Standard primary controls commonly use 44 or 48 points of height. Large onboarding actions may be taller when the reference requires it.
- Interactive targets must remain at least 44 points even when the visible icon or chip is smaller.
- Section separation should follow the 8-point rhythm instead of introducing arbitrary gaps.
- The 20-point mobile margin is the baseline, not permission to overflow compact phones.

## Shape and Borders

The approved radius candidates are 4, 8, 12, 16, 24, and full-pill.

- 4: very small indicators and compact metadata.
- 8: inputs, small controls, and nested surfaces.
- 12: common rows, buttons, and compact cards.
- 16–24: large cards, modal surfaces, and hero containers.
- Full: chips, status pills, circular controls, and capture bars.

Bottom sheets use a visibly larger top radius. Representative markup supplies 28 points for the sheet top; keep this as a component-specific value rather than adding it to the general scale.

Use subtle hairlines to separate adjacent surfaces only when tonal contrast is insufficient. Dark elevated surfaces use low-opacity white borders, usually `rgba(255,255,255,0.08)`. Avoid heavy outlines.

The Stitch design-system prose and generated screen configurations expose different subsets of the radius scale. Use the component assignments above and verify against the corresponding screenshot rather than assuming a web utility name maps to a universal token.

## Elevation and Glass

Define elevation by visual role:

1. **Canvas:** no shadow.
2. **Card:** tonal separation, optional subtle hairline, and a very soft ambient shadow.
3. **Floating header/dock:** translucent surface, platform-appropriate blur where available, hairline edge, and soft edge shadow.
4. **Sheet/dialog:** scrim plus a stronger diffuse shadow.
5. **Assistant focus:** restrained violet bloom around the active capture or assistant element.

Stitch supplies these web references:

- Light card: `0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -4px rgba(0,0,0,0.02)`.
- Light floating surface: `0 16px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)`.
- Dark floating/focus surface: `0 8px 32px -4px rgba(0,0,0,0.5), 0 0 16px -2px rgba(94,92,230,0.15)`.

These are visual references, not drop-in React Native values. Calibrate iOS shadows, Android elevation, blur, opacity, and fallbacks on rendered devices.

## Iconography, Imagery, and Illustration

- Icons are compact, simple, and mostly outlined; selected or emphasized states may become filled.
- Common visible icon sizes are approximately 18–24 points, with smaller metadata icons around 12–16 points.
- Place important icons in circular or rounded-square tonal containers when the reference does so.
- Material Symbols appearing in Stitch-generated markup do not choose or approve a React Native icon dependency. Decide the final icon library and glyph mapping during implementation based on Expo compatibility and visual fidelity to the approved Stitch references.
- Use emoji only where the approved screen clearly treats it as content, not as an icon-system substitute.
- Contextual photography appears sparingly as supporting hero or card imagery in a few references, including reminder details, account-sync success, an itinerary status card, and a subscription feature card. Preserve the reference aspect ratio, crop intent, radius, overlay, and text legibility; these examples do not imply additional screen families.
- Empty, permission, loading, success, and error illustrations should be composed from reusable icon-and-shape primitives rather than unrelated stock artwork.
- Final local image sources, licensing, and focal points must be resolved before shipping; remote Stitch URLs must not be runtime dependencies.

## Motion

Motion communicates state rather than decorating the interface.

- Press scaling is optional and should be used only where the approved Stitch behavior or supporting reference demonstrates it. Otherwise use appropriate interaction feedback without inventing press-scale animation across controls.
- Use restrained pulses, sound-wave movement, progress rings, or activity indicators for listening, processing, and synchronization.
- Skeletons should preserve the destination layout and use low-contrast tonal blocks.
- Sheets and dialogs should enter and exit as coherent surfaces without flamboyant overshoot.
- Respect reduced-motion preferences.

Exact durations, easings, spring values, and haptics are not sufficiently established by Stitch and require implementation-time calibration.

## Layout and Adaptive Behavior

The current supported targets are iOS and Android phones in portrait orientation.

- Use a single-column fluid canvas with the 20-point outer margin as the normal baseline.
- Do not hardcode the 390-point Stitch canvas, 780-pixel export width, or any full-content screenshot height.
- Use runtime safe-area insets for headers, floating docks, bottom actions, sheets, home indicators, display cutouts, and Android system navigation.
- Use native status and navigation bars. Do not render the simulated status bars visible in some Stitch exports.
- Keep scrolling content separate from fixed/floating headers and the bottom dock.
- Reserve bottom content padding equal to the rendered dock plus the current safe-area inset.
- Keyboard-sensitive forms and assistant composers must remain visible and reachable while the keyboard is open.
- Prefer natural wrapping and growing containers. Truncate only where the corresponding reference clearly demonstrates truncation.
- Virtualize long task, history, reminder, and settings lists without changing row geometry.
- On compact phones, compress flexible gaps before changing typography or touch targets.
- On larger phones, preserve readable measure and spacing instead of stretching cards disproportionately.
- Support long names, localized-style strings, multiple lines, empty values, large lists, and content growth.
- Do not introduce tablet/web breakpoints during the phone-only phase.

## Navigation and Headers

### Bottom dock

The canonical dock contains four destinations:

1. Today
2. Tasks
3. Assistant
4. History

Assistant receives the strongest central emphasis. Its visual state may reflect listening, capture, or creation, but it remains the Assistant destination. Stitch variants that add `Prefs`, replace Assistant with `New`, or show an unlabeled center orb are state-specific inconsistencies and do not add destinations.

The dock floats above the system bottom inset, uses a translucent/elevated surface, keeps all targets accessible, and clearly distinguishes the active destination.

### Headers

Use three evidence-based header families:

- **Branded destination:** brand mark plus destination title and trailing profile/action control.
- **Back-title:** back control, screen title, and optional trailing action.
- **Assistant flow:** brand/assistant identity, contextual state label, and compact flow controls.

Header content may scroll away or remain fixed according to the corresponding Stitch reference. Naming differences such as `Today` versus `TrackFly — History` do not justify inventing additional header families.

## Reusable Component Families

Build shared components only when supported by repeated screen evidence:

- `ScreenSurface`: themed canvas, safe-area handling, scroll/static mode, and content margin.
- `AppHeader`: branded destination, back-title, and assistant-flow variants.
- `BottomDock`: the canonical four-destination navigation and Assistant emphasis states.
- `Button`: primary, secondary, quiet, destructive, and icon variants.
- `IconButton` and `AvatarButton`.
- `SurfaceCard`: default, elevated, highlighted, warning, error, and assistant-confirmation treatments.
- `ListRow`: task, reminder, history, settings, and selectable compositions.
- `TaskReminderRow`: completion control, title, metadata, tags, and trailing action.
- `StatusChip`, `FilterChip`, and `EntityTag`.
- `FormField`, `TextArea`, `ToggleRow`, and grouped form section.
- `QuickCaptureBar`: text, microphone, send, disabled, and offline variants.
- `AssistantMessage` and `ParsedActionCard`.
- `BottomSheet`, `Dialog`, and blocking transaction/state overlay.
- `StateView`: empty, permission, offline, error, success, and usage-limit presentations.
- `SkeletonBlock` plus family-specific skeleton compositions.
- `PlanCard`, `FeatureRow`, and purchase-state presentation.
- `BrandMark`: asset-backed identity component.

Do not create separate components merely because Stitch represents the same component in another state or theme. Prefer variants and typed composition over duplicated implementations.

## Component Patterns

### Buttons

- Primary actions use a filled violet role with strong label contrast and a minimum 44-point target.
- Secondary actions use a quieter tonal surface and normal text hierarchy.
- Quiet actions may be text-only but retain a full touch target.
- Destructive actions use the error semantic role and must not share ordinary primary emphasis.
- Full-width buttons commonly appear in onboarding, forms, permissions, and purchase flows.
- Rounded-full treatment is reserved for pill-like hero actions or capture controls; ordinary buttons normally use the 8–12 radius range.

### Inputs and forms

- Group related fields in a tonal card when the reference presents them as a unit.
- Inputs use soft filled surfaces rather than heavy outlines.
- Focus is communicated through the Iris semantic role and a restrained focus ring/glow.
- Text areas grow or scroll without pushing critical actions behind the keyboard.
- Date, time, cadence, and alert rows use leading icons, primary values, and compact trailing metadata or chevrons.
- Switches and selection controls use semantic selected colors and platform-accessible behavior.

### Cards, lists, and rows

- Use the surface hierarchy before adding borders or shadows.
- Task and reminder rows prioritize title, then time/category metadata, then trailing actions.
- Completed rows reduce emphasis and use emerald completion indicators without becoming illegible.
- Settings use grouped sections with compact uppercase/mono section labels and rounded rows.
- Dividers should be subtle and used only when spacing and surface separation are insufficient.

### Chips and badges

- Chips and tags are compact pills with concise content.
- Status chips use semantic colors: emerald for ready/synced/active, amber for pending/attention, red for error, and Iris for assistant/system context.
- Filter chips have selected and unselected tonal states without changing layout.
- Entity tags and machine-parsed values may use `monoCaption`.

### Assistant and quick capture

- User messages use a strong Iris surface; assistant responses use elevated neutral cards.
- Parsed actions appear as structured confirmation cards with type, title, cadence/time, status, and primary/secondary actions.
- The capture bar floats above the dock when required and supports text, microphone, attachment, and send states without changing its fundamental geometry.
- Voice states use a central microphone/waveform focus, live transcription, compact detected-entity tags, and an explicit cancel/fallback path.

### Sheets, dialogs, and overlays

- Bottom sheets use a dimmed scrim, large top corners, a visible grabber, safe-area-aware bottom padding, and independently scrollable content when necessary.
- Dialogs and transaction overlays center or bottom-anchor a concise status surface depending on the approved reference.
- Permission education appears before a simulated system action and explains value/privacy without imitating an OS permission dialog.
- Loading, success, and failure overlays preserve a stable container so state transitions do not visibly jump.

### Empty, loading, error, and offline states

- Empty states combine a restrained icon illustration, a short heading, supporting copy, and one clear recovery/creation action.
- Skeleton states mirror the actual destination structure rather than displaying generic spinners.
- Error states explain what happened, preserve user input when relevant, and provide a primary recovery action plus a safe fallback.
- Offline state uses amber attention treatment, explains local behavior, and keeps local mock actions available.
- Success states use emerald emphasis and a concise summary of what changed.

### Subscription and purchase

- Paywalls use a clear headline, concise benefit rows, plan selection, one dominant purchase action, and quiet legal/restore links.
- Feature gates and purchase states may use sheets or blocking cards over a scrim.
- Processing, success, failure, and restore variants share stable geometry and semantic state colors.
- This document governs presentation only. Pricing, entitlements, product copy, and billing behavior belong to product requirements and later integration work.

## Light and Dark Theme Application

Explicit dark screenshots are authoritative:

- Today Dark — `2680f8413ddb4006b3d4356617aed2e0`
- Tasks Dark — `98997bdc6b2848ec86f3b800b2cc868c`
- Assistant Dark — `16289e7783504266854939b91605149a`
- Settings Dark — `06183b0975064707b2a04a7eeae76052`
- TrackFly Pro Dark — `26533e2dd36e473da6883494f5da03b8`

For screens without an explicit dark reference:

- Preserve the light screen's layout, hierarchy, content, and component anatomy.
- Replace surface, text, outline, accent, error, and state colors through semantic dark tokens.
- Establish depth through lightness tiers and subtle borders before adding shadow.
- Preserve legibility and state meaning; dark mode must not merely invert colors.
- Adapt scrims, glows, blur fallbacks, status bar, and Android navigation bar to the dark canvas.
- Do not introduce new content, navigation, or decorative treatments.

## Stitch Screen Inventory

The inventory contains 52 mobile screens/states and one brand asset. State, overlay, loading, permission, transaction, and theme variants normally share routes and components with their family.

### Brand asset

| ID | Stitch title | Role |
|---|---|---|
| `4bb8af66f60c444c9ff75c90d70bd031` | TrackFly Brand Mark | Approved identity asset |

### Welcome and onboarding

| ID | Stitch title | Role |
|---|---|---|
| `1b21e26c7d884ca993ecfe13cceb95e0` | TrackFly — Welcome & Onboarding | Landing/onboarding entry |
| `54414e8396e34114bbf26a461483d11a` | TrackFly — Onboarding 1: Remember Less | Onboarding step |
| `e5d3d70bd3044ad5b6e1876425f5aec8` | TrackFly — Onboarding 2: Say It Naturally | Voice concept step |
| `1321379cf0354b159c03485e087a719d` | TrackFly — Onboarding 3: Never Miss | Notification/value step |

### Authentication and account entry

| ID | Stitch title | Role |
|---|---|---|
| `83bb7cbbc8b54936b2bb6cc6b636d3d9` | TrackFly — Account Entry | Authentication choice |
| `d526aac9a7c144f19911fe5ccc098ac4` | TrackFly — Sign In | Sign-in form |
| `caf84836302f447eadf7629b7ba5c85b` | TrackFly — Create Account | Account-creation form |
| `5d22a5fe8f7649b397fe6eae17c2746b` | TrackFly — Forgot Password | Password-recovery form |

### Today

| ID | Stitch title | Role |
|---|---|---|
| `f3fb0729c1d94468a2cdaa15eed31241` | TrackFly — Today Home | Populated light reference |
| `53c6eb7c37dc43e3ae8e18134a7e8dd0` | TrackFly — Empty Today | Empty state |
| `abb6e92c8cb04b0282973ee82c562160` | TrackFly — Today Loading | Skeleton state |
| `2680f8413ddb4006b3d4356617aed2e0` | TrackFly — Today Dark | Explicit dark reference |

### Tasks and search

| ID | Stitch title | Role |
|---|---|---|
| `23557b5041894319be437ac071777dd9` | TrackFly — Tasks | Light reference with incomplete/blank populated content |
| `c8b60f791ca74b7dad1206326e584647` | TrackFly — Empty Tasks | Empty state |
| `af8b1171f33846a8ac1b042293512497` | TrackFly — Tasks Loading | Skeleton state |
| `55ecc139d25b4fdd85efae3abbc66f37` | TrackFly — No Search Results | Search-empty state |
| `98997bdc6b2848ec86f3b800b2cc868c` | TrackFly — Tasks Dark | Populated structure and explicit dark reference |

The populated light Tasks screen uses Tasks Dark as structural authority and applies the approved light semantic tokens.

### Assistant and voice

| ID | Stitch title | Role |
|---|---|---|
| `9c9cc8ae1cf64db5a74b2743a0f2f298` | TrackFly — AI Assistant | Main assistant state |
| `79cc7e416dc1461882973d002ca5c5ca` | TrackFly — AI Clarification | Clarification state |
| `07ea4107e75e48a2bff88f1bc6f6f4e6` | TrackFly — AI Processing Error | Assistant error state |
| `b605c6bbac70431f832e35cb39803126` | TrackFly — AI Usage Limit | Limit sheet/state |
| `16289e7783504266854939b91605149a` | TrackFly — Assistant Dark | Explicit dark reference |
| `33d974f2957248dfa1ba40bebbd8a76b` | TrackFly — Voice Listening | Active listening state |
| `23a67f73e1744294ad78e0d949328613` | TrackFly — Voice Transcribing | Transcription/confirmation state |
| `e301979a849a45a48652a8abb3bd9013` | TrackFly — Voice Failure | Voice error sheet |

### Reminder lifecycle

| ID | Stitch title | Role |
|---|---|---|
| `369933a2dc6a46fca18c70d34934ff50` | TrackFly — Create & Edit Reminder | Reminder form |
| `ee12f37d3e34401ebca45d1fabdf9069` | TrackFly — Reminder Details | Detail/history/actions |
| `4f7e9eb4c9d841f2bb19f79f895970e3` | TrackFly — Snooze Bottom Sheet | Snooze sheet |
| `1336a16636e9419abf847918df469f93` | TrackFly — Reminder Creation Failure | Preserved-data error state |
| `e7730c85c65b4af99d326166a962ab48` | TrackFly — First Reminder Success | Success sheet |

### History

| ID | Stitch title | Role |
|---|---|---|
| `e70344b315474a5682565a908eed9e43` | TrackFly — History | Populated history |
| `624c22838e1f46f68f7d249dcc04c8cd` | TrackFly — Empty History | Empty state |
| `578e630779c740af9c6e8a9bc807a7c2` | TrackFly — History Loading | Skeleton state |

### Settings, profile, account, and permissions

| ID | Stitch title | Role |
|---|---|---|
| `28df8e70842d4dafa932d1b7e05768a5` | TrackFly — Settings | Settings light reference |
| `06183b0975064707b2a04a7eeae76052` | TrackFly — Settings Dark | Explicit dark reference |
| `dedb164808084f87b70b17466757e250` | TrackFly — Profile | Profile/account hub |
| `330c9df709d842bdbffcb1f35b7e3075` | TrackFly — Notification Settings | Notification preferences |
| `8e9d0d8eecb148cba4a2c9ad3e6ab2e7` | TrackFly — Notification Pre-Permission | Permission education |
| `fb16cefd254d4069a41d2fe7d16fbe6d` | TrackFly — Notifications Off | Disabled-permission state |
| `312c5f1a88b24c3f856fdff94f96d31a` | TrackFly — Microphone Permission Sheet | Microphone education sheet |
| `c11488dd5a8c4223933677e36198de87` | TrackFly — Microphone Access Off | Disabled-permission sheet |
| `b24b591bc8d64ea2bd2285a82c506d42` | TrackFly — Account Sync Complete | Account/sync success |

### Subscription and purchase

| ID | Stitch title | Role |
|---|---|---|
| `a21995ba7351436a8181ca2bd1fc53e7` | TrackFly — TrackFly Pro Paywall | Main paywall |
| `5801d9fe0f0840dc9cffcbea97fa2acc` | TrackFly — Your Plan (Free) | Free-plan account state |
| `bbd4aa7cec814283a12e6657647d2398` | TrackFly — Your Plan (Pro) | Active-plan state |
| `0523e534e21541c5b23ebb1b38763b4c` | TrackFly — Pro Feature Gate | Feature-gate sheet |
| `0201d9d31a564fb2827a522b743f3473` | TrackFly — Purchase Processing | Processing state |
| `c99bee7639ff4fe1ab79bb0fcb1426c1` | TrackFly — Purchase Success | Success state |
| `6eff4c8c2f1d4e148c0fa407823850e3` | TrackFly — Purchase Failed | Failure state |
| `aee3980744d4412fa92f44d10c9ba9e5` | TrackFly — Restore Purchases States | Restore-state anatomy |
| `26533e2dd36e473da6883494f5da03b8` | TrackFly — TrackFly Pro Dark | Explicit dark reference |

### Offline/system state

| ID | Stitch title | Role |
|---|---|---|
| `bdb08bf6272245edae7db825d0fe6726` | TrackFly — Offline State | Offline/local behavior presentation |

## Known Stitch Inconsistencies and Canonical Interpretation

- **Bottom navigation:** Some AI, voice, and offline references add `Prefs`, use an unlabeled center orb, or relabel the center action as `Ask`, `New`, or microphone. The canonical model remains Today, Tasks, Assistant, and History. State-specific treatment belongs inside the Assistant action.
- **Populated Tasks light screen:** The screenshot is essentially blank. Use Tasks Dark as structural authority and apply light semantic tokens.
- **Typography metadata:** Use Inter for normal labels across themes and JetBrains Mono only for technical metadata.
- **Primary violet naming:** Preserve separate brand, semantic primary, and primary-container roles.
- **Radius declarations:** Use the evidence-based component assignments rather than relying on generated web utility names.
- **Headers and system chrome:** Use native system chrome and the defined header families; do not reproduce simulated status bars.
- **Sheets and overlays:** A cropped or missing underlay is contextual. The sheet geometry remains authoritative.
- **Assistant branding:** Use the approved brand mark and normal text; do not reproduce malformed generated wordmarks.
- **Paywall content:** Stitch variants disagree on features, pricing, and plan details. Preserve visual patterns, but defer product truth to `docs/PRODUCT.md` when it exists.

## Values Requiring Implementation-Time Calibration

The following values are not determined confidently enough to present as fixed tokens:

- Native iOS shadow and Android elevation equivalents.
- Blur strength and fallbacks where native glass effects differ or are unavailable.
- Final icon library, glyph mapping, fill/weight, and optical sizing.
- Final local image assets, licensing, crop/focal points, and placeholder status.
- Animation durations, easing curves, spring values, haptics, and reduced-motion details.
- Compact-phone typography changes beyond `headlineLargeMobile`.
- Maximum Dynamic Type scaling, truncation policy, and minimum supported phone width.
- A dedicated light-theme tertiary-text value.
- Whether avatars use images, initials, or fixture-specific representations.
- Product copy, feature lists, pricing, and billing details where Stitch variants disagree.

These are explicit calibration points, not permission to invent values. Resolve them during the relevant implementation task through Stitch comparison, platform testing, or an approved product/design decision.
