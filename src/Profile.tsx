import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { UserSignOut } from './FireBaseFunctions';
import { BroContext } from './Stack';

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const Profile = () => {

    const { user, profile } = useContext(BroContext);

    return (
        <>
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image
                        style={Styles.PH_PFP}
                        source={require('../assets/SamplePFP.jpg')}
                    />
                    <Text style={Styles.PH_Name}>{profile?.Name}</Text>
                </View>

                <TouchableOpacity>
                    <View style={Styles.PH_Action}>
                        <Text style={Styles.PH_ActionText}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Major:</Text>
                <Text style={Styles.PH_InfotainerText}>{profile?.Major ?? 'none'}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>College:</Text>
                <Text style={Styles.PH_InfotainerText}>{profile?.College ?? 'none'}</Text>
            </View>
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                <Text style={Styles.PH_IGText}>{profile?.IG ?? 'none'}</Text>
            </View>
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Bio</Text>
                <TouchableOpacity>
                    <View style={Styles.PH_Action}>
                        <Text style={Styles.PH_ActionText}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={Styles.PH_InfotainerRow}>
            <Text style={Styles.PH_InfotainerParagraph}>{profile?.Bio}</Text>
            </View>
        </View>

        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_Name}>Stats</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Number of bros added (friends)</Text>
                <Text style={Styles.PH_InfotainerText}>{profile?.NumFriends ?? '-'}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Total number of bros sent</Text>
                <Text style={Styles.PH_InfotainerText}>{profile?.NumBros ?? '-'}</Text>
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