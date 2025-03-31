import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';

const DeliveryHeader = () => {
  return (
    <View>
      <Text>DeliveryHeader</Text>
    </View>
  );
};

export default DeliveryHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: '100%',
    bottom: -8,
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});
