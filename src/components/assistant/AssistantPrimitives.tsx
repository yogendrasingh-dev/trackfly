import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Button, IconButton } from "@/components/ui/Actions";
import { EntityTag, StatusChip, SurfaceCard } from "@/components/ui/Surfaces";
import { TrackFlyIcon } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type QuickCaptureBarProps = Readonly<{
  value: string; onChangeText: (value: string) => void; onSend?: () => void; onMicrophone?: () => void;
  disabled?: boolean; offline?: boolean; placeholder?: string;
}>;
export function QuickCaptureBar({ value, onChangeText, onSend, onMicrophone, disabled = false, offline = false, placeholder = "Remind me to…" }: QuickCaptureBarProps) {
  const theme = useTrackFlyTheme();
  return (
    <View style={[styles.capture, theme.elevation.floating, { backgroundColor: theme.colors.surfaceOverlay, borderColor: offline ? theme.colors.attentionAnchor : theme.colors.outlineSubtle }]}>
      <IconButton disabled={disabled} icon="microphone-outline" label="Use voice capture" onPress={onMicrophone} size="small" />
      <TextInput accessibilityLabel="Quick capture" editable={!disabled} onChangeText={onChangeText} placeholder={offline ? "Save a note for later…" : placeholder} placeholderTextColor={theme.colors.textTertiary} style={[styles.captureInput, theme.typography.bodyMedium, { color: theme.colors.textPrimary }]} value={value} />
      <Pressable accessibilityLabel="Send" accessibilityRole="button" accessibilityState={{ disabled: disabled || value.trim().length === 0 }} disabled={disabled || value.trim().length === 0} onPress={onSend} style={[styles.send, { backgroundColor: value.trim() ? theme.colors.primaryContainer : theme.colors.surfaceHighest }]}>
        <TrackFlyIcon color={value.trim() ? theme.colors.onBrand : theme.colors.textTertiary} name="arrow-up" size={19} />
      </Pressable>
    </View>
  );
}

export function AssistantMessage({ children, sender, footer }: Readonly<{ children: ReactNode; sender: "user" | "assistant"; footer?: string }>) {
  const theme = useTrackFlyTheme();
  const user = sender === "user";
  return (
    <View style={[styles.messageWrap, user && styles.messageUserAlign]}>
      <View style={[styles.message, { backgroundColor: user ? theme.colors.primaryContainer : theme.colors.surfaceCard, borderColor: user ? theme.colors.primaryContainer : theme.colors.outlineSubtle }]}>
        {!user ? <View style={styles.assistantIdentity}><TrackFlyIcon color={theme.colors.brand} name="creation" size={16} /><Text style={[theme.typography.monoCaption, { color: theme.colors.brand }]}>TRACKFLY</Text></View> : null}
        <Text style={[theme.typography.bodyMedium, { color: user ? theme.colors.onBrand : theme.colors.textPrimary }]}>{children}</Text>
      </View>
      {footer ? <Text style={[theme.typography.monoCaption, { color: theme.colors.textTertiary }]}>{footer}</Text> : null}
    </View>
  );
}

type ParsedActionCardProps = Readonly<{ title: string; schedule: string; kind: "Task" | "Reminder"; onConfirm?: () => void; onEdit?: () => void }>;
export function ParsedActionCard({ title, schedule, kind, onConfirm, onEdit }: ParsedActionCardProps) {
  const theme = useTrackFlyTheme();
  return (
    <SurfaceCard tone="assistant" style={styles.parsedCard}>
      <View style={styles.cardTop}><EntityTag label={kind === "Reminder" ? "Recurring Routine" : "Task"} /><StatusChip label="Ready to confirm" tone="success" /></View>
      <Text style={[theme.typography.headlineSmall, { color: theme.colors.textPrimary }]}>{title}</Text>
      <Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{schedule}</Text>
      <View style={styles.actions}><Button fullWidth label={`Create ${kind}`} onPress={onConfirm} /><Button fullWidth label="Edit details" onPress={onEdit} variant="secondary" /></View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  capture: { alignItems: "center", borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, flexDirection: "row", gap: 6, minHeight: 58, padding: 6 },
  captureInput: { flex: 1, minHeight: 44, paddingHorizontal: 6 },
  send: { alignItems: "center", borderRadius: 999, height: 42, justifyContent: "center", width: 42 },
  messageWrap: { alignItems: "flex-start", gap: 4 },
  messageUserAlign: { alignItems: "flex-end" },
  message: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, gap: 7, maxWidth: "88%", paddingHorizontal: 14, paddingVertical: 11 },
  assistantIdentity: { alignItems: "center", flexDirection: "row", gap: 4 },
  parsedCard: { gap: 9 },
  cardTop: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "space-between" },
  actions: { gap: 8, marginTop: 4 },
});
