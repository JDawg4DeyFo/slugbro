// Main React imports
import {View, Image, Text } from 'react-native';
// Style
import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;
// actual feed content
import BroFeed from './BroFeed';

const Feed = () => {
  // Meat of the app
  return (
    <View style={Styles.RootContainer}>
      <View style={Styles.FeedHeader}>
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
        <Image
          source={require('../assets/settings.png')}
          style={Styles.SettingsIcon}
        />
      </View>

      <View style={Styles.FeedContent}>
        <BroFeed/>
      </View>

      <View style={Styles.TabBar}>
        
      </View>
    </View>
  );
}


export default Feed;