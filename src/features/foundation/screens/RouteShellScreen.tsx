import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/brand/BrandMark";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type RouteShellScreenProps = Readonly<{
  title: string;
  description: string;
}>;

export function RouteShellScreen({ title, description }: RouteShellScreenProps) {
  const theme = useTrackFlyTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.canvas }]}>
      <View style={styles.content}>
        <BrandMark />
        <Text style={[styles.eyebrow, { color: theme.colors.brand }]}>ROUTE SHELL</Text>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{description}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/dev/scenarios")}
          style={({ pressed }) => [styles.button, { backgroundColor: theme.colors.brand, opacity: pressed ? 0.72 : 1 }]}
        >
          <Text style={[styles.buttonLabel, { color: theme.colors.onBrand }]}>Back to scenarios</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { alignItems: "center", flex: 1, gap: 12, justifyContent: "center", padding: 20 },
  eyebrow: { fontSize: 11, fontWeight: "700", letterSpacing: 1.1 },
  title: { fontSize: 28, fontWeight: "600", lineHeight: 34, textAlign: "center" },
  body: { fontSize: 15, lineHeight: 23, maxWidth: 520, textAlign: "center" },
  button: { alignItems: "center", alignSelf: "stretch", borderRadius: 12, justifyContent: "center", marginTop: 8, minHeight: 48, paddingHorizontal: 16 },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
});
