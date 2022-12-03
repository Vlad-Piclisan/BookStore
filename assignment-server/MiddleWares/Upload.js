const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const config = require("../config")

const storage = new GridFsStorage({
    url: config.uri,
    file:(req, file) => {
        const filename = `${Date.now()}-${file.originalname}`;
        return {
            filename,
            bucketName: config.bucketName
        }
        
    }
})


module.exports = multer({storage})
