import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDV0iiG9EJlf_hi-8viLx9dHhQX-JAF8ro",
    authDomain: "sara-aa130.firebaseapp.com",
    projectId: "sara-aa130",
    storageBucket: "sara-aa130.appspot.com",
    messagingSenderId: "749310641305",
    appId: "1:749310641305:web:6d477a92273c57a246a408",
    measurementId: "G-EZ6WNEXEVJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

export { auth };