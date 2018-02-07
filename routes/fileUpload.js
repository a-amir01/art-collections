/**
 * Created by amirassad on 9/26/17.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer  = require('multer');

const dest = process.env.NODE_ENV !== 'production' ? './client/public/uploads/' : './client/build/uploads/';

const storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, callBack) {
        const name = (file.originalname).replace(/ /g, "");
        callBack(null, name);
    },
});

function getFileNames() {
    let names;
    fs.readdir(dest, (err, files) => {
        if(err)
            console.log(err);
        return files;
    });
}

// https://goenning.net/2016/02/10/simple-server-side-cache-for-expressjs/
// https://stackoverflow.com/questions/44171497/express-multer-filefilter-error-handling
function fileFilter(req, file, cb){

    cb(null, true);
}

const upload = multer({ storage: storage });

router.route('/')
    .post(upload.single('file'), (req, res, next) => {
        //res.json(req.file);
        console.log("POSTING!!!\n\n");
        //file is already of disk
        res.send("uploaded");
    });

module.exports = router;