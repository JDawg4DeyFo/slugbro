// this file will render the main flatlist component. I figured it was nontrivial enough to warrant its own file
import React from 'react';
import {FlatList, View, Text} from 'react-native';

import StylesObj from './Styles'
const Styles = StylesObj.StylesObj;

// To get some stuff before firebase is setup
const DEBUG_DATA = [
    {
        id: '1',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '2',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '3',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '4',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '5',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '6',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '7',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '8',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        id: '9',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
]


// Delete this line once firebase is working
const DATA = DEBUG_DATA;

// Bro items
type BroItemProps = {
    BroType: string,
    BroName: string,
    BroDate: string,    // is this right?? lol
};

const BroItem = ({BroType, BroName, BroDate}: BroItemProps) => {
    return (
    <View style={Styles.BroContainer}>
        <View style={Styles.MainBro}>
            <Text style={Styles.MainBroText}>{BroType}</Text>
        </View>
        <View style={Styles.MainBroFooter}>
            <Text style={Styles.MBFooterTxt}>{BroName}</Text>
            <Text style={Styles.MBFooterTxt}>{BroDate}</Text>
        </View>
    </View>
    );
};


// Feed of bros
const BroFeed = () => {
    return (
        <FlatList
            data={DATA}
            renderItem={({item}) => <BroItem BroType={item.BroType} BroDate={item.BroDate} BroName={item.BroName}/>}
            keyExtractor={item => item.id}  // no idea what this is for
            showsVerticalScrollIndicator={false}
        />
    );
};

export default BroFeed;