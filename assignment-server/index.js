const Book = require("./Models/BookModel")
const express = require('express')
const config = require("./config")
const app = express()
const port = config.port
const cors = require('cors')
const bookRoutes = require("./Routes/BookRoutes")
const userRoutes = require("./Routes/UserRoutes")
const { MongoClient } = require("mongodb");
const uri = config.uri;

const mongoose = require('mongoose');
const { ErrorHandler } = require("./MiddleWares/ErrorHandler")
const configPassport = require("./Auth/Passport")

main().catch(err => console.log(err));

console.log(Book)
async function main() {
    await mongoose.connect(uri);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
app.use(cors());
app.use(express.json());
configPassport();
// app.use((req, res, next) => {
//     req.zotac="Zotac"
//     console.log(req.headers)
//     next();
// })
app.use(bookRoutes);
app.use(userRoutes);
app.use(ErrorHandler);




