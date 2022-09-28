// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const loginEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signupEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "link-b9e51.firebaseapp.com",
  projectId: "link-b9e51",
  storageBucket: "link-b9e51.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_MESSAGE_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
