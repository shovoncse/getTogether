const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User');
const gravatar = require('gravatar');

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
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;

    try {
        
        // see if user Exists
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        // Get users Gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        console.log(req.body);
        res.send("User Route");
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }


    // Encrypt Password

    // Return Jsonwebtoken
});

module.exports = router;