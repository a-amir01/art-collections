
const express = require('express');
const router = express.Router();
const Painting = require('../models/painting');
const fs = require('fs');
const multer  = require('multer');

router.route('/gallery')
    .get((req, res, next) =>{
        console.log("POST!!!!\n" ,req.body);
        //get all paintings in database
        Painting.find((err, paintings) => {
            if(err)
                throw err;
            res.json(paintings)
        });

    })
    .post((req, res, next) =>{
        console.log("POST!!!!\n" ,req.body);
        const painting = req.body; //copy array
        Painting.create(painting, (err, paintings)=>{
            if(err)
                throw err;
            res.json(paintings);
        });
    });

router.route('/gallery/:category')
    .get((req, res, next) => {
        console.log("/api/gallery/:category\n", req.params.category);
        const body = {
            category: req.params.category,
        };

        Painting.find(body, (err, paintings) => {
            if(err)
                throw err;
            res.json(paintings)
        })
    });

const storage = multer.diskStorage({
    destination: './client/public/uploads',
    filename(req, file, callBack) {
        callBack(null, file.originalname);
    },
});

const upload = multer({ storage });
router.route('/file')
    .post(upload.single('file'), (req, res, next) => {
       //file is already of disk
    });

module.exports = router;

