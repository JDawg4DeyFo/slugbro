import React, { useEffect, useState, createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from './Settings'
import Tabs from './Tabs';
import Profile from './Profile';
import PublicProfile from './PublicProfile';
import Login from './Login';

import { FIREBASE_AUTH, FIREBASE_DB } from './FireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { UserProfileType, UserGetProfile } from './FireBaseFunctions';
import { doc, onSnapshot } from 'firebase/firestore';

const Auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

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
    Info: undefined;
    Profile: undefined;
    Brofile: { Profile: UserProfileType };
};

export const BroContext = createContext<{
    user: User | null,
    profile: UserProfileType | null
}>({
    user: null,
    profile: null
});

const StackNavigator = () => {
    // Firebase user state setup
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfileType | null>(null);

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            // console.log('user', user);
            setUser(user);
            if (user?.email) {
                try {
                    const getProfile = async (email: string) => {
                        const profile: UserProfileType | null = await UserGetProfile(email);
                        setProfile(profile);
                    };
                    getProfile(user.email);
                    onSnapshot(doc(db, 'users', user.email), (doc) => {
                        setProfile(doc.data() as UserProfileType);
                    });
                }
                catch (error: any) {
                    console.error(error);
                }
            }
        });

    }, []);

    return (
        <BroContext.Provider value={{user, profile}}>
            <Stack.Navigator>
                {user ? (
                    <>
                    <Stack.Screen
                    name="BigHome"
                    component={Tabs}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Info" component={Settings} options={PeripheralScreenOptions} />
                    <Stack.Screen name="Profile" component={Profile} options={PeripheralScreenOptions} />
                    <Stack.Screen name="Brofile" component={PublicProfile} options={PeripheralScreenOptions} />
                    </>
                ) : (
                    <Stack.Screen name="login" component={Login}/>
                )}
            </Stack.Navigator>
        </BroContext.Provider>
    );
};

export default StackNavigator;