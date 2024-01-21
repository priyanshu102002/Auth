import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "auth-ed246.firebaseapp.com",
    projectId: "auth-ed246",
    storageBucket: "auth-ed246.appspot.com",
    messagingSenderId: "727129921575",
    appId: "1:727129921575:web:0b63effeea7a689b115602"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);