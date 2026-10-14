import { Pressable } from 'react-native';
import Txt from './Txt';
import { corner, brand } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function Chip({ label, onPress, on, flex }: { label: string; onPress?: () => void; on?: boolean; flex?: boolean }) {
  const { p } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[
        { borderWidth: 1, borderColor: on ? brand.violet : p.line, backgroundColor: on ? 'rgba(139,92,246,0.35)' : p.glass, paddingVertical: 7, paddingHorizontal: 12, alignItems: 'center', ...corner(4, 12, 4, 12) },
        flex ? { flex: 1 } : null,
      ]}
    >
      <Txt f="semi" style={{ fontSize: 14, lineHeight: 19 }}>{label}</Txt>
    </Pressable>
  );
}
