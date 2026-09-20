import { useCallback } from "react";

import { mockClock } from "@/mocks/clock";
import { FOUNDATION_SESSION_FIXTURES } from "@/mocks/fixtures/foundation";
import {
  MOCK_SCENARIOS,
  type MockScenarioId,
} from "@/mocks/scenarios/registry";
import type { MockSessionKind, ThemePreference } from "@/mocks/types";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectScenario,
  setSession,
  setTheme,
} from "@/store/mockHarnessSlice";

export function useMockHarnessController() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState) => rootState.mockHarness);
  const selectMockScenario = useCallback(
    (scenarioId: MockScenarioId) => dispatch(selectScenario(scenarioId)),
    [dispatch],
  );
  const selectMockSession = useCallback(
    (session: MockSessionKind) => dispatch(setSession(session)),
    [dispatch],
  );
  const selectMockTheme = useCallback(
    (theme: ThemePreference) => dispatch(setTheme(theme)),
    [dispatch],
  );

  return {
    ...state,
    currentAccount: FOUNDATION_SESSION_FIXTURES[state.session],
    currentTimeIso: mockClock.nowIso(),
    scenarios: MOCK_SCENARIOS,
    selectScenario: selectMockScenario,
    selectSession: selectMockSession,
    selectTheme: selectMockTheme,
  } as const;
}
