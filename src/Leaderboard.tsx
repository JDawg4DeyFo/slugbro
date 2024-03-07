import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

import Settings from './Settings';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Stack';


// Data before server stuff is finished
const PREDEBUG = [
    {
        id: 1,
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },

]
const DEBUG_DATA = PREDEBUG.map((item, index) => ({
    ...item,
    id: index.toString(),
}));
const DATA = DEBUG_DATA;


// Props of flatlist items
type EntryItemProps = {
    Name: string,
    TotalBros: number,
    Pfp: string,
};

// Object template to populate flatlist
const EntryItem = ({ Name, TotalBros, Pfp }: EntryItemProps) => {

}

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


      
    </View>
    )
};

export default Leaderboard;