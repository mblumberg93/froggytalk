const express = require('express');
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

router.get('/', (req, res, next) => {
    User.find({}, 'email username')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/', (req, res, next) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        res.json({ success: false, error: "Invalid user params" });
        next();
        return;
    }
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }).then((user) => {
        const token = jsonWebToken.sign({ id: user._id, username: user.username }, process.env.SECRET_JWT_TOKEN);
        res.json({ success: true, token: token });
        next();
    }).catch(err => {
        res.json({ success: false, error: err });
        next();
    });
});

router.delete('/:id', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/authenticate', (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, error: "Missing parameters" });
        next();
        return;
    }

    User.findOne({ username: req.body.username })
    .then((user) => {
        if (!user) {
            res.json({ success: false, error: "Username doesn't exist" });
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({ success: false, error: "Incorrect password" });
        } else {
            const token = jsonWebToken.sign({ id: user._id, username: user.username }, process.env.SECRET_JWT_TOKEN);
            res.json({ success: true, token: token });
        }
        next();
    })
});

module.exports = router;