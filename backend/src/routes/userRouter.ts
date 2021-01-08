import { Router } from "express";

import { User } from "../models/User";

const router = Router();

router.route("/").get((req, res) => {
  User.find()
    .then((User: any) => res.json(User))
    .catch((err: any) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  try {
    const newUser = await User.createUser(username, password);
    res.json(newUser.toJSON());
  } catch (err) {
    res.json("Error: " + err);
  }
});

export const usersRouter = router;
