import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAm5_-lhMcYE-4v9_CtqpV86zu0BRJIWnQ",
    authDomain: "b2vtech-3519c.firebaseapp.com",
    projectId: "b2vtech-3519c",
    storageBucket: "b2vtech-3519c.appspot.com",
    messagingSenderId: "32812401326",
    appId: "1:32812401326:web:9465d56e92e1e738bfa33f",
    measurementId: "G-2JMXJM8TRF"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { app, auth, db, rtdb, RecaptchaVerifier };