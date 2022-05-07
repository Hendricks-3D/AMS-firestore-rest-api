import { Response } from "express";
import { auth, db } from "../configuration/firebase";
import { Request } from "../Models/user";

//Firebase documenation
//https://firebase.google.com/docs/auth/admin/manage-users#create_a_user

/**
 *
 * @param req
 * @param res
 * This method will be used to add the client personal infomation to firebase
 */
const addClient = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    if (username && password && email) {
      const userCollection = db.collection("users").doc(); // connect to/create user collection in reference firestore

      const userObject = {
        id: req.params.userId,
        email,
        password,
        username,
      };
      userCollection.set(userObject); //add user object to document

      res.status(200).send({
        status: "success",
        message: "user was added successfully.",
        data: userObject,
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "Please enter all fields",
      });
    }
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
const createUser = async (res: Response, req: Request) => {
  const { email, password, username, emailVerified } = req.body;

  auth
    .createUser({
      email: email,
      password: password,
      emailVerified: emailVerified,
      displayName: username,
    })
    .then(() => {
      res.status(200).send({
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
};

const signIn = async (res: Response, req: Request) => {
  const { email, password } = req.body;
  auth
    .getUserByEmail(email)
    .then((userRecord) => {
      if (userRecord) {
        if (userRecord.passwordHash === password) {
          res.status(200).send({
            status: "success",
            data: userRecord,
          });
        }
      } else {
        res.status(500).send({
          status: "failed",
          message: "user data not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "failed",
        message: "email not found" + error,
      });
    });
};

export { addClient, createUser, signIn };
