import {
  StyleSheet,
  View,
  Text,
  Image as RNImage,
  Platform,
} from 'react-native';
import styled from 'styled-components';

export const Image = styled(RNImage)`
  width: 120;
  height: 120;
`;

export const ImageRow = styled(View)`
  flexDirection: row;
  borderBottomColor: #707070;
  borderBottomWidth: ${StyleSheet.hairlineWidth};
  paddingBottom: 20;
`;

export const NameContainer = styled(View)`
  flex: 1;
  justifyContent: flex-end;
`;

export const Name = styled(Text)`
  fontFamily: ${Platform.OS === 'android' ? 'oswald_medium' : 'Oswald-Medium'};
  fontSize: 24;
  color: #000000;
`;

export const Employment = styled(Text)`
  fontFamily: ${Platform.OS === 'android' ? 'oswald_medium' : 'Oswald-Medium'};
  fontSize: 18;
  color: #000000;
`;

export const ContactsContainer = styled(View)`
  marginVertical: 10;
  borderBottomColor: #707070;
  borderBottomWidth: ${StyleSheet.hairlineWidth};
  paddingBottom: 20;
`;

export const InfoText = styled(Text)`
  fontFamily: ${Platform.OS === 'android' ? 'oswald_regular' : 'Oswald-Regular'};
  fontSize: 16;
  color: #000000;
`;
