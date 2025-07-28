// firebase/clientApp.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config using NEXT_PUBLIC_ environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCFzRO8SN9lNUgz3VTrncJBnwwkEzvN47Q",
  authDomain: "sem2-capstone.firebaseapp.com",
  projectId: "sem2-capstone",
  storageBucket: "sem2-capstone.firebasestorage.app",
  messagingSenderId: "977308938270",
  appId: "1:977308938270:web:0f5a5b322dceef632a3e0f",
  measurementId: "G-2DMTE42JB2"
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


const author = getAuth();

export { author };