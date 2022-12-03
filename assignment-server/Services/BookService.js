const Book = require("../Models/BookModel");

function createBook(bookPayload) {
    return Book.create(bookPayload);
}

function updateBook(bookID, bookPayload) {
    return Book.findByIdAndUpdate(bookID ,bookPayload);
}

function deleteBook(bookID) {
    return Book.findByIdAndDelete(bookID);
}

function getBookByID(bookID) {
    return Book.findById(bookID);
}

function searchBooks() {

}

function getAllBooks() {
    return Book.find();
}

exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getBookByID = getBookByID;
exports.searchBooks = searchBooks;
exports.getAllBooks = getAllBooks;