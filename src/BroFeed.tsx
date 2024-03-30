// this file will render the main flatlist component. I figured it was nontrivial enough to warrant its own file
import React, { useContext } from 'react';
import {FlatList, View, Text} from 'react-native';

import StylesObj from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;

import { RootStackParamList, BroContext } from './Stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BroItemProps } from './FireBaseFunctions';

// To get some stuff before firebase is setup
const DEBUG_DATA = [
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
    },
]


// Delete this line once firebase is working
const DATA = DEBUG_DATA;

// Bro items


const BroItem = ({User, BroType, BroName, BroDate, navigation}: BroItemProps) => {
    const { profile } = useContext(BroContext);
    const isMyProfile = profile?.Email == User;

    const navigate = () => {

        if (isMyProfile) {
            navigation.navigate('Profile');
        }
        else {
            navigation.navigate('Brofile', {Profile: {BroName, BroDate}})
        }
    };
    return (
    <TouchableOpacity onPress={navigate}>
    <View style={Styles.BroContainer}>
        <View style={Styles.MainBro}>
            <Text style={Styles.MainBroText}>{BroType}</Text>
        </View>
        <View style={Styles.MainBroFooter}>
            <Text style={Styles.MBFooterTxt}>{BroName}</Text>
            <Text style={Styles.MBFooterTxt}>{BroDate}</Text>
        </View>
    </View>
    </TouchableOpacity>
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