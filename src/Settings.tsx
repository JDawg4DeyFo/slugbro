import React from 'react';
import {Text, View} from 'react-native'

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

const Settings = () => {
    return(
        <View style={Styles.InfoRootContainer}>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>What is this?</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Testing, est thing since wrestling</Text>
            </View>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>What is this?</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Testing, est thing since wrestling</Text>
            </View>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>What is this?</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Testing, est thing since wrestling</Text>
            </View>
        </View>
    );
};

export default Settings;