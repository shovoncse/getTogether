const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }
        
        // Get users Gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        user = new User({
            name,email,avatar,password
        })
        // Encrypt Password
        const salt =  await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return Jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000  }, 
            (err, token)=>{
            if(err) throw err
            res.json({token})}
            )
            
        res.send("User Registered");
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }



});

module.exports = router;