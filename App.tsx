// Main React imports
import { useCallback } from 'react';
import {Text, View, Image } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Slugbro component imports
import Styles from './src/Styles';

// Display splash untill fonts are loaded
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load in the fonts
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  // NOTE: Right now I'm getting a font error
  // 
  // Kill splash screen when fonts are loaded
  //straight from docs lol
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // hold program until font loads with no error
  if (!fontError && !fontsLoaded) {
    console.log("Font Error");
    return null;
  }

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
