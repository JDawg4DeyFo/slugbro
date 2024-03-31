// this file will render the main flatlist component. I figured it was nontrivial enough to warrant its own file
import React, { useContext, useState, useEffect } from 'react';
import {FlatList, View, Text} from 'react-native';

import StylesObj, { Colors } from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;

import { RootStackParamList, BroContext } from './Stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BroFeedType, FeedQuery, FixFeedEntries, GetFeedEntries, UserProfileType } from './FireBaseFunctions';
import { onSnapshot } from 'firebase/firestore';
import { Skeleton } from '@rneui/base';

// Bro items
const BroItem = (props: {bro: BroFeedType, navigation: StackNavigationProp<RootStackParamList>, isMyProfile: boolean}) => {
    const { Email, BroName, BroType, BroDate, BroLocation } = props.bro;
    const navigate = () => {
        if (props.isMyProfile) {
            props.navigation.navigate('Profile');
        }
        else {
            const DummyProfile: UserProfileType = {
                Email,
                PFP: null,
                Name: BroName,
                Slogan: null,
                Major: null,
                College: null,
                IG: null,
                Bio: null,
                NumBros: 0,
                NumFollowing: 0,
                NumFollowers: 0,
                Following: []
            };
            props.navigation.navigate('Brofile', { Profile: DummyProfile });
        }
    };
    return (
    <View style={Styles.BroContainer}>
        <View style={[Styles.MainBro, {backgroundColor: props.isMyProfile ? '#def' : Colors.White}]}>
            <Text style={Styles.MainBroText}>{BroType}</Text>
        </View>
        <TouchableOpacity onPress={navigate}>
        <View style={Styles.MainBroFooter}>
            <Text style={Styles.MBFooterTxt}>{BroName}</Text>
            <Text style={Styles.MBFooterTxt}>{BroDate.toDate().toLocaleString()}</Text>
        </View>
        </TouchableOpacity>
    </View>
    );
};


// Feed of bros
const BroFeed = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {

    const { profile } = useContext(BroContext);

    const [DATA, SetData] = useState<BroFeedType[] | null>(null);
    const [Listen, SetListen] = useState(false);

    useEffect(() => {
        const LoadData = async () => {
            const FeedData = await GetFeedEntries();
            if (!FeedData) return;
            SetData(FeedData);
        }
        LoadData();
    }, []);

    useEffect(() => {
        if(!DATA || Listen) return;
        SetListen(true);
        onSnapshot(FeedQuery, (snapshot) => {
            console.log('Update Feed');
            SetData(FixFeedEntries(snapshot));
        });
    }, [DATA,Listen]);

    return (
        <View>
        {
            DATA ?
            <FlatList
                data={DATA}
                renderItem={({item}) => <BroItem bro={item} navigation={navigation} isMyProfile={!!profile && item.Email === profile.Email} />}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
            :
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 69, marginTop: 12}}>
                <Skeleton width={82} height={12} />
                <Skeleton width={69} height={12} />
                <Skeleton width={82} height={12} />
            </View>
        }
        </View>
    );
};

export default BroFeed;