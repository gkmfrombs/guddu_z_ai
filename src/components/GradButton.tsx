import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Txt from './Txt';
import { corner } from '../theme/theme';

type Props = { label: string; onPress: () => void; colors: readonly [string, string, ...string[]]; disabled?: boolean; style?: StyleProp<ViewStyle> };

export default function GradButton({ label, onPress, colors, disabled, style }: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" style={[{ opacity: disabled ? 0.5 : 1 }, style]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 18, paddingVertical: 11, alignItems: 'center', justifyContent: 'center', ...corner(4, 14, 4, 14) }}
      >
        <Txt f="semi" c="#fff">{label}</Txt>
      </LinearGradient>
    </Pressable>
  );
}
