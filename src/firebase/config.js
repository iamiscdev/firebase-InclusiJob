import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKHH8d3Fb5DTv6Ch5W_v4LhSnPnpUkUkg",
  authDomain: "inclusijob-a2z.firebaseapp.com",
  projectId: "inclusijob-a2z",
  storageBucket: "inclusijob-a2z.firebasestorage.app",
  messagingSenderId: "423141496811",
  appId: "1:423141496811:web:1eb4dfc6d06216f64e6bae",
  measurementId: "G-XG6V9MDCYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };