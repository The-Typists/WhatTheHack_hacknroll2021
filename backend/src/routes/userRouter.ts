import { Router } from "express";

import { User } from "../models/User";

const router = Router();

router.route("/").get((req, res) => {
  User.find()
    .then((User: any) => res.json(User))
    .catch((err: any) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body);
  const username: String = req.body.username;
  const password: String = req.body.password;
  console.log(username);
  console.log(password);
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((username) => res.json(`New user: ${username} added.`))
    .catch((err) => res.json("Error: " + err));
});

export const usersRouter = router;
