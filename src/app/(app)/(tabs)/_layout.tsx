import { Tabs } from "expo-router";

import { BottomDock } from "@/components/navigation/BottomDock";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

export default function TabsShellLayout() {
  const theme = useTrackFlyTheme();
  return (
    <Tabs initialRouteName="today" screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: theme.colors.canvas } }} tabBar={(props) => <BottomDock {...props} />}>
      <Tabs.Screen name="today" options={{ title: "Today" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="assistant" options={{ title: "Assistant" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
    </Tabs>
  );
}
