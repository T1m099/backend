const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    }
});



module.exports = mongoose.model('User', userSchema);