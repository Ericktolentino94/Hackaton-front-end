// Import the functions you need from the SDKs you need
import { getApp, initializeApp, deleteApp,  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

auth.useDeviceLanguage();


const googleAuth = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    try {
  //the signInWithPopUp() method accepts ANY provider we create. This is all our authentication logic
    signInWithPopup(auth, googleAuth).then((res) => {
        console.log(res)
    });
     } catch (err) {
      console.log(err);
    }
  };

  export const logOut = async () =>{
    try {
      await signOut(auth)
      alert("you've signed out - congrats.")
    } catch(err) {
      console.log(err)
    }
  }