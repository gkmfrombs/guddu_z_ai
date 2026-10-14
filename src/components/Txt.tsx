import { Text, type StyleProp, type TextStyle } from 'react-native';
import { FONT } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

type Props = { children?: React.ReactNode; f?: keyof typeof FONT; c?: string; style?: StyleProp<TextStyle> };

export default function Txt({ children, f = 'body', c, style }: Props) {
  const { p } = useTheme();
  return <Text style={[{ fontFamily: FONT[f], color: c ?? p.text, fontSize: 16, lineHeight: 23 }, style]}>{children}</Text>;
}
