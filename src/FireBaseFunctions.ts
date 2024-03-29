import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./FireBaseConfig";
import { Toast } from "react-native-toast-notifications";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { sentence } from "txtgen";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
const Auth = FIREBASE_AUTH;
const db = FIREBASE_DB;


// Function for user sign ups
type SignUpProps = {
    Email: string,
    Password: string,
};
export type UserProfileType = {
    Email: string,
    Pfp: string | null,
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
export const UserSignUp = async ({Email, Password}: SignUpProps) => {
    Toast.hideAll();
    const toastMe = Toast.show('Signing up...');
    await new Promise(r => setTimeout(r, 100));
    try {
        Email = Email.toLowerCase();
        const ucscEmail = new RegExp('^[A-Za-z0-9._%+-]+@ucsc\.edu$');
        if (!ucscEmail.test(Email)) {
            throw Error('Email must be a UCSC email');
        }
        await createUserWithEmailAndPassword(Auth, Email, Password);

        Toast.update(toastMe, 'Creating account...');

        const customConfig: Config = {
            dictionaries: [adjectives, animals],
            separator: ' '
        };
        const Slogan = uniqueNamesGenerator(customConfig);
        const userProfile: UserProfileType = {
            Email,
            Pfp: null,
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

        Toast.update(toastMe, 'Profile created!', {type: 'success'});

    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign up failed: ' + error.message, {type: 'danger'});
    }
}


// Function for sign in
type SignInProps = {
    Email: string,
    Password: string,
};
export const UserSignIn = async ({Email, Password}: SignInProps) => {
    Toast.hideAll();
    const toastMe = Toast.show('Signing in...');
    await new Promise(r => setTimeout(r, 100));
    try {
        await signInWithEmailAndPassword(Auth, Email, Password);
        Toast.update(toastMe, 'Signed in!', {type: 'success'});
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign in failed: ' + error.message, {type: 'danger'});
    }
}

export const UserSignOut = async () => {
    Toast.hideAll();
    const toastMe = Toast.show('Signing out...');
    await new Promise(r => setTimeout(r, 100));
    try {
        await Auth.signOut();
        Toast.update(toastMe, 'Signed out!', {type: 'success'});
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign out failed: ' + error.message, {type: 'danger'});
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
        Toast.show('No profile found: ' + error.message, {type: 'danger'});
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
    const toastMe = Toast.show('Saving profile...');
    await new Promise(r => setTimeout(r, 100));
    try {
        const userRef = doc(db, 'users', Email);
        await updateDoc(userRef, Profile);
        Toast.update(toastMe, 'Saved!', {type: 'success'});
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Saving failed: ' + error.message, {type: 'danger'});
    }
};
export const UserUpdateBio = async (Email: string, Bio: string) => {
    Toast.hideAll();
    const toastMe = Toast.show('Saving bio...');
    await new Promise(r => setTimeout(r, 100));
    try {
        const userRef = doc(db, 'users', Email);
        await updateDoc(userRef, {Bio});
        Toast.update(toastMe, 'Saved!', {type: 'success'});
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Saving failed: ' + error.message, {type: 'danger'});
    }
};