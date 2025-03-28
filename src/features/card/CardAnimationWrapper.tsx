import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {hocStyles} from '@styles/GlobalStyles';

interface CardAnimationWrapperProps {
  cartCount: number;
  children: React.ReactNode;
}

const CardAnimationWrapper: FC<CardAnimationWrapperProps> = ({
  cartCount,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (cartCount > 0 && !hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setHasAnimated(true);
      });
    } else if (cartCount === 0 && hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setHasAnimated(false);
      });
    }
  }, [cartCount, hasAnimated]);

  const slideUpStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
    opacity: slideAnim,
  };

  return (
    <Animated.View style={[hocStyles.cartContainer, slideUpStyle]}>
      {children}
    </Animated.View>
  );
};

export default CardAnimationWrapper;

const styles = StyleSheet.create({});
