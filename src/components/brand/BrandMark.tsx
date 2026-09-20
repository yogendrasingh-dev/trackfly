import { Image, type ImageStyle, type StyleProp } from "react-native";

const brandMarkSource = require("../../assets/brand/trackfly-brand-mark.png");

type BrandMarkProps = Readonly<{
  size?: number;
  style?: StyleProp<ImageStyle>;
}>;

export function BrandMark({ size = 56, style }: BrandMarkProps) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel="TrackFly"
      resizeMode="contain"
      source={brandMarkSource}
      style={[{ height: size, width: size }, style]}
    />
  );
}
