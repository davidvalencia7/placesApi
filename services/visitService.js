const builParams = require('./helpers').buildParams

const validParams = ['_place','reaction','observation']

const Visit = require('../models/Visit')
const User = require('../models/User')

const getAllVisits = async (req) => {
    let promise = null

    if(req.place)
        promise = req.place.visits
    else if(req.user){
        promise = Visit.forUser(req.user.id, req.query.page || 1)
    }

    if(promise){
        let visits = await promise
        console.log("service visit:",visits)
        return  visits
    }
    
}

const addVisit = async (req) => {
    //console.log("Add Favorite:",req.body)
    let params = builParams(validParams,req.body)
    console.log("parametros:",params)
    params['_user'] = req.user.id
    //console.log("userid:",req.user.id)
    let visit = await Visit.create(params)
    return visit
}

const getVisit = async (id) => {
    let visit = await Visit.findById(id)
    return visit
}

const deleteVisit = async (req) => {
    let visit = await req.visit.remove()
    return visit
}


module.exports = { getAllVisits, addVisit, getVisit, deleteVisit }
