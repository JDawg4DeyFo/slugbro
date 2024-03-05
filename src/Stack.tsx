import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from './Settings'
import Tabs from './Tabs';
import Profile from './Profile';

const Stack = createStackNavigator();

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
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;