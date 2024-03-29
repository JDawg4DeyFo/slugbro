import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image } from 'react-native';

import StylesObj from './Styles'
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserProfileType, getLBEntries } from "./FireBaseFunctions";
import { Skeleton } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Stack';
const Styles = StylesObj.StylesObj;

// Object template to populate flatlist
const EntryItem = (props: {profile: UserProfileType, navigation: StackNavigationProp<RootStackParamList>}) => {
    const { Name, Slogan, PFP, NumBros } = props.profile;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Brofile', { Profile: props.profile })}>
        <View style={Styles.LBE_Container}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Brofile', { Profile: props.profile })}>
            <View style={Styles.LBE_NamePFP}>
                <Image style={Styles.LBE_PFP} source={PFP ? {uri: PFP} : require('../assets/SamplePFP.jpg')} />
                {
                    Slogan ?
                    <View style={Styles.ProfileNameSloganContainer}>
                        <Text style={Styles.LBE_Name}>{Name || 'none'}</Text>
                        <Text style={Styles.ProfileSlogan}>"{Slogan}"</Text>
                    </View>
                    :
                    <Text style={Styles.LBE_Name}>{Name}</Text>
                }
            </View>
            </TouchableOpacity>
            <Text style={Styles.LBE_BrosSent}>{NumBros} Bros</Text>
        </View>
        </TouchableOpacity>
    );
};

const LBEntries = (props: {navigation: StackNavigationProp<RootStackParamList>}) => {

    const [data, setData] = useState<UserProfileType[] | null>(null);

    useEffect(() => {
        const loadLB = async () => {
            const LB = await getLBEntries();
            if (LB) setData(LB);
        };
        loadLB();
    }, []);

    return (
        <View>
        {
            data ?
            <FlatList 
                data={data}
                renderItem={({item}) => <EntryItem profile={item} navigation={props.navigation} />}
                keyExtractor={item => item.Email}
                showsVerticalScrollIndicator={false}
            />
            :
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 69, marginTop: 6}}>
                <Skeleton width={82} height={12} />
                <Skeleton width={69} height={12} />
                <Skeleton width={82} height={12} />
            </View>
        }
        </View>
    );
};

export default LBEntries;