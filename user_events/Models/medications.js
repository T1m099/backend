const mongoose = require('mongoose');


const {Schema} = mongoose;

const MedicationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: String,
    //unit: Decimal128,
    number: {
        type: Number,
        required: true
    }
    //UID:
});

module.exports = mongoose.model('Medication', MedicationSchema)









