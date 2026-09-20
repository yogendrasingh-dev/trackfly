import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export type SurfaceTone = "default" | "elevated" | "highlighted" | "warning" | "error" | "assistant";

export function SurfaceCard({ children, tone = "default", style }: PropsWithChildren<Readonly<{ tone?: SurfaceTone; style?: StyleProp<ViewStyle> }>>) {
  const theme = useTrackFlyTheme();
  const colors = {
    default: [theme.colors.surface, theme.colors.outlineSubtle], elevated: [theme.colors.surfaceCard, theme.colors.outlineSubtle],
    highlighted: [theme.colors.assistantTint, theme.colors.assistantBorder], warning: [theme.colors.attentionContainer, theme.colors.attentionAnchor],
    error: [theme.colors.errorContainer, theme.colors.error], assistant: [theme.colors.surfaceCard, theme.colors.assistantBorder],
  }[tone];
  return <View style={[styles.card, tone !== "default" && theme.elevation.card, { backgroundColor: colors[0], borderColor: colors[1] }, style]}>{children}</View>;
}

type ListRowProps = Readonly<{
  title: string; subtitle?: string; leading?: ReactNode; trailing?: ReactNode; onPress?: () => void;
  accessibilityLabel?: string; selected?: boolean;
}>;

export function ListRow({ title, subtitle, leading, trailing, onPress, accessibilityLabel, selected = false }: ListRowProps) {
  const theme = useTrackFlyTheme();
  const content = (
    <>
      {leading}<View style={styles.rowText}><Text style={[theme.typography.labelMedium, { color: theme.colors.textPrimary }]}>{title}</Text>{subtitle ? <Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{subtitle}</Text> : null}</View>{trailing}
    </>
  );
  if (!onPress) return <View style={[styles.row, selected && { backgroundColor: theme.colors.assistantTint }]}>{content}</View>;
  return <Pressable accessibilityLabel={accessibilityLabel ?? title} accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.row, selected && { backgroundColor: theme.colors.assistantTint }, { opacity: pressed ? 0.72 : 1 }]}>{content}</Pressable>;
}

type ChipTone = "neutral" | "primary" | "success" | "attention" | "error";
type ChipProps = Readonly<{ label: string; tone?: ChipTone; selected?: boolean; onPress?: () => void; icon?: TrackFlyIconName }>;

function Chip({ label, tone = "neutral", selected = false, onPress, icon }: ChipProps) {
  const theme = useTrackFlyTheme();
  const palette = {
    neutral: [theme.colors.surfaceContainer, theme.colors.textSecondary, theme.colors.outlineSubtle], primary: [theme.colors.assistantTint, theme.colors.brand, theme.colors.assistantBorder],
    success: [theme.mode === "dark" ? "rgba(78,222,163,0.12)" : "#DDFBEF", theme.colors.success, theme.colors.successAnchor],
    attention: [theme.colors.attentionContainer, theme.colors.attention, theme.colors.attentionAnchor], error: [theme.colors.errorContainer, theme.colors.error, theme.colors.error],
  }[tone];
  const body = <View style={[styles.chip, { backgroundColor: selected ? theme.colors.primaryContainer : palette[0], borderColor: selected ? theme.colors.primaryContainer : palette[2] }]}>{icon ? <TrackFlyIcon color={selected ? theme.colors.onBrand : palette[1]} name={icon} size={13} /> : null}<Text style={[theme.typography.labelSmall, { color: selected ? theme.colors.onBrand : palette[1] }]}>{label}</Text></View>;
  return onPress ? <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}>{body}</Pressable> : body;
}

export function StatusChip(props: Omit<ChipProps, "onPress" | "selected">) { return <Chip {...props} />; }
export function FilterChip(props: ChipProps) { return <Chip {...props} />; }
export function EntityTag(props: Omit<ChipProps, "tone">) {
  const theme = useTrackFlyTheme();
  return <View style={[styles.entity, { backgroundColor: theme.colors.assistantTint, borderColor: theme.colors.assistantBorder }]}><Text style={[theme.typography.monoCaption, { color: theme.colors.brand }]}>{props.label}</Text></View>;
}

type TaskReminderRowProps = Readonly<{ title: string; metadata: string; kind: "task" | "reminder"; completed?: boolean; tag?: string; onToggle?: () => void; trailing?: ReactNode }>;
export function TaskReminderRow({ title, metadata, kind, completed = false, tag, onToggle, trailing }: TaskReminderRowProps) {
  const theme = useTrackFlyTheme();
  return (
    <ListRow
      leading={<Pressable accessibilityLabel={completed ? `Mark ${title} incomplete` : `Complete ${title}`} accessibilityRole="checkbox" accessibilityState={{ checked: completed }} hitSlop={8} onPress={onToggle} style={[styles.check, { backgroundColor: completed ? theme.colors.successAnchor : theme.colors.surfaceContainer, borderColor: completed ? theme.colors.successAnchor : theme.colors.outlineSubtle }]}>{completed ? <TrackFlyIcon color="#FFFFFF" name="check" size={14} /> : null}</Pressable>}
      subtitle={`${kind === "reminder" ? "Reminder" : "Task"} · ${metadata}`}
      title={title}
      trailing={<View style={styles.trailingRow}>{tag ? <EntityTag label={tag} /> : null}{trailing}</View>}
    />
  );
}

export function SectionLabel({ children }: PropsWithChildren) {
  const theme = useTrackFlyTheme();
  return <Text style={[theme.typography.monoCaption, styles.sectionLabel, { color: theme.colors.textTertiary }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16 },
  row: { alignItems: "center", borderRadius: 12, flexDirection: "row", gap: 12, minHeight: 54, paddingHorizontal: 12, paddingVertical: 9 },
  rowText: { flex: 1 },
  chip: { alignItems: "center", borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, flexDirection: "row", gap: 4, minHeight: 28, paddingHorizontal: 10 },
  entity: { borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, justifyContent: "center", minHeight: 26, paddingHorizontal: 9 },
  check: { alignItems: "center", borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, height: 22, justifyContent: "center", width: 22 },
  trailingRow: { alignItems: "center", flexDirection: "row", gap: 6 },
  sectionLabel: { marginBottom: 6, marginLeft: 4, textTransform: "uppercase" },
});
