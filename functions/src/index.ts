//import bodyParser = require("body-parser");
import * as express from "express";
import * as functions from "firebase-functions";
//import { validateFirebaseIdToken } from "./Authentication/authMiddleware";
import {
  addUser,
  createAuthUser,
  loginUser,
} from "./Controllers/userController";

const app = express();

// // create application/json parser
// var jsonParser = bodyParser.json();

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

//This will apply the middleware to all request
// (instead of doing this: app.post('/addUser',validateFirebaseIdToken,addUser);)
//app.use(validateFirebaseIdToken);

//User Routes
app.post("/user/addUser/:userId", addUser);

app.post("/user/createUser", createAuthUser);
app.get("/user/loginUser", loginUser);

exports.app = functions.https.onRequest(app);
