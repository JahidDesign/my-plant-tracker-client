// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB9tipRpSpr-D088VRs4Bp_OGKsD8rJ90",
  authDomain: "plantcaretracker-70f65.firebaseapp.com",
  projectId: "plantcaretracker-70f65",
  storageBucket: "plantcaretracker-70f65.appspot.com", // ✅ corrected `.app` to `.appspot.com`
  messagingSenderId: "991341421552",
  appId: "1:991341421552:web:51252205f8232f4a453335",
  measurementId: "G-L5PL7350KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
