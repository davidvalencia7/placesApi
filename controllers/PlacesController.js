const placesService = require('../services/placesService')
const upload = require('../config/upload')
const uploader = require('../models/Uploader')


const index =  (req, res) => {
    //todos los lugares
    let docs =  placesService.allPlaces(req)
    //res.json(docs) con async
        
    .then(docs => {
            return res.json(docs)
        })
        .catch(err => {
            return res.json(err)
        })
    
    }

const create = async (req,res,next) => {
    //crear nuevos lugares
    await placesService.addPlace(req)
            .then( doc => {
                req.place = doc
                next()
                //return res.json(doc)
            })
            .catch(err => {
                next(err)
                //return res.json(err)
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


const multerMiddleware = () => {
    return upload.fields([
        {name: 'avatar', maxCount:1},
        {name: 'cover', maxCount: 1}
    ])
}

const saveImage = (req, res) => {
    if(req.place){
        if(req.files && req.files.avatar){
            const path = req.files.avatar[0].path
            uploader(path).then( result => {
                console.log(result)
                res.json(req.place)
            })
            .catch(err => {
                res.json(err)
            })
        }
    }
    else{
        res.status(422).json({
            error : req.error || 'Could not save place'
        })
    }
}


module.exports = { index, create, show, update, destroy, multerMiddleware, saveImage }