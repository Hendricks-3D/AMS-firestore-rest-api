import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import * as functions from "firebase-functions";

admin.initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://ams1.firebaseio.com", // real-time database not setup yet
});
const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth, functions };
