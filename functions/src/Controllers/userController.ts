import { Response } from "express";
import { auth, db } from "../configuration/firebase";
import { getUserByEmail } from "../functions/userMethods";
import { Request, User } from "../Models/user";
const bcrypt = require("bcrypt");

//Firebase documenation
//https://firebase.google.com/docs/auth/admin/manage-users#create_a_user

/**
 *
 * @param req
 * @param res
 * This method will be used to add a user to firebase
 */
const addUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  let emailCheckObject: User[] = [];
  try {
    emailCheckObject = await getUserByEmail(user.email);
    if (emailCheckObject.length >= 1) {
      //Check if email already exist
      res.status(409).send({
        status: "Data Conflict",
        message: emailCheckObject,
      });
    } else {
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashPasword = await bcrypt.hash(user?.password, salt);
        user.password = hashPasword;

        const userCollection = db.collection("users").doc(); // connect to/create user collection in reference firestore
        userCollection.set(user); //add user object to document
        user.id = userCollection.id;
        res.status(200).send({
          status: "success",
          message: "user was added successfully.",
          data: user,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: "Please enter all fields",
        });
      }
    } // end duplicate email if check
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "client was not added" + error,
    });
  }
};

/**
 *
 * @param res
 * @param req
 *
 * This method will be used to add users to the AMS platform.
 */
const createAuthUser = async (req: Request, res: Response) => {
  const { username, password, emailVerified, email } = req.body;
  if (auth) {
    auth
      .createUser({
        email: email,
        password: password,
        emailVerified: emailVerified,
        displayName: username,
      })
      .then(() => {
        return res.status(200).send({
          status: "sucessfully",
          message: "User created successfully",
        });
      })
      .catch((error) => {
        res.status(500).send({
          status: "failed",
          message: error.message,
        });
      });
  } else {
    res.status(500).send({
      status: "failed",
      message: "Auth object undefined",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  let user: User[] = [];
  try {
    user = await getUserByEmail(req.body.email);
    if (user.length >= 1) {
      if (await bcrypt.compare(req.body.password, user[0].password)) {
        //login user
        res.status(200).send({
          status: "success",
          data: user[0],
        });
      }
    } else {
      res.status(404).send({
        status: "failed",
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "client was not added" + error,
    });
  }
};

export { addUser, createAuthUser, loginUser };
