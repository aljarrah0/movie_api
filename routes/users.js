const express = require('express');
const router = express.Router();
const { validate, User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check the user is registration or not
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send('the user already registration');

    user = await new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'phone', 'password', 'isAdmin']));

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.header('x-auth-token', user.generateToken()).send(_.pick(user, ['firstName', 'lastName', 'email', 'phone', 'isAdmin',]));
});

router.get('/me', auth, async (req, res) => {
    // variable --> {req.user} from the auth middleware
    const user = await User.findById(req.user._id).select('-password -_id -__v');
    // not use the if(!user) because already user exists ------> if (!user) return res.status(404).send('not found user');
    res.send(user);
});

module.exports = router;