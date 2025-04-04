import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {screenWidth} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import LottieView from 'lottie-react-native';
import CustomeText from '@components/ui/CustomText';
import {replace} from '@utils/NavigationUtils';

const OrderSuccess = () => {
  const {user} = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('LiveTracking');
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomeText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}>
        ORDER PLACED
      </CustomeText>
      <View style={styles.deliveryContainer}>
        <CustomeText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}>
          Delivering to Home
        </CustomeText>
      </View>
      <CustomeText>{user?.address || 'Somewhere, knowhere'}</CustomeText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OrderSuccess;
