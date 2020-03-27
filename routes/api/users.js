const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User');
// @route   GET api/users
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send("User Route"));

// @route   POST api/users
// @desc    Test Route
// @access  Public
router.post('/', [
    // name should not be empty
    check('name', 'Name is Required').notEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
 
    // see if user Exists

    // Get users Gravatar

    // Encrypt Password

    // Return Jsonwebtoken

    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     date: req.body.date+
    // });
    console.log(req.body);
    res.send("User Route");
});

module.exports = router;