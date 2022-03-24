import { ObjectId } from "mongodb";
import { connectToDatabase } from "../middleware/database";
// import { dbProjectionUsers } from '.';

export async function findComments(postId, before, limit = 10) {
  const { db } = await connectToDatabase();
  return db
    .collection("comments")
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      //   { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertComment(postId, { content, creatorId }) {
  const { db } = await connectToDatabase();
  const comment = {
    content,
    postId: new ObjectId(postId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("comments").insertOne(comment);
  comment._id = insertedId;
  return comment;
}
