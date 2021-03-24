const mongoose = require('mongoose');


const {Schema} = mongoose;

const MedicationSchema = new Schema({
    _id: {
        type:String,
        unique: true,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: String,

    unit:{
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    reminders:[],

    user_id:{
        type: String,
        required:true
    }

});

module.exports = mongoose.model('Medication', MedicationSchema)









