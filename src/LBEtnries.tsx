import React from "react";
import { FlatList, View, Text, Image, ImageSourcePropType } from 'react-native';

import StylesObj from './Styles'
const Styles = StylesObj.StylesObj;

// Data before server stuff is finished
const PREDEBUG = [
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
        Pfp: require('../assets/adaptive-icon.png')
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 38103,
        Pfp: require('../assets/SamplePFP.jpg')
    },
    {
        id: 1,
        Name: 'LolFactor',
        TotalBros: 1231,
        Pfp: require('../assets/home.png')
    },
    {
        id: 1,
        Name: 'jaaaa',
        TotalBros: 517,
        Pfp: require('../assets/splash.png')
    },
    {
        id: 1,
        Name: 'Poopface',
        TotalBros: 420,
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
    TotalBros: number,
    Pfp: ImageSourcePropType,
};

// Object template to populate flatlist
const EntryItem = ({ Name, TotalBros, Pfp }: EntryItemProps) => {
    return (
        <View style={Styles.LBE_Container}>
            <View style={Styles.LBE_NamePFP}>
                <Image style={Styles.LBE_PFP} source={Pfp}/>
                <Text style={Styles.LBE_Name}>{Name}</Text>
            </View>
            <Text style={Styles.LBE_BrosSent}>{TotalBros} Bros</Text>
        </View>
    );
};

const LBEntries = () => {
    return (
        <FlatList 
            data={DATA}
            renderItem={({item}) => <EntryItem Name={item.Name} TotalBros={item.TotalBros} Pfp={item.Pfp}/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator ={false}
        />
    );
};

export default LBEntries;