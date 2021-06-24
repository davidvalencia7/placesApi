const userService = require('../services/userService')



const index = () => {

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

const show = async (req,res,next) => {

}

const update = async (req,res,next) => {

}

const destroy = async  (req,res,next) => {

}



module.exports = { index, create, show, update, destroy }