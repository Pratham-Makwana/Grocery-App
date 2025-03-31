import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight} from '@utils/Scaling';
import {useMapRefStore} from '@state/mapStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import MapViewComponent from '@components/map/MapViewComponent';
import {handleFitToPath} from '@components/map/mapUtills';

interface LiveMapProps {
  deliveryLocation: any;
  pickupLocation: any;
  deliveryPersonLocation: any;
  hasAccepted: any;
  hasPickedUp: any;
}
const LiveMap: FC<LiveMapProps> = ({
  deliveryLocation,
  deliveryPersonLocation,
  hasAccepted,
  hasPickedUp,
  pickupLocation,
}) => {
  //   console.log(deliveryPersonLocation);

  const {mapRef, setMapRef} = useMapRefStore();
//   console.log("==> mapRef", mapRef);
  

  useEffect(() => {
    if (mapRef) {
      handleFitToPath(
        mapRef,
        deliveryLocation,
        pickupLocation,
        hasPickedUp,
        hasAccepted,
        deliveryPersonLocation,
      );
    }
  }, [
    mapRef,
    deliveryPersonLocation,
    deliveryLocation,
    hasAccepted,
    hasPickedUp,
  ]);
  return (
    <View style={styles.container}>
      <MapViewComponent
        mapRef={mapRef}
        setMapRef={setMapRef}
        hasAccepted={hasAccepted}
        deliveryLocation={deliveryLocation}
        pickupLocation={pickupLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        hasPickedUp={hasPickedUp}
      />
      <TouchableOpacity
        style={styles.fitButton}
        onPress={() => {
          handleFitToPath(
            mapRef,
            deliveryLocation,
            pickupLocation,
            hasPickedUp,
            hasAccepted,
            deliveryPersonLocation,
          );
        }}>
        <Icon name="target" size={RFValue(14)} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default LiveMap;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  fitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    borderRadius: 35,
  },
});
