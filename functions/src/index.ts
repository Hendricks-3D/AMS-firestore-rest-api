import * as express from "express";
import * as functions from "firebase-functions";
//import { validateFirebaseIdToken } from "./Authentication/authMiddleware";
import { addClient, createUser, signIn } from "./Controllers/userController";
const app = express();

//This will apply the middleware to all request
// (instead of doing this: app.post('/addUser',validateFirebaseIdToken,addUser);)
//app.use(validateFirebaseIdToken);

//User Routes
app.post("/user/addClient/:userId", addClient);
app.post("/user/createUser", createUser);
app.post("/user/signIn", signIn);

exports.app = functions.https.onRequest(app);
