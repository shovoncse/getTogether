const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    // get Token from Header
    const token = req.header('x-auth-token')

    // Check if no token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    // verify token
    try{

    }catch(err){
        console.log(err.message)
        res.status(401).json({msg: 'Token is not valid'})
    }
}