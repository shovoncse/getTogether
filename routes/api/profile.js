const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @route   GET api/profile/me
// @desc    Test Route
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])

        if(!profile){
            return res.status(400).json({msg: 'There is no profile'})
        }

        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    } 
});

// @route   GET api/profile
// @desc    Test Route
// @access  Public
router.post('/', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])

        if(!profile){
            return res.status(400).json({msg: 'There is no profile'})
        }

        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    } 
});



module.exports = router; 