const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: { required: [true,"Title is required"], type: String},
    description: { required: true, type: String},
    author: { required: true, type: String},
    price: { required: true, type: Number},
    coverImage: { type: String }

});

const Book = mongoose.model('Book', bookSchema);
module.exports= Book;