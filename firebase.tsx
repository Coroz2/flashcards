// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: Record<string, string> = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "flashcard-saas-d922b.firebaseapp.com",
  projectId: "flashcard-saas-d922b",
  storageBucket: "flashcard-saas-d922b.appspot.com",
  messagingSenderId: "747469885818",
  appId: "1:747469885818:web:c6dc6c4b562b5c2d6986c3",
  measurementId: "G-LF7CDJ0WB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
