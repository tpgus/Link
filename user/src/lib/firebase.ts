// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
} from "firebase/auth";

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
const auth = getAuth();

export const loginEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.log(error);
    //   const errorCode = error.code;
    //   const errorMessage = error.messgae;
    // console.log("에러코드:" + errorCode, "에러메시지:" + errorMessage);
  }
};

export const signupEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("success!", user);
    })
    .then(() => {
      let user1 = auth.currentUser!;
      sendEmailVerification(user1);
    })
    .then(() => {
      console.log("이메일 전송");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      // ..
    });
const analytics = getAnalytics(app);

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/",
  // This must be true.
  handleCodeInApp: true,
};
export const verifyEmail = (email: string) =>
  sendSignInLinkToEmail(auth, email, actionCodeSettings);

// export const verifyEmail = (auth.currentUser) => sendEmailVerification
