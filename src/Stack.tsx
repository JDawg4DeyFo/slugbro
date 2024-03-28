import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from './Settings'
import Tabs from './Tabs';
import Profile from './Profile';
import PublicProfile from './PublicProfile';
import Login from './Login';

import { FIREBASE_AUTH } from './FireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

const Auth = FIREBASE_AUTH;

const Stack = createStackNavigator();

const PeripheralScreenOptions = {
    headerStyle: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'transparent',
        shadowOpacity: 0,
    },
};

export type RootStackParamList = {
    BigHome: undefined;
    Settings: undefined;
    Profile: undefined;
    Brofile: { UserID: number };
};

const StackNavigator = () => {
    // Firebase user state setup
    const [user, Setuser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            // console.log('user', user);
            Setuser(user);
        });
    }, []);

    return (
        <Stack.Navigator>
            {user ? (
                <>
                <Stack.Screen
                name="BigHome"
                component={Tabs}
                options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" component={Settings} options={PeripheralScreenOptions} />
                <Stack.Screen name="Profile" component={Profile} options={PeripheralScreenOptions} />
                <Stack.Screen name="Brofile" component={PublicProfile} options={PeripheralScreenOptions} />
                </>
            ) : (
                <Stack.Screen name="login" component={Login}/>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;