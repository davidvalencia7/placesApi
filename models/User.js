const mongoose = require('mongoose')
const mongooseBcrypt = require('mongoose-bcrypt')

const Place = require('./Place')
const FavoritePlace = require('./FavoritePlace')

let userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : String,
    admin : {
        type : Boolean,
        default : false
    }
})

userSchema.post('save', (user,next) => {
    User.count({}).then(count => {
        if(count == 1){
            User.updateOne({'_id': user._id},{admin : true })
                .then( result => {
                    next()
                })
            
        }else{
            next()
        }
    })
})

userSchema.virtual('places').get(function() {
    let places = Place.find({ '_user': this._id })
    console.log("mid: ",places)
    return places
    
})

userSchema.virtual('favorites').get(function(){
    return FavoritePlace.find({'_user': this._id},{'_place':true})
        .then(favs => {
            let placeIds = favs.map(fav => fav._place)

            return Place.find({'_id': {$in: placeIds}})
        })
})

userSchema.plugin(mongooseBcrypt)

const User = mongoose.model('User', userSchema)

module.exports = User