import { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Txt from './Txt';

export default function Splash({ onDone }: { onDone: () => void }) {
  const op = useRef(new Animated.Value(1)).current;
  const closed = useRef(false);
  const { width } = useWindowDimensions();
  const size = Math.min(width * 0.86, 420);

  const close = useCallback(() => {
    if (closed.current) return;
    closed.current = true;
    Animated.timing(op, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => onDone());
  }, [op, onDone]);

  useEffect(() => {
    const t = setTimeout(close, 2600);
    return () => clearTimeout(t);
  }, [close]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#07021a', opacity: op, zIndex: 20 }]}>
      <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 }} onPress={close} accessibilityLabel="Skip intro">
        <Image source={require('../../assets/brand/logo-full.png')} style={{ width: size, height: size }} resizeMode="contain" />
        <Txt c="#b9b2e0" style={{ fontSize: 15 }}>Offline AI study assistant. Tap to start.</Txt>
      </Pressable>
    </Animated.View>
  );
}
