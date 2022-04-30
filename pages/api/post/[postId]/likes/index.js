import { findPostById } from "@/lib/db/post";
import { updatePostLike, getPostsLikedBy } from "@/lib/db/post";
import { updatePostUnlike } from "@/lib/db/post";
import { getSession } from "next-auth/react";
import { useLocalStorage } from "@/lib/useLike";

const handler = async (req, res) => {
  const session = await getSession({ req });

  const { postId } = req.query;

  const post = await findPostById(postId);

  const likeIds = post.likes.map((id) => id.toString());

  const userId = session.user._id.toString();

  if (req.method === "PUT") {
    if (likeIds.includes(userId)) {
      const response = await updatePostUnlike(postId, userId);
      console.log("RES:DATA", response);
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
};
export default handler;
