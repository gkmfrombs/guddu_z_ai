import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Card from '../components/Card';
import Txt from '../components/Txt';
import Chip from '../components/Chip';
import { brand } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

const TIERS = ['Lite 4GB', 'Standard 6-8GB', 'Plus 8GB+'];

export default function SettingsScreen({ onReplay }: { onReplay: () => void }) {
  const { p, mode, setMode } = useTheme();
  const [tier, setTier] = useState(1);
  const label = { fontSize: 14, marginBottom: 8 } as const;
  return (
    <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 8 }}>
      <Card>
        <Txt c={p.mut} style={label}>Your brand</Txt>
        <View style={{ backgroundColor: '#07021a', borderRadius: 12, overflow: 'hidden' }}>
          <Image source={require('../../assets/brand/logo-full.png')} style={{ width: '100%', aspectRatio: 1 }} resizeMode="contain" />
        </View>
        <View style={{ marginTop: 8 }}><Chip label="Replay intro" onPress={onReplay} /></View>
      </Card>
      <Card>
        <Txt c={p.mut} style={label}>Brand colors</Txt>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {[brand.violet, brand.pink, brand.cyan, brand.orange].map((c) => (
            <View key={c} style={{ flex: 1, height: 26, backgroundColor: c, borderTopLeftRadius: 3, borderTopRightRadius: 10, borderBottomRightRadius: 3, borderBottomLeftRadius: 10 }} />
          ))}
        </View>
        <Txt c={p.mut} style={{ fontSize: 14, marginTop: 10 }}>Fonts: Fraunces (headings), Newsreader (body)</Txt>
      </Card>
      <Card>
        <Txt c={p.mut} style={label}>Theme</Txt>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Chip label="Dark" on={mode === 'dark'} onPress={() => setMode('dark')} flex />
          <Chip label="Light" on={mode === 'light'} onPress={() => setMode('light')} flex />
        </View>
      </Card>
      <Card>
        <Txt c={p.mut} style={label}>Model tier (auto-picked by phone RAM later)</Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {TIERS.map((t, i) => <Chip key={t} label={t} on={tier === i} onPress={() => setTier(i)} />)}
        </View>
      </Card>
    </ScrollView>
  );
}
