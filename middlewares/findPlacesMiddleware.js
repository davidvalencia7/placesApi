const Place = require('../models/Place')

module.exports = async (req,res,next) => {
    try{
        let place = await Place.findOne({slug: req.params.slug})
        console.log("MiddlewarePlace:",place)
        req.place = place
        req.mainObj = place
        next()
    }catch(err) {
        next(err)
    }
}