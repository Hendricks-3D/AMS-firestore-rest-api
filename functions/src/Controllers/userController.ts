import { Response } from "express";
import { auth, db } from "../configuration/firebase";
import { Request, User } from "../Models/user";
const bcrypt = require("bcrypt");

//Firebase documenation
//https://firebase.google.com/docs/auth/admin/manage-users#create_a_user

/**
 *
 * @param req
 * @param res
 * This method will be used to add the client personal infomation to firebase
 */
const addUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashPasword = await bcrypt.hash(user?.password, salt);
      user.password = hashPasword;

      const userCollection = db.collection("users").doc(); // connect to/create user collection in reference firestore
      userCollection.set(user); //add user object to document

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
  const user: User[] = [];
  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", req.body.email)
      .get(); // connect to/create user collection in reference firestore
    querySnapshot.forEach((doc: any) => {
      user.push(doc.data());
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "client was not added" + error,
    });
  }
};

export { addUser, createAuthUser, loginUser };
