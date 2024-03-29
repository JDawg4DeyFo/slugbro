import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BroContext } from './Stack';
import BroConnections from './BroConnections';

const Bros = ({navigation}: {navigation:StackNavigationProp<RootStackParamList>}) => {

  const { profile } = useContext(BroContext);

    return(
        <View style={Styles.RootContainer}>
      <View style={Styles.FeedHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={Styles.ProfileContainer}>
          <Image 
          source={profile?.PFP ? {uri: profile.PFP} : require('../assets/SamplePFP.jpg')}
          style={Styles.ProfileIcon}
          />
          <View style={Styles.ProfileNameSloganContainer}>
            <Text style={Styles.ProfileName}>{profile?.Name || 'none'}</Text>
            <Text style={Styles.ProfileSlogan}>{profile?.Slogan ? `"${profile.Slogan}"` : ''}</Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../assets/settings.png')}
            style={Styles.SettingsIcon}
          />
        </TouchableOpacity>
      </View>

        <View style={Styles.LBContainer}>
            <Text style={Styles.LBTitle}>Bros</Text>
            <View style={Styles.LBHeader}>
                <Text style={Styles.LBHeadText}>Your Bros</Text>
                <Text style={Styles.LBHeadText}>XX Total Bros</Text>
            </View>
            <BroConnections/>
        </View>
      
    </View>
)};

export default Bros;