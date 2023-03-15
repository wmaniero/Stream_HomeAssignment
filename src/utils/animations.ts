import { Easing, Animated } from 'react-native';

export const fadeIn = (opacity: Animated.Value, duration = 300) => Animated.timing(opacity, {
  toValue: 1,
  duration,
  easing: Easing.linear,
  useNativeDriver: true,
});

export const fadeOut = (opacity: Animated.Value, duration = 300) => Animated.timing(opacity, {
  toValue: 0,
  duration,
  easing: Easing.linear,
  useNativeDriver: true,
});
