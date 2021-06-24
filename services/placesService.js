const Place = require('../models/Place')
const helpers = require('./helpers')

const validParams = ['title','description','address','acceptsCreditCard','openHour','closeHour']

const allPlaces = async (req) => {
     places = await Place.paginate({},{ page: req.query.page || 1, limit : 8, sort : {_id:-1} })
     return places
        
}

const addPlace = async (req) => {
    //let placeParams = {title, description, acceptsCreditCard, openHour,closeHour } = req.body
    const params = helpers.buildParams(validParams,req.body)
    console.log(req.user)
    params['_user'] = req.user.id
    let place = await Place.create(params)
    //console.log("desde servicices:",place)

    return  place
        
    
}

const getPlace = async (slug) => {
    let place = await Place.findOne({slug:slug})
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
        
    /*let placeParams = {title,description,acceptsCreditCard,openHour,closeHour} = req.body;

    let place = await Place.findOneAndUpdate(
          { slug: req.params.slug },
          placeParams
          ,{
            new:true
          })
        return place
    */
    
    const params = helpers.paramsBuilder(validParams,req.body)
    let place = await Place.findOneAndUpdate(
        { slug: req.params.slug },
        params
        ,{
          new:true
        })
 
    
    return place

}

const deletePlace = async (slug) => {
    let place = await Place.findOneAndRemove({slug:slug})
    return place
}


module.exports = { allPlaces,addPlace,getPlace,updatePlace,deletePlace }