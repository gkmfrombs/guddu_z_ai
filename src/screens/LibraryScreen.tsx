import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Txt from '../components/Txt';
import Chip from '../components/Chip';
import { corner, GRAD } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

const CARDS = [
  ['What is quantization?', 'Shrinking a model by storing numbers with less precision.'],
  ['What is RAG?', 'Search your library first, then let the AI answer from the matches.'],
  ['Why use mathjs?', 'Language models slip on arithmetic; a math engine is exact.'],
] as const;

export default function LibraryScreen() {
  const { p } = useTheme();
  const [i, setI] = useState(0);
  const [back, setBack] = useState(false);
  const go = (d: number) => { setI((i + d + CARDS.length) % CARDS.length); setBack(false); };

  return (
    <View style={{ gap: 10 }}>
      <Card><Txt c={p.mut} style={{ fontSize: 14 }}>Flashcard: tap to flip ({i + 1}/{CARDS.length})</Txt></Card>
      <Pressable onPress={() => setBack(!back)} accessibilityRole="button" accessibilityLabel="Flip flashcard">
        <LinearGradient colors={GRAD.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 170, alignItems: 'center', justifyContent: 'center', padding: 18, borderWidth: 1, borderColor: p.line, ...corner(6, 26, 6, 26) }}>
          <Txt f="semi" c="#fff" style={{ fontSize: 19, lineHeight: 26, textAlign: 'center' }}>{CARDS[i][back ? 1 : 0]}</Txt>
        </LinearGradient>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip label="Previous" onPress={() => go(-1)} flex />
        <Chip label="Next card" onPress={() => go(1)} flex />
      </View>
    </View>
  );
}
