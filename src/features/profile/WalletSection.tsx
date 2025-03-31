import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import WalletItem from './WalletItem';
import {Colors} from '@utils/Constants';

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet-outline" label="wallet" />
      <WalletItem icon="chatbubble-ellipses-outline" label="Support" />
      <WalletItem icon="card-outline" label="Payments" />
    </View>
  );
};

export default WalletSection;

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});
