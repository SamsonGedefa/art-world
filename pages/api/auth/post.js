import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";

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
  const values = Object.values(data?.files);

  const upload = values.map(async (img) => {
    return await cloudinary.v2.uploader.upload(img.filepath);
  });

  Promise.all(upload)
    .then((result) =>
      // Save url to db
      result.forEach((img) => console.log("URL", img.secure_url))
    )
    .catch((e) => console.log(e));

  return res.json(data);
};
