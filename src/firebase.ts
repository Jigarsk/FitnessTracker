
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4pjWXGK-iTpCQsdA_Om9wHXCTnaxO5fY",
  authDomain: "fitnesstracker-1b13d.firebaseapp.com",
  projectId: "fitnesstracker-1b13d",
  storageBucket: "fitnesstracker-1b13d.firebasestorage.app",
  messagingSenderId: "928609395253",
  appId: "1:928609395253:web:a416d686daf88bd9f1c77c",
  measurementId: "G-W2JEJZ0Z3F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
