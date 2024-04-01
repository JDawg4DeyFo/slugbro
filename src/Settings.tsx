import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native'

import StylesObj from './Styles';
import { openIG } from './FireBaseFunctions';
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
                <TouchableOpacity onPress={() => openIG('jacobdennon')}>
                    <View style={Styles.PH_IGRow}>
                        <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                        <Text style={Styles.PH_IGText}>{'jacobdennon'}</Text>
                    </View>                
                </TouchableOpacity>
            </View>
            <View style={Styles.InformationSection}>
                <Text style={Styles.InformationHeader}>About Daniel</Text>
                <Text style={Styles.PH_InfotainerParagraph}>I am a 4th year CS undergrad.</Text>
                <Text style={Styles.PH_InfotainerParagraph}>I am really into running, algorithms, and building apps.</Text>
                <Text style={Styles.PH_InfotainerParagraph}>Clubs I am active in: Cross Country, BluePrint, Competitive Programming.</Text>
                <TouchableOpacity onPress={() => openIG('danielchandg')}>
                    <View style={Styles.PH_IGRow}>
                        <Image style={Styles.PH_IGLogo} source={require('../assets/IGLogo.png')} />
                        <Text style={Styles.PH_IGText}>{'danielchandg'}</Text>
                    </View>                
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settings;