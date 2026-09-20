import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export default function NotFoundRoute() {
  const theme = useTrackFlyTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>This route is not available.</Text>
        <Link href="/dev/scenarios" style={[styles.link, { color: theme.colors.brand }]}>Open the Phase 1 scenario harness</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, gap: 16, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "600", textAlign: "center" },
  link: { fontSize: 15, fontWeight: "600", minHeight: 44, paddingVertical: 12, textAlign: "center" },
});
