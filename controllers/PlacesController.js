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

const create =  (req,res,next) => {
    //crear nuevos lugares
    placesService.addPlace(req)
            .then( doc => {
                req.place = doc
                //console.log("desde controller:",req.place)
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
    let place = await placesService.getPlace(req)

    return res.json(place)

}

const update =  async (req,res) => {
    //actualizar un recurso
    try{
        let place = await placesService.updatePlace(req)
        console.log("update:",place)
        return res.json(place)
    }catch(err){
        return res.json(err)
    }

}

const destroy = async (req,res) => {
    //eliminar recurso
    let place = await placesService.deletePlace(req)

    return res.json(place)

}


const multerMiddleware = () => {
    console.log("midleware")
    return upload.fields([
        {name: 'avatar', maxCount:1},
        {name: 'cover', maxCount: 1}
    ])
}

const saveImage = (req, res) => {
    console.log("ultimo middleware",req.place)
    if(req.place){
        const files = ['avatar','cover']
        const promises = []

        files.forEach( imageType => {
            if(req.files && req.files[imageType]){
                const path = req.files[imageType][0].path
                promises.push(req.place.updateImage(path,imageType))
            }
        })

        Promise.all(promises).then( results => {
            res.json(req.place)
        })
        .catch(err => {
            res.json(err)
        })

    }
    else{
        res.status(422).json({
            error : req.error || 'Could not save place'
        })
    }
}


module.exports = { index, create, show, update, destroy, multerMiddleware, saveImage }