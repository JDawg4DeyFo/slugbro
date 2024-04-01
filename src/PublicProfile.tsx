// same idea as profile, but for public to view.
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './Stack';
import { CountUp } from 'use-count-up';

import StylesObj from './Styles';
import { FIREBASE_DB } from './FireBaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserProfileType, getBroRank, openIG } from './FireBaseFunctions';
import moment from 'moment';

const Styles = StylesObj.StylesObj;

// more type stuff
type PublicProfileScreenRouteProp = RouteProp<RootStackParamList, "Brofile">;

const PublicProfile: React.FC<{ route: PublicProfileScreenRouteProp }> = ({ route }: {route: PublicProfileScreenRouteProp}) => {
    // should read UserID from props of route
    const { Profile } = route.params;
    const [profile, setProfile] = useState(Profile);

    useEffect(() => {
        try {
            const profileRef = doc(FIREBASE_DB, 'users', Profile.Email);
            onSnapshot(profileRef, (doc) => {
                setProfile(doc.data() as UserProfileType);
            });
        } catch (error: any) {
            console.error('Unable to find profile: ' + error);
        }
    }, []);

    const [BroRank, setBroRank] = useState(0);
    const [TotalUsers, setTotalUsers] = useState(0);
    useEffect(() => {
        (async () => {
            const rank = await getBroRank(profile.NumBros);
            if (rank) {
                setBroRank(rank.BroRank);
                setTotalUsers(rank.TotalUsers);
            }
        })();
    }, []);

    const CopyIG = async () => {
        // Toast.hideAll();
        // if(Profile.IG != null) {
        //     await Clipboard.setStringAsync(Profile.IG);
        //     Toast.show('Copied To Clipboard', NormalToast);
        // }
        // else {
        //     Toast.show('No IG found');
        // }
    }

    const timestamp = moment(profile.LastBro.toDate()).local().startOf('seconds').fromNow(true);

    return (
        <ScrollView>
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image
                        style={Styles.PH_PFP}
                        source={profile.PFP ? {uri: profile.PFP} : require('../assets/SamplePFP.jpg')}
                    />
                    <View style={Styles.ProfileNameSloganContainer}>
                        <Text style={Styles.PH_Name}>{profile.Name || profile.Email}</Text>
                        <Text style={[Styles.ProfileSlogan, {marginTop: -4, marginBottom: -8}]}>{profile.Slogan ? `"${profile.Slogan}"` : ''}</Text>
                    </View>
                </View>


                {/* {false ?
                    (<TouchableOpacity onPress={UnBro}>
                        <View style={Styles.PH_DestructiveAction}>
                            <Text style={Styles.PH_DestructiveActionText}>Unbro</Text>
                        </View>
                    </TouchableOpacity>) :
                    (<TouchableOpacity onPress={Bro}>
                        <View style={Styles.PH_Action}>
                            <Text style={Styles.PH_ActionText}>Bro</Text>
                        </View>
                    </TouchableOpacity>)} */}

            </View>

            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Major:</Text>
                <Text style={Styles.PH_InfotainerText}>{profile.Major || 'none'}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>College:</Text>
                <Text style={Styles.PH_InfotainerText}>{profile.College || 'none'}</Text>
            </View>
            <TouchableOpacity onPress={() => { if (profile?.IG) openIG(profile.IG); }}>
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                <Text style={Styles.PH_IGText}>{profile.IG || 'none'}</Text>
            </View>
            </TouchableOpacity>
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Bio</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerParagraph}>{profile.Bio}</Text>
            </View>
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Stats</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Bros Sent</Text>
                <Text style={Styles.PH_InfotainerText}><CountUp isCounting end={profile.NumBros} /></Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Last Bro</Text>
                <Text style={Styles.PH_InfotainerText}>{profile?.NumBros ? timestamp + ' ago' : '-'}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Bro Rank</Text>
                <Text style={Styles.PH_InfotainerText}>#{BroRank} out of {TotalUsers}</Text>
            </View>
        </View>

        </ScrollView>
    );
};

export default PublicProfile;