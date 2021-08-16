const userService = require('../services/userService')
const User = require('../models/User')


const index = async (req, res) => {
     let users = await userService.getAllUsers()
     console.error(users);
     res.json(users)
}

const create = async (req,res, next) => {
    try{
        let user = await userService.addUser(req,res)
        req.user = user
        next()
        //return res.json(user)
    }
    catch(error){
        return res.json(error)
    }
        
}

const myplaces = async (req, res, next) => {
    try{
        console.log("controller:",req.user)
        let places = await userService.getMyPlaces(req.user.id)
        //console.log("otro controller:",places);
        return res.json(places)
    
    }catch(error){
        return res.json(error)
    }
}

const show = async (req,res,next) => {
    console.log(req.body)

}

const update = async (req,res,next) => {

}

const destroy = async  (req,res,next) => {

}



module.exports = { index, create, myplaces, show, update, destroy }