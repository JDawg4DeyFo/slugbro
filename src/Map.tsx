import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BroContext } from './Stack';
import MapView, { MapStyleElement, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BroFeedType, ErrorToast, UserGetProfile, UserProfileType } from './FireBaseFunctions';
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import StylesObj, { Colors } from './Styles';
import { Toast } from 'react-native-toast-notifications';
import { Timestamp } from 'firebase/firestore';
const Styles = StylesObj.StylesObj;

type PublicProfileScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
const BroMap = ({navigation, route}: {navigation:StackNavigationProp<RootStackParamList>, route: PublicProfileScreenRouteProp}) => {

  const { profile, broList, region, setRegion } = useContext(BroContext);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const Params = route.params;
  const [selected, setSelected] = useState<BroFeedType | undefined>(Params?.Bro);
  const [selectedTime, setSelectedTime] = useState('-');
  const [selectedProfile, setSelectedProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    if (loading && !selected) {
      setLoading(false);
      (async() => {
        await new Promise(r => setTimeout(r, 100));
        mapRef.current.setCamera({pitch: 90, zoom: 17.4});
        await new Promise(r => setTimeout(r, 100));
        mapRef.current.animateCamera({pitch: 0, zoom: 14.6827}, {duration: 2000});
      })();
    }
  }, [loading, selected]);

  useEffect(() => {
    if (selected?.BroLocation) {
      setLoading(false);
      const { BroLocation } = selected;
      const { latitude, longitude } = BroLocation;
      (async () => {
        await new Promise(r => setTimeout(r, 100));
        mapRef.current.animateCamera({
          center: {latitude, longitude}
        }, {duration: 1000});
      })();

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

  const navigate = (Bro: BroFeedType) => {
    if (profile?.Email === Bro.Email) {
      navigation.navigate('Profile');
    }
    else {
      const DummyProfile: UserProfileType = selectedProfile || {
        Email: Bro.Email,
        PFP: null,
        Name: Bro.BroName,
        Slogan: null,
        Major: null,
        College: null,
        IG: null,
        Bio: null,
        NumBros: 0,
        NumFollowing: 0,
        NumFollowers: 0,
        Following: [],
        LastBro: Timestamp.now()
    };
      navigation.navigate('Brofile', { Profile: DummyProfile });
    }
};

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
          onPress={() => navigate(selected)}
          style={{alignItems: 'center'}}
        >
          <View style={[Styles.MapMarker, {backgroundColor: selected.Email === profile?.Email ? '#def' : Colors.White}]}>
            <Image 
              source={selectedProfile ? {uri: selectedProfile.PFP} : require('../assets/SamplePFP.jpg')}
              style={Styles.ProfileIcon}
            />
            <View style={[Styles.ProfileNameSloganContainer, {marginHorizontal: 2}]}>
              <Text style={[Styles.ProfileName, {maxWidth: 200}]}>{selected.BroName}</Text>
              <Text style={Styles.ProfileSlogan}>{selectedTime + ' ago'}</Text>
            </View>
          </View>
          <View style={[Styles.MapMarkerTriangle, {borderBottomColor: selected.Email === profile?.Email ? '#def' : Colors.White}]} />
        </Marker>
      }
    </MapView>      
  )
};

export default BroMap;

// https://snazzymaps.com/style/35/avocado-world
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