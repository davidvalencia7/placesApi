const User = require("../models/User")

module.exports = async (req,res,next) => {
    if(req.user){
        let user = await User.findById(req.user.id)
        req.fullUser = user
        next()
    }
    else{
        next()
    }
}