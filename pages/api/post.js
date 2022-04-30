import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import { insertPost, getPostBy } from "@/lib/db/post";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  // Get the user from session
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const posts = await getPostBy(
        req.query.before ? new Date(req.query.before) : undefined,
        req.query.by,
        req.query.like,
        req.query.limit ? parseInt(req.query.limit, 16) : undefined
      );
      res.json({ posts });
    } catch (error) {
      res.json({ error });
    }
  }

  if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({ multiples: true });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // Tags
    const values = Object.values(JSON.parse(data?.fields?.tags));

    // for single data.files.image.filepath
    // for multiple data.files.images.img.filepath
    const filePath = data?.files?.image.filepath;

    await cloudinary.v2.uploader
      .upload(filePath)
      .then(async (result) => {
        const post = await insertPost({
          userId: new ObjectId(session.user._id),
          content: data.fields.content,
          images: result.secure_url,
          tags: values,
        });

        if (!post) throw error;
      })
      .catch((e) => console.log(e));
    return res.json(data);
  }
};
