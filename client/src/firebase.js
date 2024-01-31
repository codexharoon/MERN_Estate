// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4413b.firebaseapp.com",
  projectId: "mern-estate-4413b",
  storageBucket: "mern-estate-4413b.appspot.com",
  messagingSenderId: "807024741673",
  appId: "1:807024741673:web:0b1f0ed6de2729a7213b38",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
