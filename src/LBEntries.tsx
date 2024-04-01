import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, Text, Image } from 'react-native';

import StylesObj from './Styles'
import { TouchableOpacity } from "react-native-gesture-handler";
import { LBQuery, UserProfileType, fixLBEntries, getLBEntries } from "./FireBaseFunctions";
import { Skeleton } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BroContext } from './Stack';
import { onSnapshot } from "firebase/firestore";
const Styles = StylesObj.StylesObj;

// Object template to populate flatlist
const EntryItem = (props: {profile: UserProfileType, navigation: StackNavigationProp<RootStackParamList>, isMyProfile: boolean, index: number}) => {
    const { Name, Email, Slogan, PFP, NumBros } = props.profile;
    const navigate = () => {
        if (props.isMyProfile) {
            props.navigation.navigate('Profile');
        }
        else {
            props.navigation.navigate('Brofile', { Profile: props.profile });
        }
    };
    return (
        <View style={[Styles.LBE_Container, {backgroundColor: props.isMyProfile ? '#def' : undefined}]}>
            <TouchableOpacity style={{height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={navigate}>
            <View style={Styles.LBE_NamePFP}>
                <Text style={[Styles.LBE_Name, {marginLeft: -4, marginRight: 18}]}>{props.index}</Text>
                <Image style={Styles.LBE_PFP} source={PFP ? {uri: PFP} : require('../assets/SamplePFP.jpg')} />
                {
                    Slogan ?
                    <View style={Styles.ProfileNameSloganContainer}>
                        <Text style={Styles.LBE_Name}>{Name || Email}</Text>
                        <Text style={Styles.ProfileSlogan}>"{Slogan}"</Text>
                    </View>
                    :
                    <Text style={Styles.LBE_Name}>{Name || Email}</Text>
                }
            </View>
            </TouchableOpacity>
            <Text style={Styles.LBE_BrosSent}>{NumBros} Bros</Text>
        </View>
    );
};

const LBEntries = (props: {navigation: StackNavigationProp<RootStackParamList>}) => {

    const { profile } = useContext(BroContext);

    const [data, setData] = useState<UserProfileType[] | null>(null);
    const [listen, setListen] = useState(false);

    useEffect(() => {
        const loadLB = async () => {
            const LB = await getLBEntries();
            if (!LB) return;
            setData(LB);
        };
        loadLB();
    }, []);

    useEffect(() => {
        if (!data || listen) return;
        setListen(true);
        onSnapshot(LBQuery, (snapshot) => {
            console.log('update LB');
            setData(fixLBEntries(snapshot));
        });
    }, [data, listen]);

    return (
        <View>
        {
            data ?
            <FlatList 
                data={data}
                renderItem={({item, index}) => <EntryItem profile={item} navigation={props.navigation} isMyProfile={!!profile && item.Email === profile.Email} index={index+1} />}
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

export default LBEntries;