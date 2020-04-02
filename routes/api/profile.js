const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// @route   GET api/profile/me
// @desc    Test Route
// @access  Private
router.get('/', auth, (req, res) => {
    res.send("Profile Route")
});


module.exports = router; 