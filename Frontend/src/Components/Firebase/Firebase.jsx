import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
//   authDomain: "verse-7d37f.firebaseapp.com",
//   projectId: "verse-7d37f",
//   storageBucket: "verse-7d37f.firebasestorage.app",
//   messagingSenderId: "382404381311",
//   appId: "1:382404381311:web:df249cea30d6ed99768d4a",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCAY83NK3VRFZqeLgh6Sa88qnyANGIJ-EE",
  authDomain: "socialmedia-419f4.firebaseapp.com",
  projectId: "socialmedia-419f4",
  storageBucket: "socialmedia-419f4.firebasestorage.app",
  messagingSenderId: "284901520379",
  appId: "1:284901520379:web:b65b0d7ebf049fa801915e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, onAuthStateChanged };
