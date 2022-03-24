import { connectToDatabase } from "../middleware/database";
import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

export async function insertPost({ userId, content, images, avatar }) {
  const post = {
    userId,
    content,
    images,
    avatar,
    createdAt: new Date(),
  };

  const { db } = await connectToDatabase();

  const { insertId } = await db.collection("posts").insertOne({ ...post });

  post._id = insertId;

  return post;
}

export async function getPost(before, by, limit = 10) {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $match: {
          // Change to ObjectId(by)
          ...(by && { userId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        // $unwind: "$creator",
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },

      // { $project: dbProjectionUsers("creator.") },
    ])
    .toArray();

  return posts;
}

export async function findPostById(id) {
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      // { $project: dbProjectionUsers("creator.") },
    ])
    .toArray();
  if (!posts[0]) return null;
  return posts[0];
}
