const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('the email / password invalid');

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('the email / password invalid');

    res.header('x-auth-token',user.generateToken());
});

function validate(user) {
    let schema = {
        email: Joi.string().trim().min(7).max(30).required(),
        password: Joi.string().trim().min(7).max(30).required(),
    }
    return Joi.validate(user, schema);
}

module.exports = router;