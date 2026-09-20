import { createContext, type PropsWithChildren, useContext } from "react";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts as useInterFonts } from "@expo-google-fonts/inter";
import { JetBrainsMono_500Medium, useFonts as useJetBrainsFonts } from "@expo-google-fonts/jetbrains-mono";
import { NavigationBar } from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "@/store";
import { trackFlyThemes, type TrackFlyTheme } from "@/theme/tokens";

const ThemeContext = createContext<TrackFlyTheme | null>(null);

export function TrackFlyThemeProvider({ children }: PropsWithChildren) {
  const themePreference = useAppSelector((state) => state.mockHarness.theme);
  const theme = trackFlyThemes[themePreference];
  const [interLoaded, interError] = useInterFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const [monoLoaded, monoError] = useJetBrainsFonts({ JetBrainsMono_500Medium });

  if ((!interLoaded || !monoLoaded) && !interError && !monoError) return null;
  if (interError || monoError) throw interError ?? monoError;

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <NavigationBar style={theme.mode === "dark" ? "dark" : "light"} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTrackFlyTheme(): TrackFlyTheme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTrackFlyTheme must be used inside TrackFlyThemeProvider");
  return theme;
}
