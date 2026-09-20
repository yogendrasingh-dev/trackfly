import type { ThemePreference } from "@/mocks/types";

const shared = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    mobileMargin: 20,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },
} as const;

const lightColors = {
  canvas: "#FBF8FC",
  surface: "#FFFFFF",
  surfaceLow: "#F6F2F7",
  surfaceHigh: "#EAE7EB",
  textPrimary: "#1B1B1E",
  textSecondary: "#464554",
  outlineSubtle: "#C7C4D7",
  brand: "#5E5CE6",
  onBrand: "#F4F1FF",
  success: "#006C49",
  attention: "#7A4C00",
} as const;

const darkColors = {
  canvas: "#13121B",
  surface: "#1C1A24",
  surfaceLow: "#201E28",
  surfaceHigh: "#2A2933",
  textPrimary: "#E5E0EE",
  textSecondary: "#C7C4D7",
  outlineSubtle: "rgba(255,255,255,0.08)",
  brand: "#5E5CE6",
  onBrand: "#F4F1FF",
  success: "#4EDEA3",
  attention: "#FFB95F",
} as const;

export const trackFlyThemes = {
  light: {
    mode: "light",
    colors: lightColors,
    ...shared,
  },
  dark: {
    mode: "dark",
    colors: darkColors,
    ...shared,
  },
} as const;

export type TrackFlyTheme = (typeof trackFlyThemes)[ThemePreference];
