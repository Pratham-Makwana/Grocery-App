import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {
  confirmOrder,
  getOrderById,
  sendLiveOrderUpdates,
} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomeText from '@components/ui/CustomText';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummery from '@features/map/OrderSummery';
import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {hocStyles} from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';

const DeliveryMap = () => {
  const user = useAuthStore(state => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();

  const orderDetails = route?.params as Record<string, any>;

  const {setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?._id as any);
    setOrderData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      async poition => {
        const {latitude, longitude} = poition.coords;
        setMyLocation({latitude, longitude});
      },
      err => console.log('Error Fetching GeoLocation', err),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const accepOrder = async () => {
    const data = await confirmOrder(orderData?._id, myLocation);
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Accepted', 'Grab your package');
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };

  const orderPickedUp = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      'arriving',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert("Let's deliver it as soon as possible");
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };

  const orderDelivered = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      'delivered',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Woohoo! You made it');
    } else {
      Alert.alert('There was an error');
    }
    fetchOrderDetails();
  };

  let msg = 'Start this order';
  if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'confirmed'
  ) {
    msg = 'Grab your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'arriving'
  ) {
    msg = 'Complete your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'delivered'
  ) {
    msg = 'Your milestone';
  } else if (
    orderData?.deliveryPartner?._id !== user?._id &&
    orderData?.status != 'available'
  ) {
    msg = 'You missed it!';
  }

  useEffect(() => {
    async function sendLiveUpdate() {
      if (
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'delivered' &&
        orderData?.status != 'cancelled'
      ) {
        await sendLiveOrderUpdates(
          orderData?._id,
          myLocation,
          orderData?.status,
        );
        fetchOrderDetails();
      }
    }
    sendLiveUpdate();
  }, [myLocation]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LiveHeader
        type="Delivery"
        title={msg}
        secondTitle="Delivery in 10 minutes"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Live Map */}
        {orderData?.deliveryLocation && orderData?.pickupLocation && (
          <LiveMap
            deliveryPersonLocation={
              orderData?.deliveryPersonLocation || myLocation
            }
            deliveryLocation={orderData?.deliveryLocation || null}
            hasAccepted={
              orderData?.deliveryPartner?.id == user?._id &&
              orderData?.status == 'confirmed'
            }
            hasPickedUp={orderData?.status == 'arriving'}
            pickupLocation={orderData?.pickupLocation || null}
          />
        )}
        <DeliveryDetails details={orderData?.cutomer} />
        <OrderSummery order={orderData} />

        {/* Feedback and review */}

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomeText variant="h7" fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomeText>
            <CustomeText variant="h9" fontFamily={Fonts.Medium}>
              Give the review and feedback
            </CustomeText>
          </View>
        </View>

        <CustomeText
          fontFamily={Fonts.SemiBold}
          variant="h6"
          style={{opacity: 0.6, marginTop: 20}}>
          Radhe Food
        </CustomeText>
      </ScrollView>
      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[hocStyles.cartContainer, styles.btnContainer]}>
          {orderData?.status == 'available' && (
            <CustomButton
              disabled={false}
              title="Accep Order"
              onPress={accepOrder}
              loading={false}
            />
          )}
          {orderData?.status == 'confirmed' &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                disabled={false}
                title="Order Picked Up"
                onPress={orderPickedUp}
                loading={false}
              />
            )}
          {orderData?.status == 'arriving' &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                disabled={false}
                title="Delivered"
                onPress={orderDelivered}
                loading={false}
              />
            )}
        </View>
      )}
    </View>
  );
};

export default DeliveryMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  btnContainer: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
