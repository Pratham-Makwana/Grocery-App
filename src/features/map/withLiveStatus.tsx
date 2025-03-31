import CustomeText from '@components/ui/CustomText';
import {useNavigationState} from '@react-navigation/native';
import { SOCKET_URL } from '@service/config';

import {getOrderById} from '@service/orderService';
import {useAuthStore} from '@state/authStore';
import {hocStyles} from '@styles/GlobalStyles';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import React, {FC, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {io} from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(
      state => state.routes[state.index].name,
    );

    console.log("==> withLiveStatus currentOrder ", currentOrder);
    

    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id as any);
      console.log('==>fetchOrderDetails', data);

      setCurrentOrder(data);
    };
    
    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: true,
        });
        socketInstance.emit('joinRoom', currentOrder?._id);

        socketInstance?.on('liveTrackingUpdates', updateOrder => {
          fetchOrderDetails();
          console.log('==> RECEIVING LIVE UPDATES');
        });

        socketInstance.on('orderConfirmed', confirmOrder => {
          fetchOrderDetails();
          console.log('==> ORDER CONFIRMATION LIVE UPDATES');
        });
        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);

    return (
      <View style={style.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              hocStyles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={style.flexRow}>
              <View style={style.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <View style={{width: '68%'}}>
                <CustomeText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder?.status}
                </CustomeText>
                <CustomeText variant="h9" fontFamily={Fonts.Medium}>
                  {currentOrder?.items[0]?.item.name +
                    (currentOrder?.items.length - 1 > 0
                      ? `and ${currentOrder?.items?.length - 1} + items`
                      : '')}
                </CustomeText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={style.btn}>
              <CustomeText
                fontFamily={Fonts.Medium}
                variant="h8"
                style={{color: Colors.secondary}}>
                View
              </CustomeText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return WithLiveStatusComponent;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});
export default withLiveStatus;
