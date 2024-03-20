import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "./FireBaseConfig";
const Auth = FIREBASE_AUTH;


// Function for user sign ups
type SignUpProps = {
    Email: string,
    Password: string,
};
export const SignUp = async ({Email, Password}: SignUpProps) => {
    try {
        const response = await createUserWithEmailAndPassword(Auth, Email, Password);
        console.log(response);
    } catch (error: any) {
        console.log(error);
        alert('Sign up failed: ' + error.message);
    }
}


// Function for sign in
type SignInProps = {
    Email: string,
    Password: string,
};
export const UserSignIn = async ({Email, Password}: SignInProps) => {
    try {
        const response = await signInWithEmailAndPassword(Auth, Email, Password);
        console.log(response);
    } catch (error: any) {
        console.log(error);
        alert('Sign in failed: ' + error.message);
    }
}