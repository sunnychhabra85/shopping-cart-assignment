
import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {getDoc, getFirestore, setDoc,doc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqW-rhuIKkzyAxbo-ohKNrbCNSYxY0kjA",
    authDomain: "crwn-clothing-db-8e809.firebaseapp.com",
    projectId: "crwn-clothing-db-8e809",
    storageBucket: "crwn-clothing-db-8e809.appspot.com",
    messagingSenderId: "839740703541",
    appId: "1:839740703541:web:6e5b23053bbe01c594027c"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapsShot = await getDoc(userDocRef);

    if(!userSnapsShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch(error){
            console.log("error creating the user", error.message);
        }
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);