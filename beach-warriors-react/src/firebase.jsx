import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDfIKaj1GgyOCCa6VOM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "beach-warriors-a83bd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "beach-warriors-a83bd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "beach-warriors-a83bd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "358756048661",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:358756048661:web:e7bb9a7b1acede186f931c",
  measurementId: "G-2VZVM07HMM"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider()

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)

export default app
