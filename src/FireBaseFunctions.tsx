import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "./FireBaseConfig";
const Auth = FIREBASE_AUTH;


// Function for user sign ups
type SignUpProps = {
    email: string,
    password: string,
};

export const SignUp = async ({email, password}: SignUpProps) => {
    try {
        const response = await createUserWithEmailAndPassword(Auth, email, password);
    }
}