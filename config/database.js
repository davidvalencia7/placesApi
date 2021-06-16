const mongoose = require('mongoose')

const dbName = 'places_facilito'
const mongoConnectionString = 'mongodb://localhost/'+dbName

module.exports = {
    connect : () => mongoose.connect(mongoConnectionString,{useNewUrlParser: true, useUnifiedTopology: true}),
    dbName,

    connection : () => {
        if(mongoose.connection)
            return mongoose.connection;
        return this.connect()
    }
}