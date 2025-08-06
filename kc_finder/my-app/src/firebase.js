// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMeVBbiDgEVheUazdD8xGvB8QHNi0nr2Y",
    authDomain: "kc-finder.firebaseapp.com",
    projectId: "kc-finder",
    storageBucket: "kc-finder.firebasestorage.app",
    messagingSenderId: "756964185678",
    appId: "1:756964185678:web:bdb8b35b286c8877aad51f",
    measurementId: "G-6P48H773F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const analytics = getAnalytics(app);