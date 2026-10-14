import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

export default function Placeholder({ title, note }: { title: string; note: string }) {
  return (
    <View style={s.box}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.note}>{note}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '700', fontFamily: 'serif' },
  note: { color: theme.colors.muted, fontSize: 16, textAlign: 'center' },
});
