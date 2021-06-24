const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const userService = require('../services/userService')


const authenticate = async (req,res,next) => {
    try{
        let user = await userService.getUser(req.body.email)
        let valid = await user.verifyPassword(req.body.password)
        //console.log("Valid:",valid)
        if(valid){
            req.user = user
            next()
        }else{
            console.log("error")
            next(new Error('Invalid Credential'))
        }
    }catch(error){
        next(error)
    }
}

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

module.exports = { generateToken, sendToken, authenticate }