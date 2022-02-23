import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import { insertPost, getPost } from "../../../lib/db/post";
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
  // if (!session) {
  //   console.log("POST_API: ", session.user);
  // }

  console.log("BY", req.query.by);

  if (req.method === "GET") {
    try {
      const posts = await getPost(
        req.query.before ? new Date(req.query.before) : undefined,
        req.query.by,
        req.query.limit ? parseInt(req.query.limit, 10) : undefined
      );
      res.json({ posts });
      console.log("POST", posts);
    } catch (error) {
      res.json({ error });
    }
  }

  if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        multiples: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // for single data.files.image.filepath
    // for multiple data.files.images.img.filepath
    const values = Object.values(data.files);

    const upload = values.map(async (img) => {
      return await cloudinary.v2.uploader.upload(img.filepath);
    });

    Promise.all(upload)
      .then(async (result) => {
        const imgArray = [];

        result.forEach((img) => {
          imgArray.push(img.secure_url);
        });

        const post = await insertPost({
          userId: new ObjectId(session.user._id),
          content: data.fields.content,
          images: imgArray,
        });

        if (!post) throw error;
      })
      .catch((e) => console.log(e));
    return res.json(data);
  }
};
