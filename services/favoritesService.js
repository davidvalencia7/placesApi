const builParams = require('./helpers').buildParams

const validParams = ['_place']

const FavoritePlace = require('../models/FavoritePlace')
const User = require('../models/User')

const getAllFavorites = async (req) => {
    console.log("service favorites:",req.user.id)
    let user = await User.findOne({'_id':req.user.id})
    console.log(user)
    favorites = await user.favorites
    console.log(favorites)
    return favorites
}

const addFavorite = async (req) => {
    //console.log("Add Favorite:",req.body)
    let params = builParams(validParams,req.body)
    //console.log("parametros:",params)
    params['_user'] = req.user.id
    //console.log("userid:",req.user.id)
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


module.exports = { getAllFavorites, addFavorite, getFavorite, deleteFavorite }