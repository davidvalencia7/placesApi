const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('../models/Uploader')
const slugify = require('../plugins/slugify')

const Visit = require('../models/Visit')

let placeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        unique : true
    },
    description : String,
    address : String,
    acceptsCreditCard : {
        type : Boolean,
        default: false
    },
    coverImage : String,
    avatarImage : String,
    openHour : Number,
    closeHour : Number,
    _user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

placeSchema.methods.updateImage = function(path,imageType) {
    //primero subir la imagen
    // guardar el lugar
    return uploader(path)
            .then( secure_url => this.saveImageUrl(secure_url,imageType))
}

placeSchema.methods.saveImageUrl = function(secureUrl, imageType) {
    this[imageType+'Image'] = secureUrl
    console.log("Save Image:",this)
    return this.save()
}

placeSchema.pre('save', function(next) { //antes de guardar
    if(this.slug) return next()
    generateSlugAndContinue.call(this,0,next)
})

placeSchema.statics.validateSlugCount = function(slug){
    return Place.count({slug : slug}).then(count =>{
        if(count > 0) 
            return false
        return true
    })
}

placeSchema.virtual('visits').get(function(){
    return Visit.find({'_place' : this._id}).sort('_id');
} )

placeSchema.plugin(mongoosePaginate)

function generateSlugAndContinue(count,next){
    this.slug = slugify(this.title)
    //console.log("cont:",count)

    if(count != 0)
        this.slug = this.slug + "-"+count
        //console.log(this)

    Place.validateSlugCount(this.slug).then( isValid => {
        if(!isValid)
            return generateSlugAndContinue.call(this,count+1,next)

            next()
    })

}

let Place = mongoose.model('Place', placeSchema)

module.exports = Place