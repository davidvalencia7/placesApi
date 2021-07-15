const visitService = require('../services/visitService')


const index = async (req, res, next) => {
    //req.user
    try{
        
    }catch(err){
        return res.json({err})
    }
    
}

const create = async (req , res) => {
    try{
        let visit = await visitService.addVisit(req)
        return res.json(visit)
    }catch(err){
        console.log(err);
        return res.status(422).json({err})
    }

}

const find = async (req , res, next) => {
    try{
        let visit = await visitService.getVisit(req.params.visit_id)
        //console.log(favorite)
        req.mainObj = visit
        req.visit = visit
        next()
    }catch(err){
        return res.json({err})
    }
    
}

const update = async (req , res) => {

}

const destroy = async (req, res) => {
    try{
        let visit = await visitService.deleteVisit(req)
        return res.json(visit)
    }catch( err ) {
        return res.status(500).json({err})
    }
}



module.exports = { index, create, find, update, destroy }