import React, { useContext, useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Toast } from "react-native-toast-notifications";
import { NormalToast, ErrorToast, SendBro, BroFeedType } from './FireBaseFunctions';

import Feed from './Feed';
import Leaderboard from './Leaderboard';
import Bros from './Bros';
import Colors from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BroContext } from './Stack';

import StylesObj from './Styles';
import { Timestamp } from 'firebase/firestore';
const Styles = StylesObj.StylesObj;


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { profile } = useContext(BroContext);

    const [isBroing, setIsBroing] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const Bro = async () => {
        if (isBroing || cooldown > 0) return;
        setCooldown(3);
        setIsBroing(true);
        Toast.hideAll();

        if (!profile?.Email) {
            Toast.show('Wait for your profile to load first', ErrorToast);
            return;
        }

        const BroItem: BroFeedType = {
            Email: profile.Email,
            BroName: profile?.Name || profile.Email,
            BroType: 'Bro',
            BroDate: Timestamp.now()
        }

        await SendBro(profile, BroItem);
        setIsBroing(false);
    }

    useEffect(() => {
        if (cooldown <= 0) return;
        const countdown = setInterval(() => {
            if (cooldown > 0) setCooldown(cooldown - 1);
            if (cooldown <= 0) clearInterval(countdown);
        }, 1000);
        return () => clearInterval(countdown);
    }, [cooldown]);


    return (
        <>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions = {{
                tabBarActiveTintColor:  Colors.Colors.MainPrimary,
                tabBarActiveBackgroundColor: Colors.Colors.Grey4,
                tabBarInactiveBackgroundColor: Colors.Colors.Grey4,

                tabBarLabelStyle: {
                    fontFamily: 'Inter-Medium',
                },

                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Leaderboard"
                component={Leaderboard}

                options={{
                    title: "Leaderboard",

                    tabBarIcon: ({ focused }: {focused: boolean}) => (
                        <MaterialIcons name="leaderboard" size={24} color={focused ? 'black' : 'gray'} />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={Feed}
                options={{
                    title: "Home",

                    tabBarIcon: ({ focused }: {focused: boolean}) => (
                        <Entypo name="home" size={24} color={focused ? 'black' : 'gray'} />
                    )
                }}
            />
            <Tab.Screen
                name="Bros"
                component={Bros}
                options={{
                    title: "Bros",

                    tabBarIcon: ({ focused }: {focused: boolean}) => (
                        <FontAwesome5 name="user-friends" size={24} color={focused ? 'black' : 'gray'} />
                    )
                }}
            />
        </Tab.Navigator>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <View style={isBroing || cooldown > 0 ? Styles.DisabledBroButton : Styles.BroButton}>
                <TouchableOpacity disabled={isBroing || cooldown > 0} onPress={Bro} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={Styles.BroText}>{!isBroing && cooldown <= 0 ? 'Bro' : cooldown}</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
};

export default Tabs;

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Image } from 'react-native';

// // Screens
// import Home from './home';
// import Login from './login';
// import Food from './food';
// import Leaderboard from './leaderboard';

// // style library
// import styles from './styles';

// const Tab = createBottomTabNavigator();

// const PlateTab = () => {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={{
// 				tabBarActiveTintColor: '#000000',
// 				tabBarInactiveTintColor: '#FFFFFF',
// 				tabBarActiveBackgroundColor: '#333333',
// 				tabBarInactiveBackgroundColor: '#222222',

// 				headerShown: false,
// 			}}
// 		>
// 			<Tab.Screen
// 				name="Home"
// 				component={Home}
// 				options={{ 
// 					title: 'Home',

// 					tabBarIcon: () => (
// 						<Image
// 							source = {require('./assets/home.png')}
// 							style={{width: 30, height: 30}}
// 						/>
// 					), 
			
// 				}}
// 			/>
// 			<Tab.Screen
// 				name="Food"
// 				component={Food}
// 				options={{ 
// 					title: 'Food',

// 					tabBarIcon: () => (
// 						<Image
// 							source = {require('./assets/restaurant.png')}
// 							style={{width: 30, height: 30}}
// 						/>
// 					), 
			
// 				}}
// 			/>
// 			<Tab.Screen
// 				name="Leaderboard"
// 				component={Leaderboard}
// 				options={{ 
// 					title: 'Leaderboard',
// 					tabBarIcon: () => (
// 						<Image
// 							source = {require('./assets/leaderboard.png')}
// 							style={{width: 30, height: 30}}
// 						/>
// 					), 
// 				}}
// 			/>				
// 		</Tab.Navigator>
// 	);
// };

// export default PlateTab;