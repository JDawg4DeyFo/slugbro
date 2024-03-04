import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feed from './Feed';
import Colors from './Styles'


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarActiveTintColor:  Colors.Colors.MainPrimary,
            }}
        >

        </Tab.Navigator>
    );
}

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