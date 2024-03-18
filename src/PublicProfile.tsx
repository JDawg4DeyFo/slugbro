// same idea as profile, but for public to view.
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './Stack';

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

// for debugging w/out firebase - no bro
const DEBUG_DATA1 = {
    Name: 'JDawg',
    College: 'Cowell',
    Major: 'Electrical Engineering',
    IG: 'jacobdennon',  // should add bool to check for IG
    isBro: false,
};
const DEBUG_DATA2 = {   // is bro
    Name: 'JDawg',
    College: 'Cowell',
    Major: 'Electrical Engineering',
    IG: 'jacobdennon',  // should add bool to check for IG
    isBro: true,
};

// need this lol
interface UserProfileDataProps {
    Name: string,
    College: string,
    Major: string,
    IG: string,
    isBro: boolean,
};

// more type stuff
type PublicProfileScreenRouteProp = RouteProp<RootStackParamList, 'Brofile'>;

// Retrieve user data from ID.... replace when firebase works
function RetrieveUserData(UserID: number): UserProfileDataProps {
    let USER_PROFILE_DATA: UserProfileDataProps;

    // lookup on firebase... if we had it
    
    // Instead do this
    if (UserID == 100) {
        USER_PROFILE_DATA = DEBUG_DATA2;
    } else {
        USER_PROFILE_DATA = DEBUG_DATA1;
    }

    // Return values
    return USER_PROFILE_DATA;
}


// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const PublicProfile: React.FC<{ route: PublicProfileScreenRouteProp }> = ({ route }) => {
    // should read UserID from props of route
    const {UserID} = route.params;
    const UserData = RetrieveUserData(UserID);

    return (
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image
                        style={Styles.PH_PFP}
                        source={require('../assets/SamplePFP.jpg')}
                    />
                    <Text style={Styles.PH_Name}>{UserData.Name}</Text>
                </View>

                <TouchableOpacity>
                    {UserData.isBro ? 
                    (<View style={Styles.PH_DestructiveAction}>
                        <Text style={Styles.PH_DestructiveActionText}>Bro</Text>
                    </View>) :
                    (<View style={Styles.PH_Action}>
                        <Text style={Styles.PH_ActionText}>Bro</Text>
                    </View>)}
                </TouchableOpacity>
            </View>

            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Major:</Text>
                <Text style={Styles.PH_InfotainerText}>{UserData.Major}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>College:</Text>
                <Text style={Styles.PH_InfotainerText}>{UserData.College}</Text>
            </View>
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                <Text style={Styles.PH_IGText}>{UserData.IG}</Text>
            </View>
        </View>
    );
};

export default PublicProfile;