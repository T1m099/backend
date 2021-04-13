const mongoose = require('mongoose');

const { Schema } = mongoose;


//schema for a medication the user has to take in --> all medications of a user together is the medication plan
const MedicationSchema = new Schema({
	uniquenessCheck: {
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
        type: String,
        required: true
    },

	reminders: { type: Array },

    user_id:{
        type: String,
        required:true
    }

});

module.exports = mongoose.model('Medication', MedicationSchema);
