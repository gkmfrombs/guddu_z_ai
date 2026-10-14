import { View, type StyleProp, type ViewStyle } from 'react-native';
import { corner } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function Card({ children, style }: { children?: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { p } = useTheme();
  return (
    <View style={[{ backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, padding: 14, ...corner(6, 22, 6, 22) }, style]}>
      {children}
    </View>
  );
}
