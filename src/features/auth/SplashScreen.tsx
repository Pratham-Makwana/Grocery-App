import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import Logo from '@assets/images/logo.jpeg';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {navigate, resetAndNavigate} from '@utils/NavigationUtils';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {jwtDecode} from 'jwt-decode';
import {refresh_tokens, refreshUser} from '@service/authService';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});
interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();
  console.log("==> user", user);
  

  const takenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refresToken = tokenStorage.getString('refreshToken') as string;
    // console.log(accessToken,refresToken);
    

    // Checking AccessToken
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefresToken = jwtDecode<DecodedToken>(refresToken);

      const currentTime = Date.now() / 1000;

      // IF RefreshToken is Expire
      if (decodedRefresToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }

      // If AccessToken is Expire
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
          await refreshUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error refreshing token!');
          return false;
        }
      }

      // Navigate Based On The User Role
      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
     
      return true;
    }

    // No AccessToken Move To The CustomerLogin

    resetAndNavigate('CustomerLogin');
    return false;
  };
  
  useEffect(() => {
    const intialStartup = async () => {
      try {
        GeoLocation.requestAuthorization();
        takenCheck();
        // navigate('CustomerLogin');
      } catch (error) {
        Alert.alert(
          'Sorry we need location service to give you better shopping experience',
        );
        console.log('==> Splash Error', error);
      }
    };
    const timeOut = setTimeout(intialStartup, 1000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.55,
    width: screenWidth * 0.55,
    resizeMode: 'contain',
  },
});
