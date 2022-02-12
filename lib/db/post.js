import { connectToDatabase } from "../middleware/database";
import { ObjectId } from "mongodb";

export async function insertPost({ username, avatar, img, images }) {
  const post = {
    username,
    avatar,
    img,
    caption,
    createdAt: new Date(),
  };

  const { db } = await connectToDatabase();

  const { insertId } = await db.collection("posts").insertOne({ ...post });

  post._id = insertId;

  return post;
}

export async function findPostById(id) {
  const { db } = connectToDatabase();
  const posts = await db
    .collection("posts")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      { $project: dbProjectionUsers("creator.") },
    ])
    .toArray();
  if (!posts[0]) return null;
  return posts[0];
}
