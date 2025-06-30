// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCwBsaERr-wwst0hlgvYYDu8Q5l0ZsB7BI",
  authDomain: "beach-warriors-45ee9.firebaseapp.com",
  projectId: "beach-warriors-45ee9",
  storageBucket: "beach-warriors-45ee9.firebasestorage.app",
  messagingSenderId: "173169031157",
  appId: "1:173169031157:web:965dc2a04c233c498292bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };