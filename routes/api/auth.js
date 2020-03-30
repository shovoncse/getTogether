const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


// @route   GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await (await User.findById(req.user.id)).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Test Route
// @access  Public
router.post('/', [
    // name should not be empty
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password is Required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {
        
        // see if email match
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        // Match Password
        // see if user Exists
        let isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }
        
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