import { useEffect, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Card from '../components/Card';
import Txt from '../components/Txt';
import GradButton from '../components/GradButton';
import { solveLinear, type Solution } from '../ai/solve';
import { brand, corner, FONT, GRAD } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

type Props = { eq: string; setEq: (s: string) => void; signal: number };

export default function MathsScreen({ eq, setEq, signal }: Props) {
  const { p } = useTheme();
  const [sol, setSol] = useState<Solution | null>(null);
  const solve = (text: string) => setSol(solveLinear(text));

  useEffect(() => { if (signal > 0) solve(eq); }, [signal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 8 }} keyboardShouldPersistTaps="handled">
      <Card>
        <Txt c={p.mut} style={{ fontSize: 14, marginBottom: 6 }}>Type an equation like ax + b = c</Txt>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput
            value={eq}
            onChangeText={setEq}
            autoCapitalize="none"
            style={{ flex: 1, color: p.text, backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, fontFamily: FONT.body, ...corner(4, 14, 4, 14) }}
          />
          <GradButton label="Solve" colors={GRAD.send} onPress={() => solve(eq)} />
        </View>
      </Card>
      <Card>
        {!sol && <Txt c={p.mut} style={{ fontSize: 14 }}>Steps appear here.</Txt>}
        {sol && !sol.ok && <Txt c={p.mut}>{sol.message}</Txt>}
        {sol && sol.ok && (
          <View style={{ gap: 8 }}>
            {sol.lines.map((l) => (
              <Txt key={l.label}><Txt f="semi" c={brand.cyan}>{l.label}: </Txt>{l.text}</Txt>
            ))}
            <Txt f="semi" c={brand.green} style={{ fontSize: 14 }}>{sol.check}</Txt>
          </View>
        )}
      </Card>
    </ScrollView>
  );
}
