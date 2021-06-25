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
    //console.log("si heeeeeeeee:",req.user)
    params['_user'] = req.user.id
    let place = await Place.create(params)
    //console.log("desde servicices:",place)

    return  place
        
    
}

const getPlace = async (req) => {
    //let place = await Place.findOne({slug:slug})
    return req.place
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
    try{
      const params = helpers.buildParams(validParams,req.body)
      req.place = Object.assign(req.place,params)

      let place = await  req.place.save()
      console.log("service:",place)
      return place
    }catch(err){

      return {error : ''+ err }
    }

}

const deletePlace = async (req) => {
    //let place = await Place.findOneAndRemove({slug:slug})
    return await req.place.remove()
              
}


module.exports = { allPlaces,addPlace,getPlace,updatePlace,deletePlace }