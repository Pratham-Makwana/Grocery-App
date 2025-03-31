import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {getOrderById} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';
import LiveHeader from './LiveHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomeText from '@components/ui/CustomText';
import OrderSummery from './OrderSummery';
import DeliveryDetails from './DeliveryDetails';
import LiveMap from './LiveMap';
const LiveTracking = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    setCurrentOrder(data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  let msg = 'Packing your order';
  let time = 'Arriving in 10 minutes';
  if (currentOrder?.status === 'confirmed') {
    (msg = 'Arriving Soon'), (time = 'Arriving in 8 minutes');
  } else if (currentOrder?.status === 'arriving') {
    (msg = 'Order Picked Up'), (time = 'Arriving in 6 minutes');
  } else if (currentOrder?.status == 'delivered') {
    (msg = 'Order Delivered'), (time = 'Fastest Delivery');
  }
  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Live Map */}
        <LiveMap
          deliveryLocation={currentOrder?.deliveryLocation}
          pickupLocation={currentOrder?.pickupLocation}
          deliveryPersonLocation={currentOrder?.deliveryPersonLocation}
          hasAccepted={currentOrder?.status == 'confirmed'}
          hasPickedUp={currentOrder?.status == 'arriving'}
        />

        {/* Delivery Partner Details  */}
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomeText
              numberOfLines={1}
              variant="h7"
              fontFamily={Fonts.SemiBold}>
              {currentOrder?.deliveryPartner?.name ||
                'We will soon assign delivery partner'}
            </CustomeText>

            {currentOrder?.deliverypartner && (
              <CustomeText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomeText>
            )}

            <CustomeText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? 'For Delivery instruction you can contact here'
                : msg}
            </CustomeText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
        <OrderSummery order={currentOrder} />
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
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
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
