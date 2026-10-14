import { StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { brand } from '../theme/theme';

// Soft colored clouds drawn once with radial gradients: cheap, no blur filter needed.
const BLOBS = [
  { c: brand.violet, x: 0.05, y: 0.04, r: 0.62, o: 0.75 },
  { c: brand.pink, x: 0.95, y: 0.98, r: 0.58, o: 0.7 },
  { c: brand.cyan, x: 0.6, y: 0.55, r: 0.5, o: 0.55 },
  { c: brand.orange, x: 0.9, y: 0.1, r: 0.42, o: 0.45 },
];

export default function Cloud() {
  const { width: w, height: h } = useWindowDimensions();
  return (
    <Svg width={w} height={h} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        {BLOBS.map((b, i) => (
          <RadialGradient key={i} id={`c${i}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={b.c} stopOpacity={b.o} />
            <Stop offset="1" stopColor={b.c} stopOpacity={0} />
          </RadialGradient>
        ))}
      </Defs>
      {BLOBS.map((b, i) => (
        <Circle key={i} cx={b.x * w} cy={b.y * h} r={b.r * w} fill={`url(#c${i})`} />
      ))}
    </Svg>
  );
}
