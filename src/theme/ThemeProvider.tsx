import { createContext, type PropsWithChildren, useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "@/store";
import { trackFlyThemes, type TrackFlyTheme } from "@/theme/tokens";

const ThemeContext = createContext<TrackFlyTheme | null>(null);

export function TrackFlyThemeProvider({ children }: PropsWithChildren) {
  const themePreference = useAppSelector((state) => state.mockHarness.theme);
  const theme = trackFlyThemes[themePreference];

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTrackFlyTheme(): TrackFlyTheme {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTrackFlyTheme must be used inside TrackFlyThemeProvider");
  }

  return theme;
}
