import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomeText from '@components/ui/CustomText';
import BillDetails from '@features/order/BillDetails';

const OrderSummery: FC<{order: any}> = ({order}) => {
  const totalPrice =
    order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0,
    ) || 0;
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View>
          <CustomeText variant="h7" fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomeText>
          <CustomeText variant="h9" fontFamily={Fonts.Medium}>
            Order Id - #{order?.orderId}
          </CustomeText>
        </View>
      </View>
      {order?.items?.map((item: any, index: number) => {
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imgContainer}>
              <Image source={{uri: item?.item?.image}} style={styles.img} />
            </View>
            <View style={{width: '55%'}}>
              <CustomeText
                numberOfLines={2}
                variant="h8"
                fontFamily={Fonts.Medium}>
                {item.item.name}
              </CustomeText>
              <CustomeText variant='h9'>{item.item.quantity}</CustomeText>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <CustomeText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                {item.count * item.item.price}
              </CustomeText>
              <CustomeText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                {item.count}x
              </CustomeText>
            </View>
          </View>
        );
      })}

      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
});

export default OrderSummery;
