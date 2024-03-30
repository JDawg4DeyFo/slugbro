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


const Feed = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {
  // Meat of the app
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

      <View style={Styles.FeedContent}>
        <BroFeed navigation={navigation}/>
      </View>
    </View>
  );
}


export default Feed;