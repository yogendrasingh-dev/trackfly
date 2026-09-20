import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TrackFlyIcon, type TrackFlyIconName } from "@/components/ui/TrackFlyIcon";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

const iconByRoute: Record<string, TrackFlyIconName> = { today: "calendar-today", tasks: "checkbox-marked-outline", assistant: "creation", history: "history" };

type BottomDockProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0];

export function BottomDock({ state, descriptors, navigation }: BottomDockProps) {
  const theme = useTrackFlyTheme(); const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.outer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={[styles.dock, theme.elevation.floating, { borderColor: theme.colors.outlineSubtle, backgroundColor: theme.colors.surfaceOverlay }]}>
        <BlurView intensity={theme.mode === "dark" ? 32 : 50} style={StyleSheet.absoluteFill} tint={theme.mode === "dark" ? "dark" : "light"} />
        {state.routes.map((route, index) => {
          const focused = state.index === index; const assistant = route.name === "assistant";
          const label = typeof descriptors[route.key].options.title === "string" ? descriptors[route.key].options.title : route.name;
          const onPress = () => { const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true }); if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params); };
          return (
            <Pressable accessibilityLabel={`${label} tab`} accessibilityRole="tab" accessibilityState={{ selected: focused }} key={route.key} onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })} onPress={onPress} style={({ pressed }) => [styles.tab, { opacity: pressed ? 0.68 : 1 }]}>
              <View style={[styles.icon, assistant && styles.assistantIcon, assistant && { backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.assistantBorder }, focused && !assistant && { backgroundColor: theme.colors.assistantTint }]}>
                <TrackFlyIcon color={assistant ? theme.colors.onBrand : focused ? theme.colors.brand : theme.colors.textSecondary} name={iconByRoute[route.name] ?? "circle-outline"} size={assistant ? 22 : 20} />
              </View>
              <Text numberOfLines={1} style={[theme.typography.labelSmall, styles.label, { color: focused ? theme.colors.brand : theme.colors.textSecondary }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { backgroundColor: "transparent", paddingHorizontal: 12, paddingTop: 4 }, dock: { borderRadius: 24, borderWidth: StyleSheet.hairlineWidth, flexDirection: "row", minHeight: 66, overflow: "hidden", paddingHorizontal: 4 },
  tab: { alignItems: "center", flex: 1, justifyContent: "center", minHeight: 60, minWidth: 64, paddingHorizontal: 2, paddingVertical: 5 }, icon: { alignItems: "center", borderRadius: 999, height: 30, justifyContent: "center", width: 38 },
  assistantIcon: { borderWidth: StyleSheet.hairlineWidth, height: 40, marginTop: -8, width: 48 }, label: { fontSize: 10, lineHeight: 13, marginTop: 1 },
});
