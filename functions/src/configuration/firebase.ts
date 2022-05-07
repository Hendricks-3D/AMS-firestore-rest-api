import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.Email,
  }),
  // databaseURL: "https://ams1.firebaseio.com", // real-time database not setup yet
});
const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth, functions };
