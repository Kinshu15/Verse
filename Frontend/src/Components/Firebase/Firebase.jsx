import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCWgeC61xgk8IPwmC_srLxPPZZbx2acNk",
  authDomain: "verse-7d37f.firebaseapp.com",
  projectId: "verse-7d37f",
  storageBucket: "verse-7d37f.firebasestorage.app",
  messagingSenderId: "382404381311",
  appId: "1:382404381311:web:df249cea30d6ed99768d4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, onAuthStateChanged };
