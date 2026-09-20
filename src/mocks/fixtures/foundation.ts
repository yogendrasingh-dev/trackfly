import type { MockAccountView, MockSessionKind } from "@/mocks/types";

export const FOUNDATION_SESSION_FIXTURES = {
  guest: {
    id: "account.local-guest",
    kind: "guest",
    displayName: "Guest",
  },
  authenticated: {
    id: "account.simulated-authenticated",
    kind: "authenticated",
    displayName: "Avery Morgan",
    email: "avery@example.test",
  },
} as const satisfies Record<MockSessionKind, MockAccountView>;
