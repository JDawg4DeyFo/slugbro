import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Settings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    );
};

export default Settings;