const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('../models/Uploader')
const slugify = require('../plugins/slugify')

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
    acceptsCreditCard : {
        type : Boolean,
        default: false
    },
    coverImage : String,
    avatarImage : String,
    openHour : Number,
    closeHour : Number
})

placeSchema.methods.updateImage = function(path,imageType) {
    //primero subir la imagen
    // guardar el lugar
    return uploader(path)
            .then( secure_url => this.saveImageUrl(secure_url,imageType))
}

placeSchema.methods.saveImageUrl = function(secureUrl, imageType) {
    this[imageType+'Image'] = secureUrl
    console.log(this)
    return this.save()
}

placeSchema.pre('save', function(next) { //antes de guardar
    this.slug = slugify(this.title)
    next()
})

placeSchema.plugin(mongoosePaginate)

let Place = mongoose.model('Place', placeSchema)

module.exports = Place