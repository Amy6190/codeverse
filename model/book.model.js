const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    bname: { type: String, required: true, unique: true },
    aname: { type: String, required: true },
    price : {type:Number , default: 1},
    description : {type: String, required: true},
    image : {type: String, default:null},
    quantity: {type: Number, default: 1},
})

module.exports = mongoose.model('Book', Book)