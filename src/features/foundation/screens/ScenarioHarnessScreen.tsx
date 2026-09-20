import { router, type Href } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/brand/BrandMark";
import { useMockHarnessController } from "@/features/foundation/hooks/useMockHarnessController";
import type { MockScenario } from "@/mocks/scenarios/registry";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

const shellDestinations: readonly { label: string; href: Href }[] = [
  { label: "Onboarding shell", href: "/welcome" },
  { label: "Auth shell", href: "/account" },
  { label: "Tabs shell", href: "/today" },
  { label: "Supporting shell", href: "/supporting-shell" },
];

export function ScenarioHarnessScreen() {
  const harness = useMockHarnessController();
  const theme = useTrackFlyTheme();

  const openScenario = (scenario: MockScenario) => {
    harness.selectScenario(scenario.id);
    router.push({
      pathname: "/scenario-preview",
      params: { scenarioId: scenario.id },
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.canvas }]}>
      <FlatList
        contentContainerStyle={styles.content}
        data={harness.scenarios}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.brandRow}>
              <BrandMark />
              <View style={styles.titleBlock}>
                <Text style={[styles.eyebrow, { color: theme.colors.brand }]}>PHASE 1</Text>
                <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Mock scenario harness</Text>
              </View>
            </View>

            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
              Fixed time: {harness.currentTimeIso}. Selection is intentionally in-memory and resets to the guest/light defaults after a full reload.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Theme</Text>
            <View style={styles.choiceRow}>
              {(["light", "dark"] as const).map((value) => (
                <ChoiceButton
                  key={value}
                  label={value}
                  selected={harness.theme === value}
                  onPress={() => harness.selectTheme(value)}
                />
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Session</Text>
            <View style={styles.choiceRow}>
              {(["guest", "authenticated"] as const).map((value) => (
                <ChoiceButton
                  key={value}
                  label={value}
                  selected={harness.session === value}
                  onPress={() => harness.selectSession(value)}
                />
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Route shells</Text>
            <View style={styles.shellGrid}>
              {shellDestinations.map((destination) => (
                <Pressable
                  accessibilityRole="button"
                  key={destination.label}
                  onPress={() => router.push(destination.href)}
                  style={({ pressed }) => [
                    styles.shellButton,
                    {
                      backgroundColor: theme.colors.surfaceLow,
                      borderColor: theme.colors.outlineSubtle,
                      opacity: pressed ? 0.72 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.shellLabel, { color: theme.colors.textPrimary }]}>{destination.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Scenario registry</Text>
            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
              Phase 1 entries are runnable. Later entries are addressable placeholders only; their UI remains unimplemented until its tracked phase.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const selected = item.id === harness.selectedScenarioId;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => openScenario(item)}
              style={({ pressed }) => [
                styles.scenarioRow,
                {
                  backgroundColor: selected ? theme.colors.surfaceHigh : theme.colors.surface,
                  borderColor: selected ? theme.colors.brand : theme.colors.outlineSubtle,
                  opacity: pressed ? 0.72 : 1,
                },
              ]}
            >
              <View style={styles.scenarioText}>
                <Text style={[styles.scenarioTitle, { color: theme.colors.textPrimary }]}>{item.title}</Text>
                <Text style={[styles.scenarioDescription, { color: theme.colors.textSecondary }]}>{item.description}</Text>
                <Text style={[styles.scenarioMeta, { color: theme.colors.textSecondary }]}>{item.id} · {item.phase}</Text>
              </View>
              <Text style={[styles.availability, { color: item.availability === "available" ? theme.colors.success : theme.colors.attention }]}>
                {item.availability === "available" ? "READY" : "PLANNED"}
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

type ChoiceButtonProps = Readonly<{
  label: string;
  selected: boolean;
  onPress: () => void;
}>;

function ChoiceButton({ label, selected, onPress }: ChoiceButtonProps) {
  const theme = useTrackFlyTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceButton,
        {
          backgroundColor: selected ? theme.colors.brand : theme.colors.surfaceLow,
          opacity: pressed ? 0.72 : 1,
        },
      ]}
    >
      <Text style={[styles.choiceLabel, { color: selected ? theme.colors.onBrand : theme.colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  headerContent: { gap: 12, marginBottom: 20 },
  brandRow: { alignItems: "center", flexDirection: "row", gap: 12 },
  titleBlock: { flex: 1 },
  eyebrow: { fontSize: 11, fontWeight: "700", letterSpacing: 1.1 },
  title: { fontSize: 28, fontWeight: "600", lineHeight: 34 },
  body: { fontSize: 15, lineHeight: 23 },
  sectionTitle: { fontSize: 17, fontWeight: "600", marginTop: 8 },
  choiceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choiceButton: { borderRadius: 999, minHeight: 44, justifyContent: "center", paddingHorizontal: 16 },
  choiceLabel: { fontSize: 14, fontWeight: "600", textTransform: "capitalize" },
  shellGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  shellButton: { borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, justifyContent: "center", minHeight: 44, paddingHorizontal: 12 },
  shellLabel: { fontSize: 13, fontWeight: "600" },
  separator: { height: 8 },
  scenarioRow: { alignItems: "flex-start", borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, flexDirection: "row", gap: 12, minHeight: 76, padding: 14 },
  scenarioText: { flex: 1, gap: 3 },
  scenarioTitle: { fontSize: 15, fontWeight: "600", lineHeight: 20 },
  scenarioDescription: { fontSize: 13, lineHeight: 18 },
  scenarioMeta: { fontSize: 11, lineHeight: 16 },
  availability: { fontSize: 10, fontWeight: "700", letterSpacing: 0.7, paddingTop: 2 },
});
