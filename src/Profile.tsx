import React, { useState, useEffect, useContext } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { UserSignOut, UserUpdateProfile, UserUpdateBio, UserUpdatePFP, getBroRank, openIG } from './FireBaseFunctions';
import { BroContext } from './Stack';
import { CountUp } from 'use-count-up';
import { FontAwesome } from '@expo/vector-icons';
import { pickMedia } from './PickMediaFromLibrary';
import { ImagePickerAsset } from 'expo-image-picker';
// import * as Clipboard from 'expo-clipboard'

import StylesObj, { Colors } from './Styles';
import { Switch } from 'react-native-gesture-handler';
import moment from 'moment';
const Styles = StylesObj.StylesObj;

// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const Profile = () => {

    const { profile, location, setLocation } = useContext(BroContext);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [localProfile, setLocalProfile] = useState({
        Name: '',
        Slogan: '',
        Major: '',
        College: '',
        IG: ''
    });
    const [localPFP, setLocalPFP] = useState<ImagePickerAsset | string | null>(null);
    const [localBio, setLocalBio] = useState('');
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [BroRank, setBroRank] = useState(0);
    const [TotalUsers, setTotalUsers] = useState(0);

    useEffect(() => setFlag(true), [isEditingBio, isEditingProfile]);

    useEffect(() => {
        setLocalProfile({
            Name: profile?.Name || '',
            Slogan: profile?.Slogan || '',
            Major: profile?.Major || '',
            College: profile?.College || '',
            IG: profile?.IG || ''
        });
        setLocalBio(profile?.Bio || '');
        setLocalPFP(profile?.PFP || null);
        setLoading(false);

        (async () => {
            const rank = await getBroRank(profile?.NumBros || 0);
            if (rank) {
                setBroRank(rank.BroRank);
                setTotalUsers(rank.TotalUsers);
            }
        })();

    }, [profile]);

    useEffect(() => {
        if (loading) return;
        if (isEditingProfile) return;
        if (!profile?.Email) return;
        if (!flag) return;
        setFlag(false);
        const remoteProfile = {
            Name: profile.Name,
            Slogan: profile.Slogan,
            Major: profile.Major,
            College: profile.College,
            IG: profile.IG
        }

        const updateProfile = async () => {
            const MX = 30;
            const maxLength30 = {
                Name: localProfile.Name.substring(0, MX),
                Slogan: localProfile.Slogan.substring(0, MX),
                Major: localProfile.Major.substring(0, MX),
                College: localProfile.College.substring(0, MX),
                IG: localProfile.IG.substring(0, MX)
            };
            if (JSON.stringify(maxLength30) !== JSON.stringify(remoteProfile)) {
                await UserUpdateProfile(profile.Email, maxLength30);
            }
            if (localPFP && typeof localPFP === 'object') {
                await UserUpdatePFP(profile.Email, localPFP);
            }
        };

        updateProfile();
        
    }, [isEditingProfile, profile, loading]);

    useEffect(() => {
        if (loading) return;
        if (isEditingBio) return;
        if (!profile?.Email) return;
        if (JSON.stringify(localBio) === JSON.stringify(profile.Bio)) return;
        if (!flag) return;
        setFlag(false);
        UserUpdateBio(profile.Email, localBio);
    }, [isEditingBio, profile, loading]);

    const handlePickPFP = async () => {
        const imageURI = await pickMedia();
        setLocalPFP(imageURI);
        console.log('imageURI ' + JSON.stringify(imageURI));
    };

    const timestamp = profile ? moment(profile.LastBro.toDate()).local().startOf('seconds').fromNow(true) : '-';

    return (
        <ScrollView>
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    {
                        isEditingProfile ?
                        <TouchableOpacity onPress={handlePickPFP}>
                            {
                                localPFP && typeof localPFP === 'object' ?
                                <Image
                                    style={Styles.PH_PFP}
                                    source={localPFP}
                                />
                                :
                                <View style={[Styles.PH_PFP, {borderColor: 'lightgray', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                    <FontAwesome name="camera" size={24} color="black" />
                                </View>
                            }
                        </TouchableOpacity>
                        :
                        <Image
                            style={Styles.PH_PFP}
                            source={typeof localPFP === 'string' ? {uri: localPFP} : require('../assets/SamplePFP.jpg')}
                        />
                    }
                    <View style={Styles.ProfileNameSloganContainer}>
                        {
                            isEditingProfile ?
                            <TextInput
                                style={[Styles.PH_EditText, Styles.PH_Name, {marginBottom: 4}]}
                                value={localProfile.Name}
                                onChangeText={(a) => setLocalProfile({...localProfile, Name: a})}
                                placeholder='name'
                            />
                            :
                            <Text style={Styles.PH_Name}>{profile?.Name || profile?.Email}</Text>
                        }
                        {
                            isEditingProfile ?
                            <TextInput
                                style={[Styles.PH_EditText, Styles.ProfileSlogan, {height: 20}]}
                                value={localProfile.Slogan}
                                onChangeText={(a) => setLocalProfile({...localProfile, Slogan: a})}
                                placeholder='slogan'
                            />
                            :
                            <Text style={[Styles.ProfileSlogan, {marginTop: -4, marginBottom: -8}]}>{profile?.Slogan ? `"${profile.Slogan}"` : ''}</Text>
                        }
                    </View>
                </View>

                <TouchableOpacity onPress={() => setIsEditingProfile(!isEditingProfile)}>
                    <View style={[Styles.PH_Action, {borderColor: isEditingProfile ? Colors.MainGreen : Colors.MainPrimary}]}>
                        <Text style={[Styles.PH_ActionText, {color: isEditingProfile ? Colors.MainGreen : Colors.MainPrimary}]}>{isEditingProfile ? 'Save' : 'Edit'}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Major:</Text>
                {
                    isEditingProfile ?
                    <TextInput
                        style={[Styles.PH_EditText, Styles.PH_InfotainerText]}
                        value={localProfile.Major}
                        onChangeText={(a) => setLocalProfile({...localProfile, Major: a})}
                    />
                    :
                    <Text style={Styles.PH_InfotainerText}>{profile?.Major || 'none'}</Text>
                }
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>College:</Text>
                {
                    isEditingProfile ?
                    <TextInput
                        style={[Styles.PH_EditText, Styles.PH_InfotainerText]}
                        value={localProfile.College}
                        onChangeText={(a) => setLocalProfile({...localProfile, College: a})}
                    />
                    :
                    <Text style={Styles.PH_InfotainerText}>{profile?.College || 'none'}</Text>
                }
            </View>
            
            {isEditingProfile ? 
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                <TextInput
                        style={[Styles.PH_EditText, Styles.PH_IGText]}
                        value={localProfile.IG}
                        onChangeText={(a) => setLocalProfile({...localProfile, IG: a})}
                />
            </View>
            :
            <TouchableOpacity onPress={() => { if (profile?.IG) openIG(profile.IG); }}>
                <View style={Styles.PH_IGRow}>
                    <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                    <Text style={Styles.PH_IGText}>{profile?.IG || 'none'}</Text>
                </View>                
            </TouchableOpacity>
            }
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Bio</Text>
                <TouchableOpacity onPress={() => setIsEditingBio(!isEditingBio)}>
                    <View style={[Styles.PH_Action, {borderColor: isEditingBio ? Colors.MainGreen : Colors.MainPrimary}]}>
                        <Text style={[Styles.PH_ActionText, {color: isEditingBio ? Colors.MainGreen : Colors.MainPrimary}]}>{isEditingBio ? 'Save' : 'Edit'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={Styles.PH_InfotainerRow}>
            {
                isEditingBio ?
                <TextInput
                    style={[Styles.PH_EditText, Styles.PH_InfotainerParagraph, {marginBottom: 2}]}
                    value={localBio}
                    onChangeText={(a) => setLocalBio(a)}
                    multiline
                    placeholder="Confess your sins"
                />
                :
                <Text style={Styles.PH_InfotainerParagraph}>{profile?.Bio}</Text>
            }
            </View>
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Stats</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Bros Sent</Text>
                <Text style={Styles.PH_InfotainerText}><CountUp isCounting end={profile?.NumBros || 0} /></Text>
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

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Location enabled</Text>
                <Switch
                    value={location}
                    onValueChange={setLocation}
                    trackColor={{true: Colors.MainPrimary}}
                    thumbColor={location ? Colors.MainPrimary : undefined}
                />
            </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 6, marginBottom: 6}}>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={UserSignOut}>
                <View style={Styles.PH_Action}>
                    <Text style={Styles.PH_ActionText}>Sign out</Text>
                </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

export default Profile;