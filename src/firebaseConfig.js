import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8nlePJY4wLrKKPMQNi0wt8ib3PhFMWNU",
  authDomain: "chasquiapp-280e3.firebaseapp.com",
  projectId: "chasquiapp-280e3",
  storageBucket: "chasquiapp-280e3.firebasestorage.app",
  messagingSenderId: "1059605808609",
  appId: "1:1059605808609:web:6706a02aaebd8f54623ea0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 