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
import { UserProfileType, UserGetProfile, BroFeedType, GetFeedEntries, FeedQuery, FixFeedEntries } from './FireBaseFunctions';
import { doc, onSnapshot } from 'firebase/firestore';
import BroMap from './Map';
import { Region } from 'react-native-maps';

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
    Map: { Bro?: BroFeedType };
};

const UCSC: Region = {
    latitude: 36.996,
    longitude: -122.06,
    latitudeDelta: 0.022,
    longitudeDelta: 0.022
};
export const BroContext = createContext<{
    user: User | null,
    profile: UserProfileType | null,
    broList: BroFeedType[] | null,
    location: boolean,
    setLocation: (location: boolean) => void,
    region: Region,
    setRegion: (region: Region) => void,
}>({
    user: null,
    profile: null,
    broList: null,
    location: true,
    setLocation: (location: boolean) => {},
    region: UCSC,
    setRegion: (region: Region) => {},
});

const StackNavigator = () => {
    // Firebase user state setup
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const [broList, setBroList] = useState<BroFeedType[] | null>(null);
    const [Listen, SetListen] = useState(false);
    const [location, setLocation] = useState(true);
    const [region, setRegion] = useState(UCSC);

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

    useEffect(() => {
        const LoadData = async () => {
            const FeedData = await GetFeedEntries();
            if (!FeedData) return;
            setBroList(FeedData);
        }
        LoadData();
    }, []);

    useEffect(() => {
        if(!broList || Listen) return;
        SetListen(true);
        onSnapshot(FeedQuery, (snapshot) => {
            console.log('Update Feed');
            setBroList(FixFeedEntries(snapshot));
        });
    }, [broList, Listen]);

    return (
        <BroContext.Provider value={{user, profile, broList, location, setLocation, region, setRegion}}>
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
                    <Stack.Screen name="Map" component={BroMap} options={PeripheralScreenOptions} />
                    </>
                ) : (
                    <Stack.Screen name="login" component={Login}/>
                )}
            </Stack.Navigator>
        </BroContext.Provider>
    );
};

export default StackNavigator;