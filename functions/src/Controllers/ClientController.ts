import { Response } from "express";
import { db } from "../configuration/firebase";
import { Client, Request } from "../Models/client";

const addClient = async (req: Request, res: Response) => {
  const client: Client = req.body;

  try {
    if (client) {
      const clientCollection = db.collection("clients").doc(); // connect to/create client collection in reference firestore
      clientCollection.set(client); //add client object to document
      client.id = clientCollection.id;
      res.status(200).send({
        status: "success",
        message: "client was added successfully.",
        data: client,
      });
    } else {
      res.status(500).send({
        status: "Empty",
        message: "Client object null/undefined",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "client was not added" + error,
    });
  }
};

export { addClient };
