const mongoose = require('mongoose');

const  User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : {type:Number , default: 0}
})

module.exports = mongoose.model('User', User)