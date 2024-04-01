// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAA-APiG3N5sRxzdSvLdrrs1Nu_0vwCuw",
  authDomain: "slugbro-630b8.firebaseapp.com",
  projectId: "slugbro-630b8",
  storageBucket: "slugbro-630b8.appspot.com",
  messagingSenderId: "126844262942",
  appId: "1:126844262942:web:6b10561408c10328e6ec0f",
  measurementId: "G-4WCJF25E49"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP,
  // {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}
);

// Upload data in JSON format
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Upload images
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);