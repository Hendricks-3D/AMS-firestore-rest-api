import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase/app";

//firebase-admin initialization
admin.initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://ams1.firebaseio.com", // real-time database not setup yet
});

//These configuration is for firebase/app
const firebaseConfig = {
  apiKey: "AIzaSyCn3xPrqmXoS89L9KckS2xeU8VbQJNj5bc",
  authDomain: "ams1-c78d8.firebaseapp.com",
  projectId: "ams1-c78d8",
  storageBucket: "ams1-c78d8.appspot.com",
  messagingSenderId: "53004885555",
  appId: "1:53004885555:web:b97b5a4b6361cf0c868d46",
  measurementId: "G-BLGESWK1QH",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth, functions, firebaseApp };
