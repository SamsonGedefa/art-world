import { findComments, insertComment } from "@/lib/db/comment";
import { findPostById } from "@/lib/db/post";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const comments = await findComments(
        req.query.postId,
        req.query.before ? new Date(req.query.before) : undefined,
        req.query.limit ? parseInt(req.query.limit, 10) : undefined
      );
      return res.json({ comments });
    } catch (error) {
      return res.json({ error });
    }
  }

  if (req.method === "POST") {
    const session = await getSession({ req });

    const content = req.body.content;

    const post = await findPostById(req.query.postId);

    if (!post) {
      return res.status(404).json({ error: { message: "Post is not found." } });
    }

    const comment = await insertComment(post._id, {
      creatorId: new ObjectId(session.user._id),
      content,
    });

    return res.json({ comment });
  }
};

export default handler;
