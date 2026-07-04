import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuhNNWQpvJ9r6t4Y15xM-Wp8pLoKWIJ2g",
  authDomain: "job-application-tracker-69f63.firebaseapp.com",
  projectId: "job-application-tracker-69f63",
  storageBucket: "job-application-tracker-69f63.firebasestorage.app",
  messagingSenderId: "372731851085",
  appId: "1:372731851085:web:bd8e1f582f88d0bb4f4704"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);