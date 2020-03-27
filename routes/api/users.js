const express = require('express');
const router = express.Router();
// const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User');
// @route   GET api/users
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send("User Route"));

// @route   POST api/users
// @desc    Test Route
// @access  Public
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date+
    });
    console.log(req.body);
    res.send("User Route");
});

module.exports = router;