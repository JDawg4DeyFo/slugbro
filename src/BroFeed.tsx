// this file will render the main flatlist component. I figured it was nontrivial enough to warrant its own file
import React, { useContext } from 'react';
import {FlatList, View, Text} from 'react-native';

import StylesObj from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;

import { RootStackParamList, BroContext } from './Stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BroItemProps, GetUserData, UserProfileType } from './FireBaseFunctions';

// To get some stuff before firebase is setup
const DEBUG_DATA = [
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '1',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '2',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '3',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '4',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '5',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '6',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '7',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '8',
    },
    {
        user: 'jdennon@ucsc.edu',
        BroType: 'Bro',
        BroName: 'JDawg',
        BroDate: '4:20PM',   // should use some time format
        id: '9',
    },
]


// Delete this line once firebase is working
const DATA = DEBUG_DATA;

// Bro items


const BroItem = ({User, BroType, BroName, BroDate, navigation}: BroItemProps) => {
    let ProfileData: UserProfileType;
    const { profile } = useContext(BroContext);
    const isMyProfile = profile?.Email == User;

    const navigate = async (): Promise<void> => {

        if (isMyProfile) {
            navigation.navigate('Profile');
        }
        else {
            GetUserData(User).then((ProfileData) => {
                if(ProfileData != null) {
                    navigation.navigate('Brofile', {Profile: ProfileData})
                }
                else {
                    console.log("profile data doesn't exist");
                }
            });
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
const BroFeed = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {
    return (
        <FlatList
            data={DATA}
            renderItem={({item}) => <BroItem User={item.user}BroType={item.BroType} BroDate={item.BroDate} BroName={item.BroName} navigation={navigation} id={item.id}/>}
            keyExtractor={item => item.id}  // no idea what this is for
            showsVerticalScrollIndicator={false}
        />
    );
};

export default BroFeed;