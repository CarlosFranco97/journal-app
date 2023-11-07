// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJhHn_9rm0lv4nyLwotrcSSW-1ch-JWc",
  authDomain: "login-journalapp.firebaseapp.com",
  projectId: "login-journalapp",
  storageBucket: "login-journalapp.appspot.com",
  messagingSenderId: "372471401018",
  appId: "1:372471401018:web:ea4357ecb600cfff57c303"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//Autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
//Acceso para la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);


