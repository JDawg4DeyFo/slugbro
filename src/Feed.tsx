// Main React imports
import {View, Image, Text } from 'react-native';

// Slugbro component imports
import Styles from './Styles';
// import Text from './Text';

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
        <Text>Hello2</Text>
      </View>

      <View style={Styles.FeedContent}>
        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

        <View style={Styles.BroContainer}>
            <View style={Styles.MainBro}>
                <Text style={Styles.MainBroText}>Bro</Text>
            </View>
            <View style={Styles.MainBroFooter}>
                <Text style={Styles.MBFooterTxt}>JDawg</Text>
                <Text style={Styles.MBFooterTxt}>4:20</Text>
            </View>
        </View>

      </View>

      <View style={Styles.TabBar}>
        <Text>This is Tabs</Text>
      </View>
    </View>
  );
}


export default Feed;