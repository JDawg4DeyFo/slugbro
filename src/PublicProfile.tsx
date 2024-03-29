// same idea as profile, but for public to view.
import React, {useState} from 'react';
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
// more type stuff
type PublicProfileScreenRouteProp = RouteProp<RootStackParamList, "Brofile">;

// Eventually, I would like to pass a user ID to this component and lookup user data using firebase API or soemthing
// For now, this works.
const PublicProfile: React.FC<{ route: PublicProfileScreenRouteProp }> = ({ route }) => {
    // should read UserID from props of route
    const { Profile } = route.params;

    // NOTE: Should use function from firebasefunctions
    // this will work for now as a visual prototype
    const UnBro = () => {}
    const AddBro = () => {}

    return (
        <View style={Styles.ProfileHeader}>
            <View style={Styles.PH_NamePFPAction}>
                <View style={Styles.PH_PFPName}>
                    <Image
                        style={Styles.PH_PFP}
                        source={require('../assets/SamplePFP.jpg')}
                    />
                    <Text style={Styles.PH_Name}>{Profile.Name}</Text>
                </View>


                {false ?
                    (<TouchableOpacity onPress={UnBro}>
                        <View style={Styles.PH_DestructiveAction}>
                            <Text style={Styles.PH_DestructiveActionText}>Unbro</Text>
                        </View>
                    </TouchableOpacity>) :
                    (<TouchableOpacity onPress={AddBro}>
                        <View style={Styles.PH_Action}>
                            <Text style={Styles.PH_ActionText}>Bro</Text>
                        </View>
                    </TouchableOpacity>)}

            </View>

            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>Major:</Text>
                <Text style={Styles.PH_InfotainerText}>{Profile.Major}</Text>
            </View>
            <View style={Styles.PH_InfotainerRow}>
                <Text style={Styles.PH_InfotainerText}>College:</Text>
                <Text style={Styles.PH_InfotainerText}>{Profile.College}</Text>
            </View>
            <View style={Styles.PH_IGRow}>
                <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                <Text style={Styles.PH_IGText}>{Profile.IG}</Text>
            </View>
        </View>
    );
};

export default PublicProfile;