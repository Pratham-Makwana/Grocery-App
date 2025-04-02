import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import TabBar from './TabBar';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeocode} from '@service/mapService';
import {fetchOrders} from '@service/orderService';
import DeliveryOrderItem from './DeliveryOrderItem';
import CustomeText from '@components/ui/CustomText';
import withLiveOrder from './WithLiveOrder';

const DeliveryDashboard = () => {
  const {user, setUser} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [lodaing, setLoading] = useState(false);
  const [date, setDate] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const updateUser = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeocode(latitude, longitude, setUser);
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 1500,
      },
    );
  };

  useEffect(() => {
    updateUser();
  }, []);

  const fetchData = async () => {
    setDate([]);
    setRefreshing(true);
    setLoading(true);
    const data = await fetchOrders(selectedTab, user?._id, user?.branch);
    setDate(data);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const renderOrderItem = ({item, index}: any) => {
    return <DeliveryOrderItem index={index} item={item} />;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>

      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
          data={date}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if (lodaing) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size={'small'} />
                </View>
              );
            }
            return (
              <View>
                <CustomeText>No Orders found yet!</CustomeText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
    </View>
  );
};

export default withLiveOrder(DeliveryDashboard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
