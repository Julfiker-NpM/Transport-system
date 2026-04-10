// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3JjV7bib5ZZ_fKYErqFVi1VA1sBp-Cac",
  authDomain: "studentmoveschadule.firebaseapp.com",
  projectId: "studentmoveschadule",
  storageBucket: "studentmoveschadule.firebasestorage.app",
  messagingSenderId: "562963884772",
  appId: "1:562963884772:web:6e169c9783694b2ba39af1",
  measurementId: "G-K6NMTNDVCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };