const Place = require('../models/Place')

const getPlaceMidleware = async (req,res,next) => {
    await Place.findById(req.params.id)
        .then( place => {
            req.place = place
            next()
        })
        .then(err => {
            next(err)
        })
}

module.exports = { getPlaceMidleware}