import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Fraunces_800ExtraBold } from '@expo-google-fonts/fraunces/800ExtraBold';
import { Newsreader_400Regular } from '@expo-google-fonts/newsreader/400Regular';
import { Newsreader_600SemiBold } from '@expo-google-fonts/newsreader/600SemiBold';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader/400Regular_Italic';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { brand, corner, GRAD } from './src/theme/theme';
import Cloud from './src/components/Cloud';
import Brand from './src/components/Brand';
import Splash from './src/components/Splash';
import Txt from './src/components/Txt';
import ChatScreen from './src/screens/ChatScreen';
import MathsScreen from './src/screens/MathsScreen';
import ScanScreen from './src/screens/ScanScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const TABS = ['Chat', 'Maths', 'Scan', 'Library', 'Settings'] as const;
type Tab = (typeof TABS)[number];

function Shell() {
  const { p, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const [loaded, fontError] = useFonts({
    Fraunces: Fraunces_800ExtraBold,
    Newsreader: Newsreader_400Regular,
    NewsreaderSemi: Newsreader_600SemiBold,
    NewsreaderItalic: Newsreader_400Regular_Italic,
  });
  const [tab, setTab] = useState<Tab>('Chat');
  const [online, setOnline] = useState(false);
  const [eq, setEq] = useState('2x + 6 = 14');
  const [signal, setSignal] = useState(0);
  const [splash, setSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0);
  const [kb, setKb] = useState(false);

  useEffect(() => {
    const a = Keyboard.addListener('keyboardDidShow', () => setKb(true));
    const b = Keyboard.addListener('keyboardDidHide', () => setKb(false));
    return () => { a.remove(); b.remove(); };
  }, []);

  if (!loaded && !fontError) return <View style={{ flex: 1, backgroundColor: '#07021a' }} />;

  const toMaths = (t: string) => { setEq(t); setSignal((s) => s + 1); setTab('Maths'); };
  const show = (t: Tab) => ({ flex: 1, display: tab === t ? ('flex' as const) : ('none' as const) });

  return (
    <View style={{ flex: 1, backgroundColor: p.bg }}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Cloud />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 }}>
          <Brand />
          <Pressable
            onPress={() => setOnline(!online)}
            accessibilityRole="button"
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: p.line, backgroundColor: p.glass, paddingVertical: 7, paddingHorizontal: 12, ...corner(4, 12, 4, 12) }}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: online ? brand.green : brand.cyan }} />
            <Txt f="semi" style={{ fontSize: 14, lineHeight: 18 }}>{online ? 'Online' : 'Offline'}</Txt>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <View style={show('Chat')}><ChatScreen online={online} /></View>
          <View style={show('Maths')}><MathsScreen eq={eq} setEq={setEq} signal={signal} /></View>
          <View style={show('Scan')}><ScanScreen onSendToMaths={toMaths} /></View>
          <View style={show('Library')}><LibraryScreen /></View>
          <View style={show('Settings')}><SettingsScreen onReplay={() => { setSplashKey((k) => k + 1); setSplash(true); }} /></View>
        </View>

        {kb ? (
          <View style={{ height: 8 }} />
        ) : (
          <View style={{ flexDirection: 'row', gap: 4, padding: 6, marginTop: 8, marginBottom: Math.max(insets.bottom, 12), backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, ...corner(6, 22, 6, 22) }}>
            {TABS.map((t) => (
              <Pressable key={t} onPress={() => setTab(t)} accessibilityRole="button" style={{ flex: 1 }}>
                {tab === t ? (
                  <LinearGradient colors={GRAD.tab} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ alignItems: 'center', paddingVertical: 9, ...corner(4, 12, 4, 12) }}>
                    <Txt f="semi" c="#fff" style={{ fontSize: 13, lineHeight: 17 }}>{t}</Txt>
                  </LinearGradient>
                ) : (
                  <View style={{ alignItems: 'center', paddingVertical: 9 }}>
                    <Txt f="semi" c={p.mut} style={{ fontSize: 13, lineHeight: 17 }}>{t}</Txt>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        )}
      </KeyboardAvoidingView>
      {splash && <Splash key={splashKey} onDone={() => setSplash(false)} />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Shell />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
