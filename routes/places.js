const express = require('express')
const { MulterError } = require('multer')

let router = express.Router()

const findPlaceMiddleware = require('../middlewares/findPlacesMiddleware')

const placesController = require('../controllers/PlacesController')


router.route('/')
    .get(placesController.index)
    .post(
        placesController.multerMiddleware(),
        placesController.create,
        placesController.saveImage
    )

    router.route('/:slug')
    .get(findPlaceMiddleware, placesController.show)
    .put(findPlaceMiddleware, placesController.update)
    .delete(findPlaceMiddleware, placesController.destroy)



module.exports = router