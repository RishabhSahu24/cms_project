// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8JYKmiwKI1Gk4WzJTlWskWLKIo8tvcjg",
  authDomain: "cms-project-demo.firebaseapp.com",
  projectId: "cms-project-demo",
  storageBucket: "cms-project-demo.appspot.com",
  messagingSenderId: "648065806002",
  appId: "1:648065806002:web:1393265b70987fcb1623ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
