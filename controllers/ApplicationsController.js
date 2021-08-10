const  applicationService = require('../services/applicationsService')


const index = async (req,res) => {
    try{
        let apps = await applicationService.getAllApplications()
        return apps
    }
    catch(error){
        return res.json({error})
    }
}

const create = async (req,res) => {
    try {
        let app = await applicationService.addApplication(req)
        return res.json(app)
    } catch (error) {
        return res.status(422).json({error})
    }
}

const find = async (req,res,next) => {
    try{
        let app = await applicationService.getApplication(req.params.Application_id)
        req.mainObject = app
        req.application = app
    }catch(error){
        return res.json({error})
    }
}

const destroy = async (req,res) => {
    try {
        let app = await applicationService.deleteApplication(req)
        return res.json(app)
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {index, create, find, destroy }