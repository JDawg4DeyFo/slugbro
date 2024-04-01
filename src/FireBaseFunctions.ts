import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./FireBaseConfig";
import { Toast, ToastOptions } from "react-native-toast-notifications";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { sentence } from "txtgen";
import { doc, setDoc, getDoc, updateDoc, where, collection, query, orderBy, limit, getDocs, QuerySnapshot, DocumentData, Timestamp, GeoPoint, writeBatch, getCountFromServer } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from './FireBaseConfig';
import { ImagePickerAsset } from "expo-image-picker";
import { Linking } from "react-native";

const Auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
const Storage = FIREBASE_STORAGE;

export const NormalToast: ToastOptions = {duration: 5555};
export const SuccessToast: ToastOptions = {type: 'success', duration: 1337};
export const ErrorToast: ToastOptions = {type: 'danger', duration: 4444};


// Function for user sign ups
type SignUpProps = {
    Email: string,
    Password: string,
};
export type UserProfileType = {
    Email: string,
    PFP: string | null,
    Name: string | null,
    Slogan: string | null,
    Major: string | null,
    College: string | null,
    IG: string | null,
    Bio: string | null,
    NumBros: number,
    NumFollowing: number,
    NumFollowers: number,
    Following: string[],
    LastBro: Timestamp
};
export type BroFeedType = {
    Email:    string,
    BroType: string,
    BroName: string,
    BroDate: Timestamp,
    BroLocation?: GeoPoint
};

export const UserSignUp = async ({Email, Password}: SignUpProps) => {
    Toast.hideAll();
    const toastMe = Toast.show('Signing up...', NormalToast);
    await new Promise(r => setTimeout(r, 100));
    try {
        Email = Email.toLowerCase();
        const ucscEmail = new RegExp('^[A-Za-z0-9._%+-]+@ucsc\.edu$');
        if (!ucscEmail.test(Email)) {
            throw Error('Email must be a UCSC email');
        }
        await createUserWithEmailAndPassword(Auth, Email, Password);

        Toast.update(toastMe, 'Creating account...', NormalToast);

        const customConfig: Config = {
            dictionaries: [adjectives, animals],
            separator: ' '
        };
        const Slogan = uniqueNamesGenerator(customConfig);
        const userProfile: UserProfileType = {
            Email,
            PFP: null,
            Name: Email.replace('@ucsc.edu', ''),
            Slogan,
            Major: null,
            College: null,
            IG: null,
            Bio: sentence(),
            NumBros: 0,
            NumFollowers: 0,
            NumFollowing: 0,
            Following: [],
            LastBro: Timestamp.now()
        };
        const userRef = doc(db, 'users', Email);
        await setDoc(userRef, userProfile);

        Toast.update(toastMe, 'Profile created!', SuccessToast);

    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign up failed: ' + error.message, ErrorToast);
    }
}


// Function for sign in
type SignInProps = {
    Email: string,
    Password: string,
};
export const UserSignIn = async ({Email, Password}: SignInProps) => {
    // Toast.hideAll();
    const toastMe = Toast.show('Signing in...', NormalToast);
    await new Promise(r => setTimeout(r, 100));
    try {
        await signInWithEmailAndPassword(Auth, Email, Password);
        Toast.update(toastMe, 'Signed in!', SuccessToast);
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign in failed: ' + error.message, ErrorToast);
    }
}

export const UserSignOut = async () => {
    // Toast.hideAll();
    const toastMe = Toast.show('Signing out...', NormalToast);
    await new Promise(r => setTimeout(r, 100));
    try {
        await Auth.signOut();
        Toast.update(toastMe, 'Signed out!', SuccessToast);
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign out failed: ' + error.message, ErrorToast);
    }
}

export const UserGetProfile = async (Email: string) => {
    try {
        Email = Email.toLowerCase();
        const userRef = doc(db, 'users', Email);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw Error('Profile with email ' + {Email} + ' not found');
        }
        return userDoc.data() as UserProfileType;
    } catch (error: any) {
        console.error(error);
        Toast.show('No profile found: ' + error.message, ErrorToast);
        return null;
    }
}

type ProfileHeaderType = {
    Name: string,
    Slogan: string,
    Major: string,
    College: string,
    IG: string
};

export const UserUpdateProfile = async (Email: string, Profile: ProfileHeaderType) => {
    Toast.hideAll();
    const toastMe = Toast.show('Saving profile...', NormalToast);
    await new Promise(r => setTimeout(r, 100));
    try {
        const userRef = doc(db, 'users', Email);
        await updateDoc(userRef, Profile);
        Toast.update(toastMe, 'Saved!', SuccessToast);
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Saving failed: ' + error.message, ErrorToast);
    }
};
export const UserUpdateBio = async (Email: string, Bio: string) => {
    Toast.hideAll();
    const toastMe = Toast.show('Saving bio...', NormalToast);
    await new Promise(r => setTimeout(r, 100));
    try {
        const userRef = doc(db, 'users', Email);
        await updateDoc(userRef, {Bio});
        Toast.update(toastMe, 'Saved!', SuccessToast);
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Saving failed: ' + error.message, ErrorToast);
    }
};
export const UserUpdatePFP = async (Email: string, Image: ImagePickerAsset) => {
    Toast.hideAll();
    const toastMe = Toast.show('Uploading image...', NormalToast);
    try {
        const blob = await fetch(Image.uri).then(res => {
            //@ts-ignore
            if (res._bodyBlob) return res._bodyBlob;
            return res.blob();
        });

        Toast.update(toastMe, 'Uploading to Firebase...', NormalToast);
        const storageRef = ref(Storage, `images/image-${Date.now()}`);
        await uploadBytes(storageRef, blob);
        try {
            blob.close();
        }
        catch {}

        Toast.update(toastMe, 'Getting image URL...', NormalToast);
        const PFP = await getDownloadURL(storageRef);

        Toast.update(toastMe, 'Saving profile picture...', NormalToast);
        const userRef = doc(db, 'users', Email);
        await updateDoc(userRef, {PFP});
        Toast.update(toastMe, 'Updated profile picture!', SuccessToast);
    } 
    catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Profile picture failed: ' + error.message, ErrorToast);
    }
};
const LEADERBOARD_LIMIT = 100;
export const LBQuery = query(collection(db, 'users'), orderBy('NumBros', 'desc'), limit(LEADERBOARD_LIMIT));
export const getLBEntries = async () => {
    Toast.hideAll();
    const toastMe = Toast.show('Loading...', NormalToast);
    try {
        const usersSnapshot = await getDocs(LBQuery);
        const LBEntries = fixLBEntries(usersSnapshot);
        Toast.hideAll();
        return LBEntries;
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Failed to load leaderboard: ' + error.message, ErrorToast);
    }
};
export const fixLBEntries = (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    let LBEntries: UserProfileType[] = [];
    snapshot.forEach((doc) => {
        try {
            LBEntries.push(doc.data() as UserProfileType);
        }
        catch (error: any) {
            console.error(error);
        }
    });
    return LBEntries;
};
const FEED_LIMIT = 100;
export const FeedQuery = query(collection(db, 'posts'), orderBy('BroDate', 'desc'), limit(FEED_LIMIT));
export const GetFeedEntries = async () => {
    // Toast.hideAll();
    await new Promise(r => setTimeout(r, 100));
    const toastMe = Toast.show('Loading...', NormalToast);

    try {
        const FeedSnapShot = await getDocs(FeedQuery);
        const FeedEntries = FixFeedEntries(FeedSnapShot);
        Toast.hideAll();
        return FeedEntries;
    }
    catch (error: any) {
        Toast.update(toastMe, 'Failed to get feed: ' + error.message, ErrorToast);
        console.error(error);
    }
}
export const FixFeedEntries = (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    let FeedEntries: BroFeedType[] = [];

    snapshot.forEach((doc) => {
        try {
            FeedEntries.push(doc.data() as BroFeedType);
        }
        catch (error:any) {
            console.error(error);
        }
    });

    return FeedEntries;
}

const bro = [
    'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro', 'bro',
    'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro', 'Bro',
    'Bro...',
    'Bro!',
    'bro?',
    'Bruh', 'Bruh', 'Bruh',
    'bruh', 'bruh', 'bruh',
    'brooo',
    'bro!?',
    'BRO',
    'bbbro',
]
export const SendBro = async (Profile: UserProfileType, BroItem: BroFeedType) => {
    Toast.hideAll();
    const toastMe = Toast.show('Broing...', NormalToast);

    try {
        // 1. Update profile NumBros in 'users'
        // 2. Create document in 'posts'
        const num = Profile.NumBros + 1;
        BroItem.BroType = bro[Math.floor(Math.random()*bro.length)];
        if (num === 1) BroItem.BroType = '1st Bro';
        if (num % 100 == 0 || num == 12 || num == 37 || num == 125) BroItem.BroType = `${num}th Bro`;
        const batch = writeBatch(db);
        batch.update(doc(db, 'users', Profile.Email), {NumBros: num, LastBro: BroItem.BroDate});
        batch.set(doc(db, 'posts', Profile.Email + '_' + num.toString()), BroItem);
        await batch.commit();
        Toast.update(toastMe, 'Broed', SuccessToast);
    }
    catch (error: any) {
        Toast.hideAll();
        Toast.show("No go bro: " + error.message, ErrorToast);
        console.error(error);
    }
};
export const getBroRank = async (NumBros: number) => {
    Toast.hideAll();
    const toastMe = Toast.show('Calculating Bro Rank...', NormalToast);
    try {
        const usersRef = collection(db, 'users');
        const TotalUsers = (await getCountFromServer(usersRef)).data().count;
        const broRankRef = query(usersRef, where('NumBros', '>', NumBros));
        const BroRank = (await getCountFromServer(broRankRef)).data().count + 1;
        Toast.hideAll();
        return { BroRank, TotalUsers };
    }
    catch (error: any) {
        Toast.update(toastMe, 'Failed to load bro rank: ' + error.message, ErrorToast);
        console.error(error);
    }
};
export const openIG = async (handle: string) => {
    try {
        try {
            const destination = `instagram://user?username=${handle}`; 
            if(navigator.userAgent.match(/Android/i)) {
                // use Android's redirect
                document.location = destination;   
            }   
            else {
                // use iOS redirect
                window.location.replace( destination );
            }
        } catch (error: any) {
            window.location.href = `https://www.instagram.com/${handle}`;
        }
    }
    catch (error: any) {
        Toast.show('Failed to open Instagram: ' + error.message, ErrorToast);
        console.error(error);
    }
};