const dotenv = require("dotenv")
dotenv.config();

const config = {
    uri: process.env.MONGO_URI,
    bucketName:process.env.BUCKET_NAME,
    port: process.env.PORT,
    tokenEncryption: process.env.TOKEN_ENCRYPTION
}

module.exports = config;