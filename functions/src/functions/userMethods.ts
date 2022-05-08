import { db } from "../configuration/firebase";
import { User } from "../Models/user";

async function getUserByEmail(email: any): Promise<User[]> {
  let user: User[] = [];

  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get(); // connect to/create user collection in reference firestore
    querySnapshot.forEach((doc: any) => {
      user.push(doc.data());
    });
    return user;
  } catch (error) {
    return [];
  }
}

export { getUserByEmail };
