// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBSJpCmPuWkRTuG6NtqE6DDbadIXfwfUeE",
  authDomain: "link-b9e51.firebaseapp.com",
  projectId: "link-b9e51",
  storageBucket: "link-b9e51.appspot.com",
  messagingSenderId: "336198539063",
  appId: "1:336198539063:web:1748c2befc4b411c662cb2",
  measurementId: "G-ZMW76XTY6B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
export let intervalId: NodeJS.Timer;

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const user = auth.currentUser;
  if (user) {
    console.log("인증 메일 발송");
    await sendEmailVerification(user);
    intervalId = setInterval(() => {
      auth.currentUser?.reload();
    }, 3000);
  } else {
    console.log("인증 발송 에러");
    return null;
  }
};

// Initialize Firebase
