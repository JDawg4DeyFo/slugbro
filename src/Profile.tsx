import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native'

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

// for debugging w/out firebase
const DEBUG_DATA = {
    Name: 'JDawg',
    College: 'Cowell',
    Major: 'Electrical Engineering',
    IG: 'jacobdennon',
};
const USER_PROFILE_DATA = DEBUG_DATA;

type UserProfileDataProps = {
    Name: string,
    Colelge: string,
    Major: string,
    IG: string,
};

// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const Profile = () => {
    return(
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image 
                        style={Styles.PH_PFP}
                        source={require('../assets/SamplePFP.jpg')}
                    />
                    <Text style={Styles.PH_Name}>{USER_PROFILE_DATA.Name}</Text>
                </View>

                <TouchableOpacity>
                    <View style={Styles.PH_Action}>
                        <Text style={Styles.PH_ActionText}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={Styles.PH_Infotainer}>
                <View style={Styles.PH_IGRow}>
                    <Text style={Styles.PH_InfotainerText}>Major:</Text>
                    <Text style={Styles.PH_InfotainerText}>{USER_PROFILE_DATA.Major}</Text>
                </View>
                <View style={Styles.PH_IGRow}>
                    <Text style={Styles.PH_InfotainerText}>College:</Text>
                    <Text style={Styles.PH_InfotainerText}>{USER_PROFILE_DATA.College}</Text>
                </View>
                <View style={Styles.PH_IGRow}>
                    <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')}/>
                    <Text style={Styles.PH_IGText}>{USER_PROFILE_DATA.IG}</Text>
                </View>
            </View>
        </View>
    );
};

export default Profile;