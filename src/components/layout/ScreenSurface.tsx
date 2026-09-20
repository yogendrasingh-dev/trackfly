import type { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type ScreenSurfaceProps = PropsWithChildren<Readonly<{
  scroll?: boolean;
  keyboardAware?: boolean;
  docked?: boolean;
  header?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}>>;

export function ScreenSurface({ children, scroll = false, keyboardAware = false, docked = false, header, contentStyle, testID }: ScreenSurfaceProps) {
  const theme = useTrackFlyTheme();
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, docked && { paddingBottom: theme.spacing.lg }, contentStyle]}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : <View style={[styles.staticContent, contentStyle]}>{children}</View>;

  const body = keyboardAware ? (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>{content}</KeyboardAvoidingView>
  ) : content;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[styles.safeArea, { backgroundColor: theme.colors.canvas }]} testID={testID}>
      {header}
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  staticContent: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 8 },
});
