// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7Wrc_CmDrlmHHJ1D_J16OWO9ICBr1ACo",
  authDomain: "ahaar-setu.firebaseapp.com",
  projectId: "ahaar-setu",
  storageBucket: "ahaar-setu.firebasestorage.app",
  messagingSenderId: "323396233492",
  appId: "1:323396233492:web:ef6f23004067969025fa01",
  measurementId: "G-MEZ9MGGP0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const auth = getAuth(app);
export const db = getFirestore(app);