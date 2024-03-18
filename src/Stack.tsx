import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from './Settings'
import Tabs from './Tabs';
import Profile from './Profile';
import PublicProfile from './PublicProfile';

const Stack = createStackNavigator();

const PeripheralScreenOptions = {
    headerStyle: {
        backgroundColor:'#FFFFFF',
        borderBottomColor: 'transparent',
        shadowOpacity: 0,
    },
};

export type RootStackParamList = {
    BigHome: undefined;
    Settings: undefined;
    Profile: undefined;
};

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="BigHome"
                component={Tabs}
                options={{ headerShown:false}}
            />
            <Stack.Screen name="Settings" component={Settings} options={PeripheralScreenOptions}/>
            <Stack.Screen name="Profile" component={Profile} options={PeripheralScreenOptions}/>
            <Stack.Screen name="Brofile" component={PublicProfile} options={PeripheralScreenOptions}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;