const builParams = require('./helpers').buildParams

const validParams = ['_place']

const FavoritePlace = require('../models/FavoritePlace')

const addFavorite = async (req) => {
    console.log(req.body)
    let params = builParams(validParams,req.body)
    console.log("parametros:",params)
    params['_user'] = req.user.id

    let favorite = await FavoritePlace.create(params)
    return favorite
}

const getFavorite = async (id) => {
    let favorite = await FavoritePlace.findById(id)
    return favorite
}

const deleteFavorite = async (req) => {
    let favorite = await req.favorite.remove()
    return favorite
}


module.exports = { addFavorite, getFavorite, deleteFavorite }