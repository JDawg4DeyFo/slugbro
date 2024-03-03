// Main React imports
import {View, Image } from 'react-native';

// Slugbro component imports
import Styles from './src/Styles';
import Text from './src/Text';

export default function App() {

  // Meat of the app
  return (
    <View style={Styles.RootContainer}>
      <View style={Styles.FeedHeader}>
        <View style={Styles.ProfileContainer}>
          <Image 
          source={require('./assets/SamplePFP.jpg')}
          style={Styles.ProfileIcon}
          />
          <View style={Styles.ProfileNameSloganContainer}>
            <Text style={Styles.ProfileName}>JDawg</Text>
            <Text style={Styles.ProfileSlogan}>"Born2Bro"</Text>
          </View>
        </View>
        <Text>Hello2</Text>
      </View>

      <View style={Styles.FeedContent}>
        <Text> This is main content</Text>
      </View>

      <View style={Styles.TabBar}>
        <Text>This is Tabs</Text>
      </View>
    </View>
  );
}
