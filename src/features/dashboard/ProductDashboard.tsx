import {
  Platform,
  StyleSheet,
  View,
  Animated as RNAnimated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeocode} from '@service/mapService';
import {useAuthStore} from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import Visuals from '@features/dashboard/Visuals';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomeText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import AnimatedHeader from './AnimatedHeader';
import Content from '@components/dashboard/Content';
import StickySearchBar from './StickySearchBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import withCart from '@features/card/WithCart';
import withLiveStatus from '@features/map/withLiveStatus';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const {setUser} = useAuthStore();
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT));
  const inserts = useSafeAreaInsets();
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  // back to top button style
  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition.current, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition.current, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    // Update The User Location And Set To The Database
    const updateUser = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          // console.log(longitude, latitude);

          reverseGeocode(latitude, longitude, setUser);
        },
        error => console.log(error),
        {
          enableHighAccuracy: false,
          timeout: 15000,
        },
      );
    };
    updateUser();
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);

    // =======================================

    // ======================================
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        {/* Cloud and raining View with Linear Gradient */}
        <Visuals />
        <SafeAreaView />
        {/* Back To Tap Button */}
        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}>
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(20)}
            />
            <CustomeText
              variant="h5"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomeText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer
          style={[styles.panelContainer, {marginTop: inserts?.top}]}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);

                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />

            {/* Fotter Content */}
            <View style={{backgroundColor: '#f8f8f8', padding: 28}}>
              <CustomeText
                fontSize={RFValue(24)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Grocery Delivery App
              </CustomeText>
              <CustomeText
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
                Developed By Pratham Makwana
              </CustomeText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withLiveStatus(
  withCart(withCollapsibleContext(ProductDashboard)),
);
