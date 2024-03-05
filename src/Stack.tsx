import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from './Settings'

const Stack = createStackNavigator();

export type RootStackParamList = {
    Settings: undefined;
};

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;