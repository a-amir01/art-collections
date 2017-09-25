
const express = require('express');
const router = express.Router();
const Painting = require('../models/painting');
const PaintingCategory = require('../models/categories');
const fs = require('fs');
const multer  = require('multer');

router.route('/gallery')
    .get((req, res, next) =>{
        console.log("GET!!!!\n" ,req.body);
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

router.route('/category')
    .get((req, res, next) => {
        PaintingCategory.find((err, categories) => {
            if(err)
                throw err;
            res.json(categories)
        });
    })
    .post((req, res, next) => {
        console.log("BODY ", req.body);
        const category = req.body; //copy array
        PaintingCategory.create(category, (err, categoryObj)=>{
            if(err)
                throw err;
            console.log("added ", req.body, "categoryObj ", categoryObj);
            res.json(categoryObj);
        });
    });

router.route('/category/:_id')
    .delete((req, res) => {
        const query = {_id: req.params._id};
        PaintingCategory.remove(query, (err, categories) => {
            if (err) {
                console.log(err);
                return handleError(err);
            }
            // console.log("RES\n", categories);
            res.json("success");
            // removed!
        });
    });



    // var fs = require('fs');

    // function readFiles(dirname, onFileContent, onError) {
    //     fs.readdir(dirname, function(err, filenames) {
    //         if (err) {
    //             onError(err);
    //             return;
    //         }
    //         filenames.forEach(function(filename) {
    //             fs.readFile(dirname + filename, 'utf-8', function(err, content) {
    //                 if (err) {
    //                     onError(err);
    //                     return;
    //                 }
    //                 onFileContent(filename, content);
    //             });
    //         });
    //     });
    // }

const dest = process.env.NODE_ENV !== 'production' ? './client/public/uploads/' : './client/build/uploads/';

const storage = multer.diskStorage({
    destination: dest,
    filename(req, file, callBack) {
        const name = (file.originalname).replace(/ /g, "");
        callBack(null, name);
    },
});

const upload = multer({ storage });
router.route('/file')
    .post(upload.single('file'), (req, res, next) => {
        //res.json(req.file);
        console.log("good\n\n");
       //file is already of disk
    });



module.exports = router;

