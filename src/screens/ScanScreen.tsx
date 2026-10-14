import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Card from '../components/Card';
import Txt from '../components/Txt';
import Chip from '../components/Chip';
import GradButton from '../components/GradButton';
import { corner, FONT, GRAD } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function ScanScreen({ onSendToMaths }: { onSendToMaths: (t: string) => void }) {
  const { p } = useTheme();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  // Simulated scan. Real camera + offline OCR arrives in the AI build (Weeks 16-17).
  const scan = () => {
    setBusy(true);
    setTimeout(() => { setText('3x - 5 = 16'); setBusy(false); }, 700);
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 10 }} keyboardShouldPersistTaps="handled">
      <Card>
        <Txt c={p.mut} style={{ fontSize: 14, marginBottom: 8 }}>Camera photo (simulated)</Txt>
        <View style={{ paddingVertical: 14 }}>
          <Chip label={busy ? 'Reading text...' : text ? 'Scan again' : 'Tap to scan a question'} onPress={scan} />
        </View>
      </Card>
      <Card>
        <Txt c={p.mut} style={{ fontSize: 14, marginBottom: 6 }}>Scanned text (edit if wrong)</Txt>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Nothing scanned yet"
          placeholderTextColor={p.mut}
          style={{ minHeight: 80, textAlignVertical: 'top', color: p.text, backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, padding: 12, fontSize: 16, fontFamily: FONT.body, ...corner(4, 14, 4, 14) }}
        />
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <GradButton label="Send to Maths" colors={GRAD.send} onPress={() => onSendToMaths(text || '2x + 6 = 14')} />
        </View>
      </Card>
    </ScrollView>
  );
}
