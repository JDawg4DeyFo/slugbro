import React, { useState, useEffect, useContext } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { UserSignOut } from './FireBaseFunctions';
import { BroContext } from './Stack';
import { CountUp } from 'use-count-up';

import StylesObj, { Colors } from './Styles';
const Styles = StylesObj.StylesObj;

// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const Profile = () => {

    const { user, profile } = useContext(BroContext);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [localProfile, setLocalProfile] = useState({
        Name: '',
        Slogan: '',
        Major: '',
        College: '',
        IG: ''
    });
    const [localBio, setLocalBio] = useState('');
    useEffect(() => {
        setLocalProfile({
            Name: profile?.Name || '',
            Slogan: profile?.Slogan || '',
            Major: profile?.Major || '',
            College: profile?.College || '',
            IG: profile?.IG || ''
        });
        setLocalBio(profile?.Bio || '');
    }, [profile]);

    return (
        <>
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image
                        style={Styles.PH_PFP}
                        source={require('../assets/SamplePFP.jpg')}
                    />
                    <View style={Styles.ProfileNameSloganContainer}>
                        {
                            isEditingProfile ?
                            <TextInput
                                style={[Styles.PH_EditText, Styles.PH_Name]}
                                value={localProfile.Name}
                                onChangeText={(a) => setLocalProfile({...localProfile, Name: a})}
                            />
                            :
                            <Text style={Styles.PH_Name}>{profile?.Name || 'none'}</Text>
                        }
                        {
                            isEditingProfile ?
                            <TextInput
                                style={[Styles.PH_EditText, Styles.ProfileSlogan, {height: 20}]}
                                value={localProfile.Slogan}
                                onChangeText={(a) => setLocalProfile({...localProfile, Slogan: a})}
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
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                {
                    isEditingProfile ?
                    <TextInput
                        style={[Styles.PH_EditText, Styles.PH_IGText]}
                        value={localProfile.IG}
                        onChangeText={(a) => setLocalProfile({...localProfile, IG: a})}
                    />
                    :
                    <Text style={Styles.PH_IGText}>{profile?.IG || 'none'}</Text>
                }
            </View>
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
                <Text style={Styles.PH_InfotainerText}>Total number of bros sent</Text>
                <Text style={Styles.PH_InfotainerText}><CountUp isCounting end={profile?.NumBros || 0} /></Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Number of bros following you</Text>
                <Text style={Styles.PH_InfotainerText}><CountUp isCounting end={profile?.NumFollowers || 0} /></Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Number of bros you follow</Text>
                <Text style={Styles.PH_InfotainerText}><CountUp isCounting end={profile?.NumFollowing || 0} /></Text>
            </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 6}}>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={UserSignOut}>
                <View style={Styles.PH_Action}>
                    <Text style={Styles.PH_ActionText}>Sign out</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    );
};

export default Profile;