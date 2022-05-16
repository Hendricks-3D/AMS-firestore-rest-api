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
var cors = require("cors");

const app = express();
app.use(cors());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//User Routes
//Custom authentication using Bcrypt to hash passwords
app.post("/user/addUser", addUser);
app.get("/user/loginUser", loginUser);

//Firebase Authentication methods
app.post("/user/createUser", createAuthUser);
app.post("/user/AuthenticateUser", cors(corsOptions), AuthenticateUser);

///----------------Client Routes

app.post("/client/addClient", cors(corsOptions), addClient);
exports.app = functions.https.onRequest(app);
