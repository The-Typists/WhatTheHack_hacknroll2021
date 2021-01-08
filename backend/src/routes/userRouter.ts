import router from 'express.Router()';

import { User } from "../models/User"

router.route('/').get((req, res) => {
    User.find()
        .then(User => res.json(User))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});
    newUser.save()
        .then(username => res.json(`New user: ${username} added.`))
        .catch(err => res.json('Error: ' + err));
});

module.exports = router;