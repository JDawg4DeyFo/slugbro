import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./FireBaseConfig";
import { Toast, ToastOptions } from "react-native-toast-notifications";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { sentence } from "txtgen";
import { doc, setDoc, getDoc, updateDoc, where, collection, query, orderBy, limit, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from './FireBaseConfig';
import { ImagePickerAsset } from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Stack";

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
    NumFollowers: number
};
// Not sure if it's needed
// export interface UserProfileInterface {
//     Email: string,
//     PFP: string | null,
//     Name: string | null,
//     Slogan: string | null,
//     Major: string | null,
//     College: string | null,
//     IG: string | null,
//     Bio: string | null,
//     NumBros: number,
//     NumFollowing: number,
//     NumFollowers: number
// };
export type BroItemProps = {
    User:    string,
    BroType: string,
    BroName: string,
    BroDate: Date,
    id:      string,
    navigation: StackNavigationProp<RootStackParamList>
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
            NumFollowing: 0
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
    Toast.hideAll();
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
    Toast.hideAll();
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
        const blob = await fetch(Image.uri).then(res => res._bodyBlob);

        Toast.update(toastMe, 'Uploading to Firebase...', NormalToast);
        const storageRef = ref(Storage, `images/image-${Date.now()}`);
        await uploadBytes(storageRef, blob);
        blob.close();

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
    Toast.hideAll();
    const toastMe = Toast.show('Loading...', NormalToast);

    try {
        const FeedSnapShot = await getDocs(FeedQuery);
        const FeedEntries = FixFeedEntries(FeedSnapShot);
        Toast.hideAll();
        return FeedEntries;
    }
    catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Failed to load feed entries ' + error.message, ErrorToast);
    }
}
export const FixFeedEntries = (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    let FeedEntries: BroItemProps[] = [];

    snapshot.forEach((doc) => {
        try {
            FeedEntries.push(doc.data() as BroItemProps);
        }
        catch (error:any) {
            console.error(error);
        }
    });

    return FeedEntries;
}
// lookup user data from email string
export const GetUserData = async (Email: string): Promise<UserProfileType | null> => {
    let UserData: UserProfileType;

    const UserQuery = query(collection(db, 'users'), where('Email', '==', Email));
    
    try{
        const UserSnapShot = await getDocs(UserQuery);
        // make sure thang is found
        if(UserSnapShot.empty){
            return null;
        }
        UserData = UserSnapShot.docs[0].data() as UserProfileType;
        return UserData;
    }
    catch (error: any) {
        console.error(error);
        return null;
    }
}