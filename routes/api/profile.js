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
        
        // Build Profile Object
        const profileFields = {};

        profileFields.user = req.user.id;

        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        // Skills Array
        if(skills){
            profileFields.skills = skills.split(',').map(item => item.trim())
        }

        // Build Social Object
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;
        
        try{
            let profile = await Profile.findOne({user:req.user.id});
           if(profile){
                // Update
                profile = await Profile.findOneAndUpdate({user:req.user.id}, {$set : profileFields}, {new:true});
                // Starting my work again
           } 
        }catch(err){

        }
        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    } 
});



module.exports = router; 