import { findPostById } from "@/lib/db/post";
import { updatePostLike, getPostsLikedBy } from "@/lib/db/post";
import { updatePostUnlike } from "@/lib/db/post";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  try {
    const { postId } = req.query;

    const post = await findPostById(postId);

    const likeIds = post.likes.map((id) => id.toString());

    const userId = session.user._id;

    if (req.method === "PUT") {
      if (likeIds.includes(userId)) {
        const response = await updatePostUnlike(postId, userId);
        return res.json({ response });
      } else {
        const response = await updatePostLike(postId, userId);
        return res.json({ response });
      }
    }

    if (req.method === "GET") {
      const data = await getPostsLikedBy(userId);
      return res.json({ data });
    }
  } catch (error) {
    res.json({ error });
  }
};
export default handler;
