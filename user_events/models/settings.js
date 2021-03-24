const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const SettingsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user_settings: [],

    user_id:{
        type: String,
        required:true,
        unique: true
    }
});

module.exports = mongoose.model('Settings', SettingsSchema)
