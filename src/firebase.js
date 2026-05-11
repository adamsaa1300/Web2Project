// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf_JWAj-fR1a2G28pKWZXLY5Q7AvKOdQU",
    authDomain: "sawweq-web2.firebaseapp.com",
    projectId: "sawweq-web2",
    storageBucket: "sawweq-web2.firebasestorage.app",
    messagingSenderId: "442718981797",
    appId: "1:442718981797:web:8141cb285f63e5e4e5074c",
    measurementId: "G-H4X20NMYSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);