# TrackFly

TrackFly is an Expo SDK 57 React Native application. The active delivery phase is UI-only and uses centralized, deterministic, typed mock scenarios; production services and integrations are intentionally absent.

## Local development

Install dependencies and start Expo:

```bash
npm install
npm start
```

Open the native targets with:

```bash
npm run ios
npm run android
```

The development scenario harness is available at `/dev/scenarios`. A full reload intentionally restores its guest session and light-theme defaults.

## Checks

```bash
npm run typecheck
npm run lint
```

Expo Router route files live only in `src/app/`. Product implementation belongs outside the route tree. Repository scope, design authority, architecture boundaries, and delivery status are documented in `AGENTS.md` and `docs/`.
