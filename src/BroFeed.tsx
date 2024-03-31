// this file will render the main flatlist component. I figured it was nontrivial enough to warrant its own file
import React, { useContext, useState, useEffect } from 'react';
import {FlatList, View, Text} from 'react-native';

import StylesObj, { Colors } from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;

import { RootStackParamList, BroContext } from './Stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BroFeedType, NormalToast, UserProfileType } from './FireBaseFunctions';
import { Skeleton } from '@rneui/base';
import { Toast } from 'react-native-toast-notifications';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

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
                Following: [],
                LastBro: Timestamp.now()
            };
            props.navigation.navigate('Brofile', { Profile: DummyProfile });
        }
    };
    const goToMap = () => {
        props.navigation.push('BigHome', {screen: 'BroMap', params: {Bro: props.bro}});
    }
    const timestamp = moment(BroDate.toDate()).local().startOf('seconds').fromNow(true);
    return (
    <View style={Styles.BroContainer}>
        <View style={[Styles.MainBro, {backgroundColor: props.isMyProfile ? '#def' : Colors.White}]}>
            <Text style={Styles.MainBroText}>{BroType}</Text>
            {
                BroLocation &&
                <TouchableOpacity onPress={goToMap}>
                    <View style={Styles.GoToMapButton}>
                        <FontAwesome name="map-marker" size={16} color="black" />
                        <Text style={[Styles.ProfileSlogan, {marginLeft: 2}]}>Map</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
        <TouchableOpacity onPress={navigate}>
        <View style={Styles.MainBroFooter}>
            <Text style={[Styles.MBFooterTxt, {maxWidth: '58%'}]}>{BroName}</Text>
            <Text style={Styles.MBFooterTxt}>{timestamp + ' ago'}</Text>
        </View>
        </TouchableOpacity>
    </View>
    );
};


// Feed of bros
const BroFeed = ({navigation}: {navigation: StackNavigationProp<RootStackParamList>}) => {

    const { profile, broList } = useContext(BroContext);
    const [toastId, setToastId] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!broList && !toastId) {
            setToastId(Toast.show('Loading...', NormalToast));
        }
    }, [broList, toastId]);
    useEffect(() => {
        if (toastId && !loaded) {
            Toast.hide(toastId);
            setLoaded(true);
        }
    }, [broList, loaded]);

    return (
        <View>
        {
            broList ?
            <FlatList
                data={broList}
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