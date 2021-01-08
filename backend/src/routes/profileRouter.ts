import { Router } from "express";

import { Profile } from "../models/Profile";

const router = Router();

router.route("/").get((req, res) => {
    Profile.find()
        .then((profile: any) => res.json(profile))
        .catch((err: any) => res.json("Error: " + err));
})

router.route("/update/:id").post(async (req, res) => {
    const user = req.params.id;
    const totalAttempts = req.body.totalAttempts;
    const totalCharacter: number = req.body.totalCharacters;
    const totalWords = req.body.totalWords;
    const totalTime = req.body.totalTime;
    
    try {
        const newProfile = await Profile.updateProfile(user, totalAttempts, totalCharacter, totalWords, totalTime);
        res.json(newProfile.toJSON());
    } catch (err) {
        res.json('Error for update: ' + err);
    }
});

export const profileRouter = router;