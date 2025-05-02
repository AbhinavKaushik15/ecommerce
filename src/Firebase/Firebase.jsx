import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_1,
  authDomain: "shoppingapp-a116a.firebaseapp.com",
  projectId: "shoppingapp-a116a",
  storageBucket: "shoppingapp-a116a.firebasestorage.app",
  messagingSenderId: "769520429289",
  appId: "1:769520429289:web:a4792e098095936f96e878",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireDb = getFirestore(app);