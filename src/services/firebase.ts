import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC_KmRjo-kUYyU1cvMT_aACZ1A9Miwwv4",
  authDomain: "myapppp-a7537.firebaseapp.com",
  projectId: "myapppp-a7537",
  storageBucket: "myapppp-a7537.firebasestorage.app",
  appId: "1:665507195011:android:1f39fd2f9159fc570853b6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
