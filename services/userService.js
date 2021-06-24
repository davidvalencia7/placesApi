const User = require('../models/User')
const buildParams = require('./helpers').buildParams

const validParams = ['email','name','password']

const getAllUsers = async () => {
    
}

const addUser  = async (req,res) => {
    try {
        let params = buildParams(validParams,req.body)
        return await User.create(params)
    } catch (error) {
        //console.log("error desde service",error)
        return res.status(422).json(error)
    }
    
}

const getUser = async (email) => {
    let user = await User.findOne({email : email})
    return user
}

const updateUser = async (req,res) => {

}

const deleteUser = async (req,res) => {

}

module.exports = { addUser, getUser }