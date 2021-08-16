const  applicationService = require('../services/applicationsService')


const index = async (req,res) => {
    try{
        let apps = await applicationService.getAllApplications()
        return res.json(apps)
    }
    catch(error){
        return res.json({error})
    }
}

const create = async (req,res,next) => {
    try {
        console.log("ÇREATE----------------")
        let app = await applicationService.addApplication(req)
        return res.json(app)
    } catch (error) {
        return res.status(422).json({error})
    }
}

const find = async (req,res,next) => {
    try{
        //console.log("params",req.params);
        let app = await applicationService.getApplication(req.params.id)
        req.mainObject = app
        req.application = app
        next()
    }catch(error){
        return res.json({error})
    }
}

const destroy = async (req,res,next) => {
    try {
        let app = await applicationService.deleteApplication(req)
        return res.json(app)
    } catch (error) {
        //console.error(error);
        return res.status(500).json({error})
    }
}

module.exports = {index, create, find, destroy }