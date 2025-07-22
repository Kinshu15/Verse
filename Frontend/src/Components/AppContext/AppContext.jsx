import {
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail ,
  signOut,
} from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { auth, db, onAuthStateChanged } from "../Firebase/Firebase.jsx";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AppContext = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const collectionUsersRef = collection(db, "users");
  
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionUsersRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collectionUsersRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: popup?.providerId,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
//   const loginWithEmailAndPassword = async (email, password) => {
//     try {
//       await loginWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       alert(err.message);
//       console.log(err.message);
//     }
//   };
const handleLoginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
    console.log(err.message);
  }
};

  const registerWithEmailAndPassword = async (name,email,password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collectionUsersRef, {
        uid: user.uid,
        name,
        providerId: "email/password",
      });
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const sendPasswordToUser = async (email) => {
    try {
        await sendPasswordResetEmail(auth,email)
        alert ("new password send to your email")
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const signOutUser = async ()=>{
    await signOut(auth)


  }
  const userStateChanged = async()=>{
    onAuthStateChanged(auth, async (user)=>{
        if(user){
            const q =query(collectionUsersRef, where("uid","==",user?.uid))
            await onSnapshot(q,(doc)=>{
                setUserData(doc?.docs[0]?.data())
            })
            setUser(user)
        }else{
            setUser(null)
            navigate("/login")
        }
    })
   }
   useEffect(()=>{
    userStateChanged()
    if (user || userData){
        navigate("/")

    }else{
        navigate("/login")
    }
    return ()=>userStateChanged()
   },[])
//   const initialState = {
//     signInWithGoogle: signInWithGoogle,
//     loginWithEmailAndPassword: loginWithEmailAndPassword,
//     registerWithEmailAndPassword: registerWithEmailAndPassword,
//     sendPasswordToUser:sendPasswordToUser,
//     signOutUser:signOutUser,
//     userData:userData,
//     user:user,
//   };
const initialState = {
  signInWithGoogle,
  loginWithEmailAndPassword: handleLoginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordToUser,
  signOutUser,
  userData,
  user,
};



  return (
    <div>
      <AuthContext.Provider value={initialState}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AppContext;
