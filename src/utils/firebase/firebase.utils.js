import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDrXAgSSXFZjsHfaPSEQAH7px3JTphavY",
  authDomain: "crwn-clothing-db-476e4.firebaseapp.com",
  projectId: "crwn-clothing-db-476e4",
  storageBucket: "crwn-clothing-db-476e4.appspot.com",
  messagingSenderId: "101316003210",
  appId: "1:101316003210:web:6bcbb81c6118eea6437473",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists );

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });

    }catch(error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;


};