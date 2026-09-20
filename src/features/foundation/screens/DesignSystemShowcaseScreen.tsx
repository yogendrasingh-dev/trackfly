import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AssistantMessage, ParsedActionCard, QuickCaptureBar } from "@/components/assistant/AssistantPrimitives";
import { BottomSheet, Dialog, SkeletonBlock, StateView } from "@/components/feedback/Feedback";
import { AppHeader } from "@/components/layout/AppHeader";
import { ScreenSurface } from "@/components/layout/ScreenSurface";
import { FeatureRow, PlanCard } from "@/components/subscription/PlanPrimitives";
import { AvatarButton, Button, IconButton } from "@/components/ui/Actions";
import { FormField, GroupedFormSection, TextArea, ToggleRow } from "@/components/ui/Forms";
import { EntityTag, FilterChip, ListRow, SectionLabel, StatusChip, SurfaceCard, TaskReminderRow } from "@/components/ui/Surfaces";
import { TrackFlyIcon } from "@/components/ui/TrackFlyIcon";
import { useMockHarnessController } from "@/features/foundation/hooks/useMockHarnessController";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export function DesignSystemShowcaseScreen() {
  const theme = useTrackFlyTheme(); const harness = useMockHarnessController();
  const [capture, setCapture] = useState("Remind me to call Mom tomorrow"); const [alerts, setAlerts] = useState(true);
  const [sheet, setSheet] = useState(false); const [dialog, setDialog] = useState(false); const [selectedPlan, setSelectedPlan] = useState<"Free" | "Pro">("Free");
  return (
    <ScreenSurface keyboardAware scroll contentStyle={styles.content} header={<AppHeader onBack={() => router.back()} title="Visual system" trailing={<AvatarButton name="Alex Morgan" />} variant="back" />} testID="phase-2-showcase">
      <View style={styles.hero}>
        <View style={styles.heroCopy}><Text style={[theme.typography.monoCaption, { color: theme.colors.brand }]}>AMBIENT CLARITY · {theme.mode.toUpperCase()}</Text><Text style={[theme.typography.headlineLargeMobile, { color: theme.colors.textPrimary }]}>TrackFly shared primitives</Text></View>
        <Button label={`Use ${theme.mode === "light" ? "dark" : "light"}`} onPress={() => harness.selectTheme(theme.mode === "light" ? "dark" : "light")} variant="secondary" />
      </View>

      <Section title="Actions and status">
        <View style={styles.wrap}><Button icon="plus" label="Add reminder" /><Button label="Secondary" variant="secondary" /><Button label="Quiet" variant="quiet" /><Button label="Delete" variant="destructive" /></View>
        <View style={styles.wrap}><IconButton icon="bell-outline" label="Notifications" /><IconButton icon="filter-variant" label="Filter selected" selected /><StatusChip icon="check-circle" label="Ready" tone="success" /><StatusChip label="Offline" tone="attention" /></View>
        <View style={styles.wrap}><FilterChip label="All" onPress={() => undefined} selected /><FilterChip label="Tasks" onPress={() => undefined} /><EntityTag label="@tomorrow 09:00" /></View>
      </Section>

      <Section title="Cards and rows">
        <SurfaceCard tone="elevated" style={styles.stack}><TaskReminderRow kind="reminder" metadata="Weekdays · 11:00 AM" tag="#health" title="Eye break" /><TaskReminderRow completed kind="task" metadata="Completed 9:15 AM" title="Review quarterly notes" /></SurfaceCard>
        <GroupedFormSection label="Preferences"><ListRow leading={<TrackFlyIcon color={theme.colors.brand} name="theme-light-dark" />} title="Appearance" trailing={<Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>System</Text>} /><ToggleRow description="Alerts for scheduled reminders" icon="bell-outline" label="Notifications" onValueChange={setAlerts} value={alerts} /></GroupedFormSection>
      </Section>

      <Section title="Forms and keyboard growth">
        <FormField autoCapitalize="sentences" label="Title" leadingIcon="format-title" placeholder="What should TrackFly remember?" value="Prepare the quarterly presentation with the extended regional team" />
        <TextArea hint="Long notes grow without hiding the primary action." label="Notes" placeholder="Add details" />
      </Section>

      <Section title="Assistant capture and review">
        <AssistantMessage footer="Captured via typed input" sender="user">Remind me every weekday at 11 AM to take an eye break.</AssistantMessage>
        <AssistantMessage sender="assistant">I understood this as a recurring reminder. Review it before creating.</AssistantMessage>
        <ParsedActionCard kind="Reminder" schedule="Weekdays · 11:00 AM · 5 minutes" title="Eye Break" />
        <QuickCaptureBar onChangeText={setCapture} onSend={() => undefined} value={capture} />
      </Section>

      <Section title="State and loading views">
        <SurfaceCard><StateView actionLabel="Add reminder" description="Nothing else needs your attention today." title="You're all caught up." tone="empty" /></SurfaceCard>
        <SurfaceCard style={styles.stack}><SkeletonBlock height={18} width="44%" /><SkeletonBlock height={54} radius={12} /><SkeletonBlock height={54} radius={12} /><SkeletonBlock height={14} width="68%" /></SurfaceCard>
      </Section>

      <Section title="Subscription presentation">
        <SurfaceCard style={styles.stack} tone="assistant"><FeatureRow description="Capture naturally, then review a structured result." icon="creation" title="Assistant capture" /><FeatureRow description="Clear status for every proposed action." icon="check-decagram-outline" title="Review before creation" /></SurfaceCard>
        <View style={styles.planGrid}><PlanCard description="Core tasks and reminders" name="Free" onSelect={() => setSelectedPlan("Free")} selected={selectedPlan === "Free"} /><PlanCard badge="PROVISIONAL" description="Presentation fixture only" name="Pro" onSelect={() => setSelectedPlan("Pro")} selected={selectedPlan === "Pro"} /></View>
      </Section>

      <Section title="Overlays">
        <View style={styles.wrap}><Button label="Open bottom sheet" onPress={() => setSheet(true)} /><Button label="Open dialog" onPress={() => setDialog(true)} variant="secondary" /></View>
      </Section>

      <BottomSheet onDismiss={() => setSheet(false)} visible={sheet}><StateView actionLabel="Enable microphone" description="Voice capture is simulated in this UI phase. Typed capture always remains available." onAction={() => setSheet(false)} onSecondaryAction={() => setSheet(false)} secondaryActionLabel="Not now" title="Speak naturally" tone="permission" /></BottomSheet>
      <Dialog onDismiss={() => setDialog(false)} visible={dialog}><StateView actionLabel="Try again" description="Your draft is preserved. You can retry or continue manually." onAction={() => setDialog(false)} onSecondaryAction={() => setDialog(false)} secondaryActionLabel="Continue manually" title="Couldn't process that" tone="error" /></Dialog>
    </ScreenSurface>
  );
}

function Section({ title, children }: React.PropsWithChildren<Readonly<{ title: string }>>) {
  const theme = useTrackFlyTheme();
  return <View style={styles.section}><SectionLabel>{title}</SectionLabel><View style={styles.stack}>{children}</View><View style={[styles.divider, { backgroundColor: theme.colors.outlineSubtle }]} /></View>;
}

const styles = StyleSheet.create({
  content: { gap: 24, paddingBottom: 44 }, hero: { alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }, heroCopy: { flex: 1, minWidth: 220 },
  section: { gap: 14 }, stack: { gap: 10 }, wrap: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 8 }, divider: { height: StyleSheet.hairlineWidth, marginTop: 6 }, planGrid: { gap: 10 },
});
