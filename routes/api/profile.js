const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @route   GET api/profile/me
// @desc    Test Route
// @access  Pr
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

// @route   POST api/profile
// @desc    Test Route
// @access  Public
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        // Get data from request
        const {
            status,
            company,
            website,
            location,
            skills,
            bio,
            githubusername,
            education,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;
        
        
        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    } 
});



module.exports = router; 