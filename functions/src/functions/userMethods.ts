import { db } from "../configuration/firebase";
import { User } from "../Models/user";

async function getUserByEmail(email: any): Promise<User> {
  let user: User = {};

  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    querySnapshot.forEach((doc: any) => {
      user = doc.data();
    });
  } catch (error) {}
  return user;
}

export { getUserByEmail };
