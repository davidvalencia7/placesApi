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

module.exports = { index, create }