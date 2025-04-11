import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdXsbHRs8KQjD8nfCPhSWE-uiiePI7xyE",
  authDomain: "b2v-project-2a38f.firebaseapp.com",
  projectId: "b2v-project-2a38f",
  storageBucket: "b2v-project-2a38f.firebasestorage.app",
  messagingSenderId: "154798371609",
  appId: "1:154798371609:web:f0de33b7604396dee88b88",
  measurementId: "G-D533LZPTCY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
