const buildParams = require('./helpers').buildParams

const validParams = ['origins','name']

const Application = require('../models/Application')

const getAllApplications = async () => {
    let apps = await Application.find()

    return apps
}

const addApplication = async (req) => {
   let params = buildParams(validParams, req.body)

   let app = await Application.create(params)
   return app
}

const getApplication = async (id) => {
    let app = await Application.findById(id)
   return app
}

const deleteApplication = async (req) => {
    //console.log(req)
    let app = await req.application.remove()
    return app
}

module.exports = { getAllApplications, addApplication, getApplication, deleteApplication }