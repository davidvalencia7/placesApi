const placesService = require('../services/placesService')



const index = async (req, res) => {
    //todos los lugares
    await placesService.allPlaces(req)
        .then(docs => {
            return res.json(docs)
        })
        .catch(err => {
            return res.json(err)
        })
    }

const create = async (req,res) => {
    //crear nuevos lugares
    await placesService.addPlace(req)
            .then( doc => {
                return res.json(doc)
            })
            .catch(err => {
                return res.json(err)
            })
}

const show = async (req,res) => {
    //busqueda individual
    await placesService.getPlace(req.params.id)
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                return res.json(err)
            })
}

const update =  async (req,res) => {
    //actualizar un recurso
    await placesService.updatePlace(req)
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                return res.json(err)
            })
}

const destroy = async (req,res) => {
    //eliminar recurso
    await placesService.deletePlace(req.params.id)
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                return res.json(err)
            })
}


module.exports = { index, create, show, update, destroy }