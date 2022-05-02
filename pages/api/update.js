import { getSession } from "next-auth/react";
import { findUserByEmailAndUpdate, findUserByEmail } from "@/lib/db/user";
import { connectToDatabase } from "@/lib/middleware/database";
import bcrypt from "bcrypt";
import { ObjectID } from "mongodb";
    // find user and update with body
    // return the results
    // update the results in front end
export default async (req, res) => {
  // const session= getSession({req})
  const { db } = await connectToDatabase();
  const { id, bio, email, password, username} = req.body;
  // if bio, email is not
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    res.send(password);
   const user = await db.collection("users").findOneAndUpdate({ _id: ObjectID(id) }, {$set : { bio, username,email, hashedPassword}});
 } catch (e) {
   console.error(e);
 } 
 finally{
   res.send({
     id, bio, email, password, hashedPassword
   })
 }
}
