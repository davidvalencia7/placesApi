const Place = require('../models/Place')

const allPlaces = async () => {
     places = await Place.find({})
     return places
        
}

const addPlace = async (req) => {
    let placeParams = {title, description, acceptsCreditCard, openHour,closeHour } = req.body

    let place = await Place.create(placeParams)
    return  place
        
    
}

const getPlace = async (id) => {
    let place = await Place.findById(id)
    return place
}

const updatePlace = async (req) => {
    /*
        let attributes = ['title','description','atcceptsCreditCard','openHour','closeHour']
        let placeParams = {}
        attributes.forEach(attr => {
          if(Object.prototype.hasOwnProperty.call(req.body,attr))
            placeParams[attr] = req.body[attr]
        })
    */
        
    let placeParams = {title,description,acceptsCreditCard,openHour,closeHour} = req.body;
          
    let place = await Place.findByIdAndUpdate(
          req.params.id,
          placeParams
          ,{
            new:true
          })
        
    return place
}

const deletePlace = async (id) => {
    let place = await Place.findByIdAndRemove(req.params.id)
    return place
}

module.exports = { allPlaces,addPlace,getPlace,updatePlace,deletePlace }