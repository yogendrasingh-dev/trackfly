import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "destructive";

type ButtonProps = Readonly<{
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: TrackFlyIconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}>;

export function Button({ label, onPress, variant = "primary", icon, disabled = false, loading = false, fullWidth = false, accessibilityHint, style }: ButtonProps) {
  const theme = useTrackFlyTheme();
  const inactive = disabled || loading;
  const palette = {
    primary: { background: theme.colors.primaryContainer, border: theme.colors.primaryContainer, text: theme.colors.onBrand },
    secondary: { background: theme.colors.surfaceContainer, border: theme.colors.outlineSubtle, text: theme.colors.textPrimary },
    quiet: { background: "transparent", border: "transparent", text: theme.colors.primary },
    destructive: { background: theme.colors.errorContainer, border: theme.colors.errorContainer, text: theme.mode === "dark" ? "#FFDAD6" : theme.colors.error },
  }[variant];

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [styles.button, fullWidth && styles.fullWidth, { backgroundColor: inactive ? theme.colors.disabled : palette.background, borderColor: palette.border, opacity: pressed ? 0.76 : 1 }, style]}
    >
      {loading ? <ActivityIndicator color={theme.colors.onBrand} size="small" /> : icon ? <TrackFlyIcon color={inactive ? theme.colors.onDisabled : palette.text} name={icon} size={18} /> : null}
      <Text style={[theme.typography.labelMedium, { color: inactive ? theme.colors.onDisabled : palette.text }]}>{label}</Text>
    </Pressable>
  );
}

type IconButtonProps = Readonly<{
  icon: TrackFlyIconName;
  label: string;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: "small" | "regular";
}>;

export function IconButton({ icon, label, onPress, selected = false, disabled = false, size = "regular" }: IconButtonProps) {
  const theme = useTrackFlyTheme();
  const dimension = size === "small" ? theme.sizing.touchTarget : theme.sizing.controlLarge;
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, { width: dimension, height: dimension, backgroundColor: selected ? theme.colors.primaryContainer : theme.colors.surfaceContainer, borderColor: theme.colors.outlineSubtle, opacity: pressed ? 0.72 : disabled ? 0.45 : 1 }]}
    >
      <TrackFlyIcon color={selected ? theme.colors.onBrand : theme.colors.textPrimary} name={icon} size={size === "small" ? 19 : 21} />
    </Pressable>
  );
}

type AvatarButtonProps = Readonly<{ name: string; onPress?: () => void; image?: ReactNode }>;

export function AvatarButton({ name, onPress, image }: AvatarButtonProps) {
  const theme = useTrackFlyTheme();
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <Pressable accessibilityLabel={`Open profile for ${name}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.avatarTarget, { opacity: pressed ? 0.72 : 1 }]}>
      <View style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.outlineSubtle }]}>
        {image ?? <Text style={[theme.typography.labelSmall, { color: theme.colors.onBrand }]}>{initials}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 44, paddingHorizontal: 18, paddingVertical: 10 },
  fullWidth: { alignSelf: "stretch" },
  iconButton: { alignItems: "center", borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, justifyContent: "center" },
  avatarTarget: { alignItems: "center", height: 44, justifyContent: "center", width: 44 },
  avatar: { alignItems: "center", borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, height: 34, justifyContent: "center", width: 34 },
});
