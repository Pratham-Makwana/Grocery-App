import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomeText from '@components/ui/CustomText';

interface TabBarProps {
  selectedTab: 'available' | 'delivered';
  onTabChange: (tab: 'available' | 'delivered') => void;
}

const TabBar: FC<TabBarProps> = ({onTabChange, selectedTab}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab === 'available' && styles.activeTab]}
        onPress={() => onTabChange('available')}>
        <CustomeText
          variant="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab === 'available'
              ? styles.activeTabText
              : styles.inactiveTabText,
          ]}>
          Available
        </CustomeText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab !== 'available' && styles.activeTab]}
        onPress={() => onTabChange('delivered')}>
        <CustomeText
          variant="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab !== 'available'
              ? styles.activeTabText
              : styles.inactiveTabText,
          ]}>
          Delivered
        </CustomeText>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    width: '30%',
    margin: 10,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    color: Colors.text,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: Colors.disabled,
  },
});
