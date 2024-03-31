import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BroContext } from './Stack';
import MapView, { MapStyleElement, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { BroFeedType, ErrorToast, UserGetProfile, UserProfileType } from './FireBaseFunctions';
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import StylesObj from './Styles';
import { Toast } from 'react-native-toast-notifications';
const Styles = StylesObj.StylesObj;

type PublicProfileScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
const BroMap = ({navigation, route}: {navigation:StackNavigationProp<RootStackParamList>, route: PublicProfileScreenRouteProp}) => {

  const { profile, broList } = useContext(BroContext);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const Params = route.params;
  const [selected, setSelected] = useState<BroFeedType | undefined>(Params?.Bro);
  const [selectedTime, setSelectedTime] = useState('-');
  const [selectedProfile, setSelectedProfile] = useState<UserProfileType | null>(null);

  // {"latitude": 36.99736908851504, "latitudeDelta": 0.03566624937246843, "longitude": -122.0600495673716, "longitudeDelta": 0.021237395703806783}
  const UCSC: Region = {
    latitude: 36.996,
    longitude: -122.06,
    latitudeDelta: 0.022,
    longitudeDelta: 0.022
  };

  useEffect(() => {
    if (mapRef.current && loading && !selected) {
      setLoading(false);
      (async() => {
        mapRef.current.setCamera({pitch: 90, zoom: 17.4});
        await new Promise(r => setTimeout(r, 100));
        mapRef.current.animateCamera({pitch: 0, zoom: 14.6827}, {duration: 500});
      })();
    }
  }, [mapRef, loading]);

  useEffect(() => {
    if (selected?.BroLocation) {
      const { BroLocation } = selected;
      const { latitude, longitude } = BroLocation;
      mapRef.current.animateCamera({
        center: {latitude, longitude}
      }, {duration: 300});

      setSelectedTime(moment(selected.BroDate.toDate()).local().startOf('seconds').fromNow(true));

      (async () => {
        try {
          setSelectedProfile(await UserGetProfile(selected.Email));
        }
        catch (error: any) {
          Toast.show('Error loading profile: ' + error.message, ErrorToast);
        }
      })();
    }
  }, [selected]);
  
  const [region, setRegion] = useState(UCSC);

  return(
    <MapView
      provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
      style={StyleSheet.absoluteFill} // Map takes up entire screen
      ref={mapRef} // allows us to animate the map
      initialRegion={region}
      onRegionChangeComplete={region => setRegion(region)}
      showsUserLocation={true}
      showsPointsOfInterest={false}
      showsBuildings={false}
      showsMyLocationButton={false}
      showsCompass={false}
      showsScale={false}
      showsIndoors={false}
      customMapStyle={customMapStyle}
    >
      {(broList || []).map((bro: BroFeedType, index) => {
        if (!bro.BroLocation) return <View key={index} />;
        if (bro.BroDate === selected?.BroDate && bro.BroName === selected?.BroName) return <View key={index} />;
        const latitude = bro.BroLocation?.latitude || 0;
        const longitude = bro.BroLocation?.longitude || 0;
        return (
          <Marker 
            key={index}
            onPress={() => {
              setSelectedProfile(null);
              setSelectedTime('-');
              setSelected(bro);
            }}
            coordinate={{latitude, longitude}}
          />
        );
      })}
      {
        selected?.BroLocation &&
        <Marker
          coordinate={{
            latitude: selected.BroLocation.latitude || 0,
            longitude: selected.BroLocation.longitude || 0
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={Styles.MapMarker}>
            <Image 
              source={selectedProfile ? {uri: selectedProfile.PFP} : require('../assets/SamplePFP.jpg')}
              style={Styles.ProfileIcon}
            />
            <View style={[Styles.ProfileNameSloganContainer, {marginHorizontal: 2}]}>
              <Text style={[Styles.ProfileName, {maxWidth: 120}]}>{selected.BroName}</Text>
              <Text style={Styles.ProfileSlogan}>{selectedTime + ' ago'}</Text>
            </View>
          </View>
        </Marker>
      }
    </MapView>      
  )
};

export default BroMap;

// https://snazzymaps.com/style/35/avocado-world
// Daniel was here :^)
const customMapStyle : MapStyleElement[] = [
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#aee2e0"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#abce83"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#769E72"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7B8758"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#8dab68"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#5B5B3F"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ABCE83"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#A4C67D"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#9BBF72"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#87ae79"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f2200"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "visibility": "on"
          },
          {
              "weight": 4.1
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#495421"
          }
      ]
  },
  {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  }
]