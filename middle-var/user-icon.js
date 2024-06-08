
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './views/uploads')
    },
    filename : (req , file , cb) => {
        let rename = 'upload' + Date.now() + file.originalname;
        cb(null , rename)
    }
})

const user_upload = multer({storage});

module.exports = user_upload;