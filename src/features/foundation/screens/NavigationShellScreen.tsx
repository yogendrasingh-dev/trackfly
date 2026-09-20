import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { QuickCaptureBar } from "@/components/assistant/AssistantPrimitives";
import { AppHeader } from "@/components/layout/AppHeader";
import { ScreenSurface } from "@/components/layout/ScreenSurface";
import { AvatarButton, Button } from "@/components/ui/Actions";
import { StatusChip, SurfaceCard, TaskReminderRow } from "@/components/ui/Surfaces";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export function NavigationShellScreen({ destination }: Readonly<{ destination: "Today" | "Tasks" | "Assistant" | "History" }>) {
  const theme = useTrackFlyTheme(); const [capture, setCapture] = useState(""); const assistant = destination === "Assistant";
  return (
    <ScreenSurface docked keyboardAware={assistant} scroll header={<AppHeader title={destination} trailing={<AvatarButton name="Alex Morgan" />} variant={assistant ? "assistant" : "branded"} />} contentStyle={styles.content} testID={`phase-2-${destination.toLowerCase()}`}>
      <View style={styles.intro}><Text style={[theme.typography.monoCaption, { color: theme.colors.textTertiary }]}>PHASE 2 NAVIGATION SHELL</Text><Text style={[theme.typography.headlineLargeMobile, { color: theme.colors.textPrimary }]}>{destination}</Text><Text style={[theme.typography.bodyMedium, { color: theme.colors.textSecondary }]}>This destination shell validates shared navigation, surfaces, typography, and adaptive spacing. Product screens begin in their tracked phases.</Text></View>
      <SurfaceCard tone={assistant ? "assistant" : "elevated"} style={styles.card}>
        <View style={styles.cardTop}><Text style={[theme.typography.headlineSmall, { color: theme.colors.textPrimary }]}>Reusable shell</Text><StatusChip label="UI foundation" tone="primary" /></View>
        <TaskReminderRow kind={destination === "Tasks" ? "task" : "reminder"} metadata="11:00 AM" tag="#sample" title="A long sample item that demonstrates natural wrapping on compact phones" />
        <Button label="Open component showcase" onPress={() => router.push("../dev/design-system")} variant="secondary" />
      </SurfaceCard>
      {assistant ? <QuickCaptureBar onChangeText={setCapture} value={capture} /> : null}
    </ScreenSurface>
  );
}

const styles = StyleSheet.create({ content: { gap: 20, paddingBottom: 24 }, intro: { gap: 6 }, card: { gap: 12 }, cardTop: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between" } });
