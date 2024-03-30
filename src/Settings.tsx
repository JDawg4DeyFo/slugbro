import React from 'react';
import {Text, View} from 'react-native'

import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;

const Settings = () => {
    return(
        <View style={Styles.InfoRootContainer}>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>What is this?</Text>
                <Text style={Styles.PH_InfotainerParagraph}>SlugBro is an April fool's app created by Jacob Dennon and Daniel Chang.</Text>
            </View>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>About Jacob</Text>
                <Text style={Styles.PH_InfotainerParagraph}>I'm a second year studying Electrical Engineering. I like soccer, basketball, running, biking, swimming, and reading. I come from Auburn, CA, but I have no idea where I'm gonna go after I graduate.</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Let me know if you wanna do some biking on the mountain gravel roads of San Benito County</Text>
                <Text style={Styles.PH_InfotainerParagraph}>PSA: join clubs! They're good for you and they're good for the community. Imagine if 90% of undergrads were active participants in some club... that would be so cool.</Text>
                <Text style={Styles.PH_InfotainerParagraph}></Text>
            </View>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>About Daniel</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Daniel hasn't add his bio yet.</Text>
            </View>
        </View>
    );
};

export default Settings;