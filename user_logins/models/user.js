const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


const User = mongoose.model('User', userSchema);
module.exports = User;