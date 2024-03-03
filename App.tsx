// Main React imports
import {Text, View } from 'react-native';

// Slugbro component imports
import Styles from './src/Styles';

export default function App() {
  return (
    <View style={Styles.RootContainer}>
      <View style={Styles.HomeHeader}>
        <Text>Hello</Text>
        <Text>Hello2</Text>
      </View>
    </View>
  );
}
