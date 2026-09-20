import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  DEFAULT_MOCK_SCENARIO_ID,
  type MockScenarioId,
} from "@/mocks/scenarios/registry";
import type { MockSessionKind, ThemePreference } from "@/mocks/types";

export type MockHarnessState = Readonly<{
  selectedScenarioId: MockScenarioId;
  session: MockSessionKind;
  theme: ThemePreference;
}>;

const initialState: MockHarnessState = {
  selectedScenarioId: DEFAULT_MOCK_SCENARIO_ID,
  session: "guest",
  theme: "light",
};

const mockHarnessSlice = createSlice({
  name: "mockHarness",
  initialState,
  reducers: {
    selectScenario(state, action: PayloadAction<MockScenarioId>) {
      state.selectedScenarioId = action.payload;
    },
    setSession(state, action: PayloadAction<MockSessionKind>) {
      state.session = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
  },
});

export const { selectScenario, setSession, setTheme } =
  mockHarnessSlice.actions;

export const mockHarnessReducer = mockHarnessSlice.reducer;
