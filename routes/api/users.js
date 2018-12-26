const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Router = express.Router();

const User = require('../../models/User');

const secret = require('../../config/keys').secretOrKey;

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST /api/users/register
// @desc    Allows user registration
// @access  Public
Router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ name: req.body.name })
        .then(user => {
            if (user) {
                errors.name = "Username already exists";
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    platinum: req.body.platinum
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route   POST /api/users/login
// @desc    Logins in user
// @access  Public
Router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ name: req.body.name })
        .then(user => {
            if (!user) {
                errors.name = "Username doesn't exist";
                return res.status(404).json(errors);
            }

            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name, email: user.email };
                        jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
                            return res.json({ success: true, token: `Bearer ${token}` });
                        });
                    } else {
                        errors.password = "Incorrect password";
                        return res.status(400).json(errors);
                    }
                });
        });
});

module.exports = Router;