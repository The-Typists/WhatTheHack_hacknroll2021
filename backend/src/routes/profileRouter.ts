import { Router } from "express";

import { Profile } from "../models/Profile";

const router = Router();

router.route("/").get((req, res) => {
    Profile.find()
        .then((profile: any) => res.json(profile))
        .catch((err: any) => res.json("Error: " + err));
})

router.route("/add/:id").post(async (req, res) => {
    const user = req.params.id;
    const wordsPerMinute = req.body.wordsPerMinute;
    
    try {
        const newProfile = await Profile.createProfile(user, wordsPerMinute)
        res.json(newProfile.toJSON());
    } catch (err) {
        res.json('Error: ' + err);
    }
});

export const profileRouter = router;