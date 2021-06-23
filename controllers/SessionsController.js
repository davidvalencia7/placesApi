const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')


const generateToken = (req,res,next) => {
    try{
    if(!req.user) return next()

        req.token = jwt.sign({id: req.user._id}, secrets.jwtSecret)

    next()

    }catch(error){
        res.json(error)
    }
}

const sendToken = (req, res) => {
    try{
        if(req.user){
            res.json({
                user : req.user,
                jwt : req.token
            })
        }else{
            res.status(422).json({
                error : 'Could not create user'
            })
        }
    }catch(error){
        res.json(error)
    }
}

module.exports = { generateToken, sendToken }