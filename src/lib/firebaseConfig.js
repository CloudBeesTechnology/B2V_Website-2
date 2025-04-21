// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // ✅ Realtime Database

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAdXsbHRs8KQjD8nfCPhSWE-uiiePI7xyE",
  authDomain: "b2v-project-2a38f.firebaseapp.com",
  databaseURL: "https://b2v-project-2a38f-default-rtdb.firebaseio.com", // ✅ correct key is databaseURL
  projectId: "b2v-project-2a38f",
  storageBucket: "b2v-project-2a38f.appspot.com",
  messagingSenderId: "154798371609",
  appId: "1:154798371609:web:f0de33b7604396dee88b88",
  measurementId: "G-D533LZPTCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app); // ✅ Realtime DB

// Export
export { app, auth, db, rtdb, RecaptchaVerifier };


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdXsbHRs8KQjD8nfCPhSWE-uiiePI7xyE",
//   authDomain: "b2v-project-2a38f.firebaseapp.com",
//   projectId: "b2v-project-2a38f",
//   storageBucket: "b2v-project-2a38f.firebasestorage.app",
//   messagingSenderId: "154798371609",
//   appId: "1:154798371609:web:f0de33b7604396dee88b88",
//   measurementId: "G-D533LZPTCY",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
