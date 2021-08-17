const Applicaton = require('../models/Application')

module.exports = function(req,res,next){

    if(req.xhr) return next()

    const secret = req.headers.secret
    if(!secret) return next()

    Applicaton.findOne({secret})
        .then(app => {
            if(!app) return next(new Error('Invalid Application'))
            
            req.application = app
            next()
        
        })
        .catch(error => {
            next(error)
        })
}