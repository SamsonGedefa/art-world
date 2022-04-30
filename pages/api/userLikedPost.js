import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { getUserLikedPost } from "@/lib/db/post";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const posts = await getUserLikedPost(
        req.query.before ? new Date(req.query.before) : undefined,
        req.query.by,
        req.query.limit ? parseInt(req.query.limit, 10) : undefined
      );
      res.json({ posts });
    } catch (error) {
      res.json({ error });
    }
  }
};

export default handler;
