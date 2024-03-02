import {StyleSheet} from 'react-native';
// NOTE: Rem units assume 16px root font size.


// Color Variables
const DarkestGrey = '#21252A';


const Styles = StyleSheet.create({
    // CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER CONTAINER
    // Container backgrounds: Profile Icon, bro container in feed
    MainContainer: {
        flex: 100,
    },


    // TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
    // 3Rem text
    Size3Text: {
        fontSize: 48    // NOTE: I would prefer to use REM, but that's not supported.
    },

    // For main text of container
    DarkText: {
        color: DarkestGrey,
    },

});

export default Styles;

