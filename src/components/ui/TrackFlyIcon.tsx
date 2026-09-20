import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";

export type TrackFlyIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type TrackFlyIconProps = Readonly<{ name: TrackFlyIconName; color: string; size?: number }>;

export function TrackFlyIcon({ name, color, size = 20 }: TrackFlyIconProps) {
  return <MaterialCommunityIcons color={color} name={name} size={size} />;
}
