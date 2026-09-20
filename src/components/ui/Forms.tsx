import type { PropsWithChildren, ReactNode } from "react";
import { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View, type TextInputProps } from "react-native";

import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type FieldProps = TextInputProps & Readonly<{ label: string; hint?: string; error?: string; leadingIcon?: TrackFlyIconName }>;

export const FormField = forwardRef<TextInput, FieldProps>(function FormField({ label, hint, error, leadingIcon, onFocus, onBlur, style, ...props }, ref) {
  const theme = useTrackFlyTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldBlock}>
      <Text style={[theme.typography.labelSmall, { color: error ? theme.colors.error : theme.colors.textSecondary }]}>{label}</Text>
      <View style={[styles.field, { backgroundColor: theme.colors.surfaceElevated, borderColor: error ? theme.colors.error : focused ? theme.colors.brand : theme.colors.outlineSubtle }]}>
        {leadingIcon ? <TrackFlyIcon color={focused ? theme.colors.brand : theme.colors.textTertiary} name={leadingIcon} /> : null}
        <TextInput
          {...props}
          ref={ref}
          accessibilityLabel={label}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          placeholderTextColor={theme.colors.textTertiary}
          selectionColor={theme.colors.brand}
          style={[styles.input, theme.typography.bodyMedium, { color: theme.colors.textPrimary }, style]}
        />
      </View>
      {error || hint ? <Text style={[theme.typography.bodySmall, { color: error ? theme.colors.error : theme.colors.textTertiary }]}>{error ?? hint}</Text> : null}
    </View>
  );
});

export const TextArea = forwardRef<TextInput, FieldProps>(function TextArea(props, ref) {
  return <FormField {...props} multiline numberOfLines={4} ref={ref} style={[styles.textArea, props.style]} textAlignVertical="top" />;
});

type ToggleRowProps = Readonly<{ label: string; description?: string; value: boolean; onValueChange: (value: boolean) => void; icon?: TrackFlyIconName }>;
export function ToggleRow({ label, description, value, onValueChange, icon }: ToggleRowProps) {
  const theme = useTrackFlyTheme();
  return (
    <View style={styles.toggleRow}>
      {icon ? <View style={[styles.iconWell, { backgroundColor: theme.colors.surfaceContainer }]}><TrackFlyIcon color={theme.colors.brand} name={icon} /></View> : null}
      <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={() => onValueChange(!value)} style={styles.toggleText}>
        <Text style={[theme.typography.labelMedium, { color: theme.colors.textPrimary }]}>{label}</Text>
        {description ? <Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{description}</Text> : null}
      </Pressable>
      <Switch accessibilityLabel={label} onValueChange={onValueChange} thumbColor="#FFFFFF" trackColor={{ false: theme.colors.surfaceHighest, true: theme.colors.primaryContainer }} value={value} />
    </View>
  );
}

export function GroupedFormSection({ label, children, footer }: PropsWithChildren<Readonly<{ label: string; footer?: ReactNode }>>) {
  const theme = useTrackFlyTheme();
  return (
    <View style={styles.groupBlock}>
      <Text style={[theme.typography.monoCaption, styles.groupLabel, { color: theme.colors.textTertiary }]}>{label.toUpperCase()}</Text>
      <View style={[styles.group, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineSubtle }]}>{children}</View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldBlock: { gap: 6 },
  field: { alignItems: "center", borderRadius: 12, borderWidth: 1, flexDirection: "row", gap: 9, minHeight: 48, paddingHorizontal: 13 },
  input: { flex: 1, minHeight: 46, paddingVertical: 10 },
  textArea: { minHeight: 112 },
  toggleRow: { alignItems: "center", flexDirection: "row", gap: 12, minHeight: 58, paddingHorizontal: 12, paddingVertical: 8 },
  toggleText: { flex: 1 },
  iconWell: { alignItems: "center", borderRadius: 10, height: 36, justifyContent: "center", width: 36 },
  groupBlock: { gap: 6 },
  groupLabel: { marginLeft: 4 },
  group: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, overflow: "hidden" },
});
