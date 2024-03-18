import React from "react";
import { FlatList, View, Text, Image, ImageSourcePropType, TouchableHighlight } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Stack';
import { useNavigation } from '@react-navigation/native';

import StylesObj from './Styles';
import { TouchableOpacity } from "react-native-gesture-handler";
const Styles = StylesObj.StylesObj;

// Data before server stuff is finished
const PREDEBUG = [
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),
        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),
        ID: 100,
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png'),

        ID: 100,
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png'),

        ID: 100,
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
    Pfp: ImageSourcePropType,
    ID: number,
};

// Object template to populate flatlist
// NOTE: Should pass in user ID and ask firebase for data
const EntryItem = ({ Name, Pfp, ID }: EntryItemProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={Styles.LBE_Container}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Brofile', {UserID: ID});
            }}>
            <View style={Styles.LBE_NamePFP}>
                <Image style={Styles.LBE_PFP} source={Pfp}/>
                <Text style={Styles.LBE_Name}>{Name}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={Styles.UnbroContainer}>
                    <Text style={Styles.UnbroText}>Unbro</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const BroConnections = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {
    return (
        <FlatList 
            data={DATA}
            renderItem={({item}) => <EntryItem Name={item.Name} Pfp={item.Pfp} ID={item.ID}/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator ={false}
        />
    );
};

export default BroConnections;