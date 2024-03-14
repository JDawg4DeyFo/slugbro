import React from "react";
import { FlatList, View, Text, Image, ImageSourcePropType, TouchableHighlight } from 'react-native';

import StylesObj from './Styles'
import { TouchableOpacity } from "react-native-gesture-handler";
const Styles = StylesObj.StylesObj;

// Data before server stuff is finished
const PREDEBUG = [
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        Pfp: require('../assets/adaptive-icon.png')
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
};

// Object template to populate flatlist
const EntryItem = ({ Name, Pfp }: EntryItemProps) => {
    return (
        <View style={Styles.LBE_Container}>
            <TouchableOpacity>
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

const BroConnections = () => {
    return (
        <FlatList 
            data={DATA}
            renderItem={({item}) => <EntryItem Name={item.Name} Pfp={item.Pfp}/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator ={false}
        />
    );
};

export default BroConnections;