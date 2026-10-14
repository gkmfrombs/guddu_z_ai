import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Txt from '../components/Txt';
import Chip from '../components/Chip';
import GradButton from '../components/GradButton';
import ConfidenceTrace from '../components/ConfidenceTrace';
import { mockAnswer, type Trace } from '../ai/mockAnswer';
import { corner, FONT, GRAD } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

type Msg = { id: string; role: 'user' | 'bot'; text: string; source?: string; trace?: Trace };
const IDEAS = ['Why is the sky blue?', 'Explain photosynthesis', 'Latest news'];

export default function ChatScreen({ online }: { online: boolean }) {
  const { p } = useTheme();
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: '0', role: 'bot', text: "Hi, I'm Guddu Z. I run fully on your phone. Ask me anything or tap an idea below." },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const list = useRef<FlatList<Msg>>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const send = (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    const r = mockAnswer(question, online);
    const uid = String(Date.now());
    const bid = uid + 'b';
    const mode = online ? 'Online' : 'Offline';
    setMsgs((m) => [...m, { id: uid, role: 'user', text: question }, { id: bid, role: 'bot', text: '' }]);
    setInput('');
    setBusy(true);
    const words = r.text.split(' ');
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      const done = i >= words.length;
      setMsgs((m) =>
        m.map((x) =>
          x.id === bid ? { ...x, text: words.slice(0, i).join(' '), ...(done ? { source: `${r.source} | ${mode}`, trace: r.trace } : {}) } : x,
        ),
      );
      if (done) {
        if (timer.current) clearInterval(timer.current);
        setBusy(false);
      }
    }, 45);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={list}
        data={msgs}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingVertical: 4, gap: 10 }}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) =>
          item.role === 'user' ? (
            <LinearGradient colors={GRAD.user} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ alignSelf: 'flex-end', maxWidth: '88%', padding: 12, ...corner(16, 4, 16, 16) }}>
              <Txt c="#fff">{item.text}</Txt>
            </LinearGradient>
          ) : (
            <View style={{ alignSelf: 'flex-start', maxWidth: '88%', padding: 12, backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, ...corner(4, 16, 16, 16) }}>
              <Txt>{item.text}</Txt>
              {item.source ? <Txt c={p.mut} style={{ fontSize: 13, lineHeight: 18, marginTop: 6 }}>Source: {item.source}</Txt> : null}
              {item.trace ? <ConfidenceTrace trace={item.trace} /> : null}
            </View>
          )
        }
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingVertical: 8 }}>
        {IDEAS.map((t) => <Chip key={t} label={t} onPress={() => send(t)} />)}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything..."
          placeholderTextColor={p.mut}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
          style={{ flex: 1, color: p.text, backgroundColor: p.glass, borderColor: p.line, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, fontFamily: FONT.body, ...corner(4, 14, 4, 14) }}
        />
        <GradButton label="Send" colors={GRAD.send} onPress={() => send(input)} disabled={busy} />
      </View>
    </View>
  );
}
