const { Router } = require('express');
const { APIError } = require('../MiddleWares/ErrorHandler');
const { RequestWrapper } = require('../MiddleWares/RequestWrapper');
const tokenParser = require('../MiddleWares/TokenParser');
const router = Router();
const { createBook, getAllBooks, getBookByID, deleteBook, updateBook } = require("../Services/BookService")
const upload = require("../MiddleWares/Upload")
const mongoose = require("mongoose")
const config = require("../config")

router.get('/books', RequestWrapper(async (req, res) => {


    res.send(await getAllBooks());


}))

router.get("/books/:id",RequestWrapper(async (req,res) => {
      const book = await getBookByID(req.params.id);
    if(!book){
    
        throw new APIError(404, "Book not found");
    }
    res.send(book);
    }))

router.post('/books', upload.single("file"), tokenParser(true), RequestWrapper(async (req, res) => {
    if(!req.file){
        throw new APIError(400, "Image is required!");
    }

    res.send(await createBook({
        ...req.body,
        coverImage:req.file.filename
    }));
}))

router.put('/books/:id',upload.single("file"), tokenParser(true), RequestWrapper(async (req, res) => {
    if(!req.file){
        throw new APIError(400, "Image is required!");
    }

    const book = await updateBook(req.params.id, {
        ...req.body,
        coverImage:req.file.filename
    })
    if (book) {
        res.send(book)
    }
    else throw new APIError(404, "Book not found")
}))

router.delete('/books/:id', tokenParser(true), RequestWrapper(async (req, res) => {
    const book = await deleteBook(req.params.id)
    if (book) {
        res.send(book)
    }
    else throw new APIError(404, "Book not found")
}))

router.get("/picture/:filename", RequestWrapper(async (req, res) => {
    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: config.bucketName
    });
    const filename = req.params.filename;
    const result = gfs.find({ filename });
    const files = await result.toArray();
    if(files.length && files[0]._id){
        const readStream = gfs.openDownloadStream(files[0]._id)
        readStream.pipe(res)
    }else {
        throw new APIError(404, "File not found")
    }
}))

router.put("/picture", upload.single("file"), RequestWrapper((req,res) => {
    if(!req.file){
        throw new APIError(400, "Image is required!");
    }

    
    const imageURL = `${req.protocol}://${req.get("host")}/picture/${req.file.filename}`;
    res.send({
        imageURL,
        filename:req.file.filename
    })
}))


module.exports = router;