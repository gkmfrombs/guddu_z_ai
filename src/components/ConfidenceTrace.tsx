import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Txt from './Txt';
import { brand } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import type { Trace } from '../ai/mockAnswer';

const color = (c: number) => (c >= 75 ? brand.green : c >= 40 ? brand.orange : brand.pink);
const level = (c: number) => (c >= 75 ? 'High' : c >= 40 ? 'Medium' : 'Low');

function Bar({ value }: { value: number }) {
  const { p } = useTheme();
  return (
    <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: p.line, overflow: 'hidden' }}>
      <View style={{ width: `${Math.max(value, 3)}%`, height: '100%', borderRadius: 3, backgroundColor: color(value) }} />
    </View>
  );
}

export default function ConfidenceTrace({ trace }: { trace: Trace }) {
  const [open, setOpen] = useState(false);
  const { p } = useTheme();
  const small = { fontSize: 13, lineHeight: 18 } as const;
  return (
    <View style={{ marginTop: 8 }}>
      <Pressable onPress={() => setOpen(!open)} accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Txt c={p.mut} style={small}>Confidence {trace.c}% ({level(trace.c)})</Txt>
        <Bar value={trace.c} />
        <Txt c={p.mut} style={small}>{open ? 'Hide' : 'Why?'}</Txt>
      </Pressable>
      {open && (
        <View>
          {trace.signals.map(([name, v]) => (
            <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <Txt c={p.mut} style={[small, { flex: 1 }]}>{name}</Txt>
              <View style={{ width: 70 }}><Bar value={v} /></View>
              <Txt c={p.mut} style={[small, { width: 38, textAlign: 'right' }]}>{v}%</Txt>
            </View>
          ))}
          <Txt f="italic" c={p.mut} style={[small, { marginTop: 8 }]}>{trace.why}</Txt>
        </View>
      )}
    </View>
  );
}
