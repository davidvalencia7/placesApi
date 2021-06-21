const express = require('express')
const { MulterError } = require('multer')

let router = express.Router()

const placesController = require('../controllers/PlacesController')


router.route('/')
    .get(placesController.index)
    .post(
        placesController.multerMiddleware(),
        placesController.create,
        placesController.saveImage
    )

    router.route('/:slug')
    .get(placesController.show)
    .put(placesController.update)
    .delete(placesController.destroy)



module.exports = router