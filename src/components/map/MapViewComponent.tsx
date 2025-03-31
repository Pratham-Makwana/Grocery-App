import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {customMapStyle} from '@utils/CustomMap';
import Markers from './Markers';
import {getPoints} from '@utils/getPoints';
import {Colors} from '@utils/Constants';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_API} from '@service/config';

const MapViewComponent = ({
  mapRef,
  setMapRef,
  deliveryLocation,
  deliveryPersonLocation,
  hasAccepted,
  hasPickedUp,
  camera,
  pickupLocation,
}: any) => {
  return (
    <MapView
      ref={setMapRef}
      style={{flex: 1}}
      provider="google"
      camera={camera}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
      userLocationCalloutEnabled={true}
      userLocationPriority="high"
      showsTraffic={false}
      pitchEnabled={false}
      followsUserLocation={true}
      showsCompass={true}
      showsBuildings={false}
      showsIndoors={false}
      showsScale={false}
      showsIndoorLevelPicker={false}>
      {deliveryPersonLocation && (hasPickedUp || hasAccepted) && (
        <MapViewDirections
          origin={deliveryPersonLocation}
          destination={hasAccepted ? pickupLocation : deliveryLocation}
          precision="high"
          apikey={GOOGLE_MAP_API}
          strokeColor="#2871F2"
          strokeWidth={5}
          onError={err => console.log(err)}
        />
      )}
      <Markers
        deliveryLocation={deliveryLocation}
        pickupLoaction={pickupLocation}
        deliveryPersonLocation={deliveryPersonLocation}
      />
      {!hasPickedUp && deliveryLocation && pickupLocation && (
        <Polyline
          coordinates={getPoints([pickupLocation, deliveryLocation])}
          strokeColor={Colors.text}
          strokeWidth={2}
          geodesic={true}
          lineDashPattern={[12, 10]}
        />
      )}
    </MapView>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
