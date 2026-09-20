import { Platform, StyleSheet, type TextStyle, type ViewStyle } from "react-native";

import type { ThemePreference } from "@/mocks/types";

export const fontFamilies = {
  interRegular: "Inter_400Regular",
  interMedium: "Inter_500Medium",
  interSemiBold: "Inter_600SemiBold",
  monoMedium: "JetBrainsMono_500Medium",
} as const;

type TypographyRole = Readonly<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight" | "letterSpacing" | "lineHeight">>;

const typography = {
  display: { fontFamily: fontFamilies.interSemiBold, fontSize: 56, fontWeight: "600", letterSpacing: -1.96, lineHeight: 60 },
  headlineLarge: { fontFamily: fontFamilies.interSemiBold, fontSize: 36, fontWeight: "600", letterSpacing: -0.9, lineHeight: 42 },
  headlineLargeMobile: { fontFamily: fontFamilies.interSemiBold, fontSize: 28, fontWeight: "600", letterSpacing: -0.56, lineHeight: 34 },
  headlineMedium: { fontFamily: fontFamilies.interSemiBold, fontSize: 24, fontWeight: "600", letterSpacing: -0.48, lineHeight: 30 },
  headlineSmall: { fontFamily: fontFamilies.interMedium, fontSize: 20, fontWeight: "500", letterSpacing: -0.3, lineHeight: 26 },
  bodyLarge: { fontFamily: fontFamilies.interRegular, fontSize: 17, fontWeight: "400", letterSpacing: -0.17, lineHeight: 26 },
  bodyMedium: { fontFamily: fontFamilies.interRegular, fontSize: 15, fontWeight: "400", letterSpacing: -0.075, lineHeight: 23 },
  bodySmall: { fontFamily: fontFamilies.interRegular, fontSize: 13, fontWeight: "400", letterSpacing: 0, lineHeight: 20 },
  labelMedium: { fontFamily: fontFamilies.interMedium, fontSize: 14, fontWeight: "500", letterSpacing: -0.07, lineHeight: 20 },
  labelSmall: { fontFamily: fontFamilies.interMedium, fontSize: 12, fontWeight: "500", letterSpacing: 0.12, lineHeight: 16 },
  monoCaption: { fontFamily: fontFamilies.monoMedium, fontSize: 11, fontWeight: "500", letterSpacing: 0.44, lineHeight: 14 },
} as const satisfies Record<string, TypographyRole>;

const shared = {
  typography,
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, mobileMargin: 20, mobileGutter: 16 },
  radius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  sizing: { touchTarget: 44, control: 44, controlLarge: 48, denseRow: 54, iconSm: 16, iconMd: 20, iconLg: 24, dock: 66 },
  borders: { hairline: StyleSheet.hairlineWidth, regular: 1 },
} as const;

const lightColors = {
  canvas: "#FBF8FC", baseGround: "#FBF8FC", surfaceLowest: "#FFFFFF", surface: "#FFFFFF",
  surfaceLow: "#F6F2F7", surfaceContainer: "#F0EDF1", surfaceHigh: "#EAE7EB", surfaceHighest: "#E4E1E6",
  surfaceElevated: "#FFFFFF", surfaceCard: "#FFFFFF", surfaceOverlay: "rgba(255,255,255,0.94)",
  textPrimary: "#1B1B1E", textEmphasized: "#1B1B1E", textSecondary: "#464554", textTertiary: "#777586",
  outline: "#777586", outlineSubtle: "#C7C4D7", outlineFocused: "rgba(94,92,230,0.45)",
  brand: "#5E5CE6", primary: "#4441CC", primaryContainer: "#5E5CE6", onPrimary: "#FFFFFF", onBrand: "#F4F1FF",
  success: "#006C49", successContainer: "#6CF8BB", successAnchor: "#10B981",
  attention: "#7A4C00", attentionContainer: "#FFEDCF", attentionAnchor: "#F59E0B",
  error: "#BA1A1A", errorContainer: "#FFDAD6", onError: "#FFFFFF",
  scrim: "rgba(19,18,27,0.42)", assistantTint: "rgba(94,92,230,0.09)", assistantBorder: "rgba(94,92,230,0.24)",
  disabled: "#B8B4BF", onDisabled: "#716E78",
} as const;

const darkColors = {
  canvas: "#13121B", baseGround: "#0F0E17", surfaceLowest: "#0E0D16", surface: "#1C1A24",
  surfaceLow: "#1C1A24", surfaceContainer: "#201E28", surfaceHigh: "#2A2933", surfaceHighest: "#35333E",
  surfaceElevated: "#161524", surfaceCard: "#1E1D30", surfaceOverlay: "rgba(38,36,61,0.96)",
  textPrimary: "#E5E0EE", textEmphasized: "#F4F1FF", textSecondary: "#A5A3B8", textTertiary: "#6E6B82",
  outline: "#918FA0", outlineSubtle: "rgba(255,255,255,0.08)", outlineFocused: "rgba(94,92,230,0.45)",
  brand: "#5E5CE6", primary: "#C2C1FF", primaryContainer: "#5E5CE6", onPrimary: "#1800A7", onBrand: "#F4F1FF",
  success: "#4EDEA3", successContainer: "#00A572", successAnchor: "#10B981",
  attention: "#FFB95F", attentionContainer: "#4B351A", attentionAnchor: "#F59E0B",
  error: "#FFB4AB", errorContainer: "#93000A", onError: "#690005",
  scrim: "rgba(0,0,0,0.66)", assistantTint: "rgba(94,92,230,0.12)", assistantBorder: "rgba(94,92,230,0.35)",
  disabled: "#464554", onDisabled: "#918FA0",
} as const;

function elevation(mode: ThemePreference) {
  const dark = mode === "dark";
  return {
    card: Platform.select<ViewStyle>({ ios: { shadowColor: "#000000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: dark ? 0.24 : 0.05, shadowRadius: 12 }, android: { elevation: 1 }, default: {} }),
    floating: Platform.select<ViewStyle>({ ios: { shadowColor: "#000000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: dark ? 0.42 : 0.11, shadowRadius: 18 }, android: { elevation: 8 }, default: {} }),
    overlay: Platform.select<ViewStyle>({ ios: { shadowColor: "#000000", shadowOffset: { width: 0, height: -6 }, shadowOpacity: dark ? 0.45 : 0.16, shadowRadius: 24 }, android: { elevation: 16 }, default: {} }),
  } as const;
}

export const trackFlyThemes = {
  light: { mode: "light", colors: lightColors, elevation: elevation("light"), ...shared },
  dark: { mode: "dark", colors: darkColors, elevation: elevation("dark"), ...shared },
} as const;

export type TrackFlyTheme = (typeof trackFlyThemes)[ThemePreference];
export type TrackFlyColors = TrackFlyTheme["colors"];
export type TypographyName = keyof typeof typography;
