import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Actions";
import { StatusChip, SurfaceCard } from "@/components/ui/Surfaces";
import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export function FeatureRow({ icon, title, description }: Readonly<{ icon: TrackFlyIconName; title: string; description: string }>) {
  const theme = useTrackFlyTheme();
  return <View style={styles.feature}><View style={[styles.featureIcon, { backgroundColor: theme.colors.assistantTint }]}><TrackFlyIcon color={theme.colors.brand} name={icon} /></View><View style={styles.featureText}><Text style={[theme.typography.labelMedium, { color: theme.colors.textPrimary }]}>{title}</Text><Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{description}</Text></View></View>;
}

export function PlanCard({ name, description, selected, badge, onSelect }: Readonly<{ name: string; description: string; selected: boolean; badge?: string; onSelect?: () => void }>) {
  const theme = useTrackFlyTheme();
  return (
    <SurfaceCard tone={selected ? "highlighted" : "default"} style={styles.plan}>
      <View style={styles.planTop}><Text style={[theme.typography.labelMedium, { color: theme.colors.textPrimary }]}>{name}</Text>{badge ? <StatusChip label={badge} tone="primary" /> : null}</View>
      <Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{description}</Text>
      <Button fullWidth label={selected ? "Selected" : `Choose ${name}`} onPress={onSelect} variant={selected ? "primary" : "secondary"} />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  feature: { alignItems: "flex-start", flexDirection: "row", gap: 12, paddingVertical: 8 }, featureIcon: { alignItems: "center", borderRadius: 10, height: 36, justifyContent: "center", width: 36 }, featureText: { flex: 1 },
  plan: { gap: 10 }, planTop: { alignItems: "center", flexDirection: "row", gap: 8, justifyContent: "space-between" },
});
