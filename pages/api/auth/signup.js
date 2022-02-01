import isEmail from "validator/lib/isEmail";
import {
  insertUser,
  findUserByEmail,
  findUserByUsername,
} from "../../../api-lib/db/user";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  let { email, fullName, password, username } = req.body;

  if (!isEmail(email)) {
    res
      .status(400)
      .json({ error: { message: "The email you entered is invalid." } });
    return;
  }

  if (await findUserByEmail(email)) {
    res
      .status(403)
      .json({ error: { message: "The email has already been used." } });
    return;
  }

  if (await findUserByUsername(username)) {
    res
      .status(403)
      .json({ error: { message: "The username has already been taken." } });
    return;
  }

  const user = await insertUser({
    fullName,
    email,
    orginalPassword: password,
    username,
    bio: "",
  });

  if (!user) throw error;

  res.redirect(201, "/login"); // redirect after user is created
}

export default handler;
