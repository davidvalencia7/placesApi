const express = require('express')
let router = express.Router()

const authenticateOwner = require('../middlewares/authenticateOwner')
const visitController = require('../controllers/VisitController')

const jwtMiddleware = require('express-jwt')
const secrets = require('../config/secrets')

router.route('/')
    .get(jwtMiddleware({secret : secrets.jwtSecret, algorithms: ['HS256']}), visitController.index)
    .post(visitController.create)


router.route('/:visit_id')
    .delete(visitController.find, authenticateOwner, visitController.destroy)


module.exports = router