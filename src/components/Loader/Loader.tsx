import React, {
  memo,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  BackHandler,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { LOADING_BLOCK } from '../../assets/svg';
import { fadeIn, fadeOut } from '../../utils/animations';

type Props = {
  isVisible: boolean;
}

export const backAvoidFunction = () => true;

export const Loader = memo(({ isVisible }: Props) => {
  const animator = useRef<LottieView>(null);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      fadeIn(opacity).start();
      if (animator.current) {
        animator.current.reset();
        animator.current.play();
      }
    } else {
      fadeOut(opacity).start();
      if (animator.current) {
        animator.current.pause();
        animator.current.reset();
      }
    }
  }, [isVisible, opacity]);

  useEffect(() => {
    if (isVisible) {
      BackHandler.addEventListener('hardwareBackPress', backAvoidFunction);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', backAvoidFunction);
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[styles.root, { opacity }]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <LottieView
        ref={animator}
        source={LOADING_BLOCK}
        style={styles.lottieView}
        autoSize
        enableMergePathsAndroidForKitKatAndAbove
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    backgroundColor: 'rgba(23, 40, 43, 0.80)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  lottieView: { height: 240, width: 240 },
});
