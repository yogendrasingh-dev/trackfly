import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/brand/BrandMark";
import { useMockHarnessController } from "@/features/foundation/hooks/useMockHarnessController";
import {
  DEFAULT_MOCK_SCENARIO_ID,
  getMockScenario,
  isMockScenarioId,
} from "@/mocks/scenarios/registry";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export function ScenarioPreviewScreen() {
  const params = useLocalSearchParams<{ scenarioId?: string | string[] }>();
  const harness = useMockHarnessController();
  const theme = useTrackFlyTheme();
  const rawScenarioId = Array.isArray(params.scenarioId) ? params.scenarioId[0] : params.scenarioId;
  const scenarioId = rawScenarioId && isMockScenarioId(rawScenarioId)
    ? rawScenarioId
    : harness.selectedScenarioId ?? DEFAULT_MOCK_SCENARIO_ID;
  const scenario = getMockScenario(scenarioId);
  const selectHarnessScenario = harness.selectScenario;

  useEffect(() => {
    selectHarnessScenario(scenarioId);
  }, [scenarioId, selectHarnessScenario]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.canvas }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <BrandMark size={88} />
        <Text style={[styles.eyebrow, { color: theme.colors.brand }]}>{scenario.phase.toUpperCase()}</Text>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{scenario.title}</Text>
        <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{scenario.description}</Text>

        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineSubtle }]}>
          <MetadataRow label="Scenario ID" value={scenario.id} />
          <MetadataRow label="Availability" value={scenario.availability} />
          <MetadataRow label="Mock time" value={harness.currentTimeIso} />
          {scenario.stitchId ? <MetadataRow label="Stitch ID" value={scenario.stitchId} /> : null}
        </View>

        <Text style={[styles.notice, { color: scenario.availability === "available" ? theme.colors.success : theme.colors.attention }]}>
          {scenario.availability === "available"
            ? "This Phase 1 scenario is available."
            : "The harness entry is ready; this screen remains intentionally unimplemented until its tracked phase."}
        </Text>

        <View style={styles.actions}>
          <ActionButton
            label={`Use ${harness.theme === "light" ? "dark" : "light"} theme`}
            onPress={() => harness.selectTheme(harness.theme === "light" ? "dark" : "light")}
          />
          <ActionButton label="Back to scenarios" onPress={() => router.replace("/dev/scenarios")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetadataRow({ label, value }: Readonly<{ label: string; value: string }>) {
  const theme = useTrackFlyTheme();

  return (
    <View style={styles.metadataRow}>
      <Text style={[styles.metadataLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
      <Text selectable style={[styles.metadataValue, { color: theme.colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

function ActionButton({ label, onPress }: Readonly<{ label: string; onPress: () => void }>) {
  const theme = useTrackFlyTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor: theme.colors.brand, opacity: pressed ? 0.72 : 1 }]}
    >
      <Text style={[styles.buttonLabel, { color: theme.colors.onBrand }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { alignItems: "center", gap: 12, padding: 20, paddingBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: "700", letterSpacing: 1.1, marginTop: 8 },
  title: { fontSize: 28, fontWeight: "600", lineHeight: 34, textAlign: "center" },
  body: { fontSize: 15, lineHeight: 23, maxWidth: 520, textAlign: "center" },
  card: { alignSelf: "stretch", borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, gap: 12, marginTop: 8, padding: 16 },
  metadataRow: { gap: 2 },
  metadataLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 0.7, textTransform: "uppercase" },
  metadataValue: { fontSize: 14, lineHeight: 20 },
  notice: { fontSize: 14, fontWeight: "600", lineHeight: 20, textAlign: "center" },
  actions: { alignSelf: "stretch", gap: 8, marginTop: 8 },
  button: { alignItems: "center", borderRadius: 12, justifyContent: "center", minHeight: 48, paddingHorizontal: 16 },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
});
