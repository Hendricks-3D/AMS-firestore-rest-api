//import bodyParser = require("body-parser");
import * as express from "express";
import * as functions from "firebase-functions";
import { addClient } from "./Controllers/ClientController";
//import { validateFirebaseIdToken } from "./Authentication/authMiddleware";
import {
  addUser,
  AuthenticateUser,
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
//Custom authentication using Bcrypt to hash passwords
app.post("/user/addUser", addUser);
app.get("/user/loginUser", loginUser);

//Firebase Authentication methods
app.post("/user/createUser", createAuthUser);
app.post("/user/AuthenticateUser", AuthenticateUser);

///----------------Client Routes

app.post("/clients/addClient", addClient);
exports.app = functions.https.onRequest(app);
