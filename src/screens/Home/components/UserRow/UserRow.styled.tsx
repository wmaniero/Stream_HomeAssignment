import {
  View,
  Text,
  Image as RNImage,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styled from 'styled-components';

export const Card = styled(TouchableOpacity)<{ onLongPress: () => void }>`
  minHeight: 100;
  backgroundColor: white;
  borderRadius: 10;
  marginBottom: 10;
  flexDirection: row;
  overflow: hidden;
  elevation: 1;
`;

export const Image = styled(RNImage)`
  width: 120;
  height: 100%;
`;

export const DetailsContainer = styled(View)`
  flex: 1;
  alignContent: center;
  justifyContent: center;
  paddingHorizontal: 12;
`;

export const Name = styled(Text)`
  fontFamily: ${Platform.OS === 'android' ? 'oswald_medium' : 'Oswald-Medium'};
  fontSize: 16;
  color: #000000;
`;

export const Email = styled(Text)`
  fontFamily: ${Platform.OS === 'android' ? 'oswald_medium' : 'Oswald-Medium'};
  fontSize: 18;
  color: #000000;
`;
