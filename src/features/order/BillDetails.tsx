import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomeText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ReportItem: FC<{
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}> = ({iconName, price, title, underline}) => {
  return (
    <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
      <View style={styles.flexRow}>
        <Icon name={iconName} style={{opacity: 0.7}} size={RFValue(12)} />
        <CustomeText
          style={{
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'dashed',
          }}
          variant="h8">
          {title}
        </CustomeText>
      </View>
      <CustomeText variant="h8">{price}</CustomeText>
    </View>
  );
};

const BillDetails: FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomeText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomeText>
      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Items total"
          price={totalItemPrice}
        />
        <ReportItem iconName="pedal-bike" title="Delivery charge" price={29} />
        <ReportItem iconName="shopping-bag" title="Handing charge" price={2} />
        <ReportItem iconName="cloudy-snowing" title="Surge charge" price={3} />
      </View>
      <View style={[styles.flexRowBetween, {marginBottom : 15}]}>
        <CustomeText
          variant="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          Grand Total
        </CustomeText>
        <CustomeText style={styles.text} fontFamily={Fonts.SemiBold}>
          {totalItemPrice + 34}
        </CustomeText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginVertical: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default BillDetails;
