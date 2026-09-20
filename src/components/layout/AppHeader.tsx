import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BrandMark } from "@/components/brand/BrandMark";
import { IconButton } from "@/components/ui/Actions";
import { useTrackFlyTheme } from "@/theme/ThemeProvider";

type CommonProps = Readonly<{ trailing?: ReactNode; subtitle?: string }>;
type AppHeaderProps = CommonProps & (
  | Readonly<{ variant: "branded"; title: string; onBack?: never }>
  | Readonly<{ variant: "back"; title: string; onBack: () => void }>
  | Readonly<{ variant: "assistant"; title?: string; onBack?: never }>
);

export function AppHeader({ variant, title, subtitle, trailing, onBack }: AppHeaderProps) {
  const theme = useTrackFlyTheme();
  return (
    <View style={[styles.header, { borderBottomColor: theme.colors.outlineSubtle }]}>
      {variant === "back" ? <IconButton icon="chevron-left" label="Go back" onPress={onBack} size="small" /> : <BrandMark size={36} />}
      <View style={styles.titleBlock}>
        {variant === "assistant" ? <Text style={[theme.typography.monoCaption, { color: theme.colors.brand }]}>TRACKFLY</Text> : null}
        <Text numberOfLines={2} style={[variant === "assistant" ? theme.typography.headlineSmall : theme.typography.headlineSmall, { color: theme.colors.textEmphasized }]}>{title ?? "Assistant"}</Text>
        {subtitle ? <Text style={[theme.typography.bodySmall, { color: theme.colors.textSecondary }]}>{subtitle}</Text> : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: "row", gap: 10, minHeight: 58, paddingHorizontal: 16, paddingVertical: 7 },
  titleBlock: { flex: 1 },
  trailing: { alignItems: "flex-end" },
});
