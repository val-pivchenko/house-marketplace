import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAY1dKwPf58pm5BZUuSRnZOVaW3MumCOX4",
    authDomain: "house-marketplace-20600.firebaseapp.com",
    projectId: "house-marketplace-20600",
    storageBucket: "house-marketplace-20600.appspot.com",
    messagingSenderId: "436099841334",
    appId: "1:436099841334:web:6375853fbc188baec7c797"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()