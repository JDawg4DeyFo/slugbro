import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Stack';
import LBEntries from './LBEtnries';


const Leaderboard = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {
    return (
        <View style={Styles.RootContainer}>
      <View style={Styles.FeedHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={Styles.ProfileContainer}>
          <Image 
          source={require('../assets/SamplePFP.jpg')}
          style={Styles.ProfileIcon}
          />
          <View style={Styles.ProfileNameSloganContainer}>
            <Text style={Styles.ProfileName}>JDawg</Text>
            <Text style={Styles.ProfileSlogan}>"Born2Bro"</Text>
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

        <LBEntries/>
      
    </View>
    )
};

export default Leaderboard;