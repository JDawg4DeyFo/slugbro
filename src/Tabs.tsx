import React from 'react';
import { Image, Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';

import Feed from './Feed';
import Leaderboard from './Leaderboard';
import Bros from './Bros';
import Colors from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import StylesObj from './Styles';
const Styles = StylesObj.StylesObj;


const Tab = createBottomTabNavigator();

const Tabs = () => {
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
            <View style={Styles.BroButton}>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={Styles.BroText}>Bro</Text>
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