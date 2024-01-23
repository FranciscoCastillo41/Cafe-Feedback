// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-cafe.firebaseapp.com",
  projectId: "mern-cafe",
  storageBucket: "mern-cafe.appspot.com",
  messagingSenderId: "671815716062",
  appId: "1:671815716062:web:d6442646ad79cfd6aa464f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
