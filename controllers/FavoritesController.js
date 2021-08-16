const favoriteService = require('../services/favoritesService')


const index = async (req, res, next) => {
    //req.user
    try{
        console.log("index favorites")
        if(!req.fullUser)return res.json({})

        let fav = await favoriteService.getAllFavorites(req)
        console.log("Fav controller:",fav)
        //req.mainObj = fav
        //req.favorite = fav
        res.json(fav)
    }catch(err){
        return res.json({err})
    }
    
}

const create = async (req , res) => {
    try{
        let favorite = await favoriteService.addFavorite(req)
        return res.json(favorite)
    }catch(err){
        console.log(err);
        return res.status(422).json({err})
    }

}

const find = async (req , res, next) => {
    try{
        let favorite = await favoriteService.getFavorite(req.params.id)
        //console.log(favorite)
        req.mainObj = favorite
        req.favorite = favorite
        next()
    }catch(err){
        return res.json({err})
    }
    
}

const update = async (req , res) => {

}

const destroy = async (req, res) => {
    try{
        let favorite = await favoriteService.deleteFavorite(req)
        return res.json(favorite)
    }catch( err ) {
        return res.status(500).json({err})
    }
}



module.exports = { index, create, find, update, destroy }