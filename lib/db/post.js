import { connectToDatabase } from "../middleware/database";
import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

export async function insertPost({ userId, content, images, avatar }) {
  const post = {
    userId,
    content,
    images,
    avatar,
    likes: [],
    createdAt: new Date(),
  };

  const { db } = await connectToDatabase();

  const { insertId } = await db.collection("posts").insertOne({ ...post });

  post._id = insertId;

  return post;
}

export async function getPostBy(before, by, like, limit = 10) {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $match: {
          ...(by && { userId: new ObjectId(by) }),
          ...(like && { likes: { $in: [like] } }),
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
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .toArray();

  return posts;
}

export async function getPostsLikedBy(by) {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $match: {
          ...(by && { likes: { $in: [by] } }),
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
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
    ])
    .toArray();
  if (!posts[0]) return null;
  return posts[0];
}

export async function updatePostLike(postId, userId) {
  const { db } = await connectToDatabase();

  return db
    .collection("posts")
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $push: { likes: userId } }
    )
    .then(({ value }) => value);
}

export async function updatePostUnlike(postId, userId) {
  const { db } = await connectToDatabase();

  return db
    .collection("posts")
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $pull: { likes: userId } }
    )
    .then(({ value }) => value);
}
