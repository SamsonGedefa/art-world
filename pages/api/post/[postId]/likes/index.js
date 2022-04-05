import { findPostById } from "@/lib/db/post";
import { updatePostLike } from "@/lib/db/post";
import { updatePostUnlike } from "@/lib/db/post";
import { getSession } from "next-auth/react";

export default async function (req, res) {
  const session = await getSession({ req });

  const { postId } = req.query;

  const post = await findPostById(postId);

  const likeIds = post.likes.map((id) => id.toString());
  const userId = session.user._id.toString();

  if (likeIds.includes(userId)) {
    await updatePostUnlike(postId, userId);
  } else {
    await updatePostLike(postId, userId);
  }

  return res.json({ post });
}
