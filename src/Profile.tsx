import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native'

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

// for debugging w/out firebase
const DEBUG_DATA = {
    Name: 'JDawg',
    College: 'Cowell',
    Major: 'ElectricalEngineering',
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
                <Image 
                    style={Styles.PH_PFP}
                    source={require('../assets/SamplePFP.jpg')}
                />
                <View style={Styles.PH_ActionNameContainer}>
                    <Text style={Styles.PH_Name}>{USER_PROFILE_DATA.Name}</Text>
                    <TouchableOpacity>
                        <View style={Styles.PH_Action}>
                            <Text style={Styles.PH_ActionText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.PH_Infotainer}>
                
            </View>
        </View>
    );
};

export default Profile;