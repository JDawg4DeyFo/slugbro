// Main React imports
import {View, Image, Text, TouchableOpacity } from 'react-native';
// Navigation
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from './Stack';
// Style
import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;
// actual feed content
import BroFeed from './BroFeed';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContext } from 'react';
import { BroContext } from './Stack';


const Feed = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {
  const { profile } = useContext(BroContext);

  // Meat of the app
  return (
    <View style={Styles.RootContainer}>
      <View style={Styles.FeedHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={Styles.ProfileContainer}>
          <Image 
          source={profile?.PFP ? {uri: profile.PFP} : require('../assets/SamplePFP.jpg')}
          style={Styles.ProfileIcon}
          />
          <View style={Styles.ProfileNameSloganContainer}>
            <Text style={Styles.ProfileName}>{profile?.Name || 'erm'}</Text>
            <Text style={Styles.ProfileSlogan}>{profile?.Slogan ? `"${profile.Slogan}"` : ''}</Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <Image
            source={require('../assets/settings.png')}
            style={Styles.SettingsIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.FeedContent}>
        <BroFeed navigation={navigation}/>
      </View>
    </View>
  );
}


export default Feed;