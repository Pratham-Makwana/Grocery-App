import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomeText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
interface ArrowButtonProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}
const ArrowButton: FC<ArrowButtonProps> = ({
  title,
  loading,
  onPress,
  price,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.btn,
        {justifyContent: price != 0 ? 'space-between' : 'center'},
      ]}>
      {price !== 0 && price && (
        <View>
          <CustomeText
            variant="h7"
            style={{color: 'white'}}
            fontFamily={Fonts.Medium}>
            {price + 34}.0
          </CustomeText>
          <CustomeText
            variant="h9"
            fontFamily={Fonts.Medium}
            style={{color: 'white'}}>
            ToTAL
          </CustomeText>
        </View>
      )}

      <View style={styles.flexRow}>
        <CustomeText
          variant="h6"
          style={{color: '#fff'}}
          fontFamily={Fonts.Medium}>
          {title}
        </CustomeText>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{marginHorizontal: 5}}
            size="small"
          />
        ) : (
          <Icon name="arrow-right" color="#fff" size={RFValue(25)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ArrowButton;
