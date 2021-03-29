const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const FileSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    user_id:{
        type: String,
        required: true
    },

    file:{
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Events', EventTypeSchema)
