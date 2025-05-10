import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDIsPp1bKVw33CevWV_79q35xCtcY8kGws",
  authDomain: "b2vtechnew.firebaseapp.com",
  projectId: "b2vtechnew",
  storageBucket: "b2vtechnew.firebasestorage.app",
  messagingSenderId: "749876274717",
  appId: "1:749876274717:web:1e98b988bf9e99881d88f4",
  measurementId: "G-6FPTWW0W0M"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
let messaging= null;
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const { getMessaging } = require("firebase/messaging");
  messaging = getMessaging(app);
}

export { app, auth, db, rtdb,messaging, RecaptchaVerifier };

// if (typeof window !== "undefined") {
//   import("firebase/messaging").then(({ getMessaging }) => {
//     messaging = getMessaging(app);
//   });
// }
