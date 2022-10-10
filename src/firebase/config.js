import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPF5_8OEKxSuM0AUIF8qaQKiIGHCIKYwo",
  authDomain: "blog-integrador3.firebaseapp.com",
  projectId: "blog-integrador3",
  storageBucket: "blog-integrador3.appspot.com",
  messagingSenderId: "466216217718",
  appId: "1:466216217718:web:511b6eb6a895af95674357",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
