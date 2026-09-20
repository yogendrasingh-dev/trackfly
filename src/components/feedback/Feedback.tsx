import type { ReactNode } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Actions";
import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type OverlayProps = Readonly<{ visible: boolean; onDismiss: () => void; children: ReactNode; dismissLabel?: string }>;

export function BottomSheet({ visible, onDismiss, children, dismissLabel = "Close sheet" }: OverlayProps) {
  const theme = useTrackFlyTheme(); const insets = useSafeAreaInsets();
  return (
    <Modal animationType="slide" onRequestClose={onDismiss} transparent visible={visible}>
      <View style={[styles.scrim, { backgroundColor: theme.colors.scrim }]}>
        <Pressable accessibilityLabel={dismissLabel} accessibilityRole="button" onPress={onDismiss} style={StyleSheet.absoluteFill} />
        <View accessibilityViewIsModal style={[styles.sheet, theme.elevation.overlay, { backgroundColor: theme.colors.surfaceOverlay, borderColor: theme.colors.outlineSubtle, paddingBottom: Math.max(insets.bottom, 20) }]}>
          <View style={[styles.grabber, { backgroundColor: theme.colors.outline }]} />
          <ScrollView contentContainerStyle={styles.sheetContent} showsVerticalScrollIndicator={false}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export function Dialog({ visible, onDismiss, children }: OverlayProps) {
  const theme = useTrackFlyTheme();
  return (
    <Modal animationType="fade" onRequestClose={onDismiss} transparent visible={visible}>
      <View style={[styles.dialogScrim, { backgroundColor: theme.colors.scrim }]}>
        <View accessibilityViewIsModal style={[styles.dialog, theme.elevation.overlay, { backgroundColor: theme.colors.surfaceOverlay, borderColor: theme.colors.outlineSubtle }]}>{children}</View>
      </View>
    </Modal>
  );
}

type StateTone = "empty" | "permission" | "offline" | "error" | "success" | "limit";
type StateViewProps = Readonly<{ tone: StateTone; title: string; description: string; actionLabel?: string; onAction?: () => void; secondaryActionLabel?: string; onSecondaryAction?: () => void }>;
export function StateView({ tone, title, description, actionLabel, onAction, secondaryActionLabel, onSecondaryAction }: StateViewProps) {
  const theme = useTrackFlyTheme();
  const mapping: Record<StateTone, { icon: TrackFlyIconName; color: string; background: string }> = {
    empty: { icon: "check", color: theme.colors.brand, background: theme.colors.assistantTint }, permission: { icon: "microphone-outline", color: theme.colors.brand, background: theme.colors.assistantTint },
    offline: { icon: "cloud-off-outline", color: theme.colors.attention, background: theme.colors.attentionContainer }, error: { icon: "alert-circle-outline", color: theme.colors.error, background: theme.colors.errorContainer },
    success: { icon: "check", color: theme.colors.success, background: theme.mode === "dark" ? "rgba(78,222,163,0.12)" : "#DDFBEF" }, limit: { icon: "clock-outline", color: theme.colors.attention, background: theme.colors.attentionContainer },
  };
  const meta = mapping[tone];
  return (
    <View style={styles.state}>
      <View style={[styles.stateIcon, { backgroundColor: meta.background }]}><TrackFlyIcon color={meta.color} name={meta.icon} size={34} /></View>
      <Text style={[theme.typography.headlineSmall, { color: theme.colors.textPrimary, textAlign: "center" }]}>{title}</Text>
      <Text style={[theme.typography.bodyMedium, { color: theme.colors.textSecondary, textAlign: "center" }]}>{description}</Text>
      {actionLabel ? <Button fullWidth label={actionLabel} onPress={onAction} /> : null}
      {secondaryActionLabel ? <Button fullWidth label={secondaryActionLabel} onPress={onSecondaryAction} variant="quiet" /> : null}
    </View>
  );
}

export function SkeletonBlock({ width = "100%", height = 16, radius = 8 }: Readonly<{ width?: number | `${number}%`; height?: number; radius?: number }>) {
  const theme = useTrackFlyTheme();
  return <View accessibilityLabel="Loading" style={{ backgroundColor: theme.colors.surfaceHigh, borderRadius: radius, height, width }} />;
}

const styles = StyleSheet.create({
  scrim: { flex: 1, justifyContent: "flex-end" },
  sheet: { borderColor: "transparent", borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: StyleSheet.hairlineWidth, maxHeight: "88%", paddingTop: 10 },
  grabber: { alignSelf: "center", borderRadius: 999, height: 4, opacity: 0.45, width: 38 },
  sheetContent: { gap: 12, paddingHorizontal: 20, paddingTop: 16 },
  dialogScrim: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
  dialog: { borderRadius: 24, borderWidth: StyleSheet.hairlineWidth, gap: 12, maxWidth: 420, padding: 20, width: "100%" },
  state: { alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 24 },
  stateIcon: { alignItems: "center", borderRadius: 999, height: 76, justifyContent: "center", width: 76 },
});
