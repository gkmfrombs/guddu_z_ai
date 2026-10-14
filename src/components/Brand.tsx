import { Image, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { brand } from '../theme/theme';

export default function Brand() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Image source={require('../../assets/brand/mark.png')} style={{ width: 44, height: 48 }} resizeMode="contain" />
      <Svg width={165} height={38}>
        <Defs>
          <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={brand.orange} />
            <Stop offset="0.35" stopColor={brand.pink} />
            <Stop offset="0.7" stopColor={brand.violet} />
            <Stop offset="1" stopColor={brand.cyan} />
          </LinearGradient>
        </Defs>
        <SvgText x="0" y="28" fontSize="28" fontFamily="Fraunces" fill="url(#bg)" letterSpacing="1">GUDDU Z</SvgText>
      </Svg>
    </View>
  );
}
