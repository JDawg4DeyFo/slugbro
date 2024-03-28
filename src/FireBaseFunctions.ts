import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./FireBaseConfig";
import { Toast } from "react-native-toast-notifications";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { sentence } from "txtgen";
import { doc, setDoc } from "firebase/firestore";
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
    Nickname: string | null,
    Major: string | null,
    College: string | null,
    Instagram: string | null,
    Bio: string | null,
    NumFriends: number,
    NumBros: number
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
        const Nickname = uniqueNamesGenerator(customConfig);
        const userProfile: UserProfileType = {
            Email,
            Pfp: null,
            Name: Email.replace('@ucsc.edu', ''),
            Nickname,
            Major: null,
            College: null,
            Instagram: null,
            Bio: sentence(),
            NumFriends: 0,
            NumBros: 0
        };
        const userRef = doc(db, 'users', Email);
        await setDoc(userRef, userProfile);

        Toast.update(toastMe, 'Profile created', {type: 'success'});

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
    const toastMe = Toast.show('Logging in...');
    await new Promise(r => setTimeout(r, 100));
    try {
        await signInWithEmailAndPassword(Auth, Email, Password);
        Toast.update(toastMe, 'Signed in', {type: 'success'});
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
        Toast.update(toastMe, 'Signed out', {type: 'success'});
    } catch (error: any) {
        console.error(error);
        Toast.update(toastMe, 'Sign out failed: ' + error.message, {type: 'danger'});
    }
}