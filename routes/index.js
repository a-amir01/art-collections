
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
            console.log("FUCKK");
            res.json(paintings);
        });
    });
// /*TODO*/
// router.route('/gallery/category/:title')
//     .get((req, res, next) => {
//         console.log("/api/gallery/:category\n", req.params.title);
//         const body = {
//             category: req.params.category,
//         };
//
//         Painting.find(body, (err, paintings) => {
//             if(err)
//                 throw err;
//             res.json(paintings)
//         })
//     });

router.route('/painting/:_id')
    .put((req, res) => {
        const painting = req.body;
        const paintingId = req.params._id;
        console.log(JSON.stringify(painting));
        console.log(paintingId);

        const update = {
            '$set': painting
        };

        Painting.findByIdAndUpdate(paintingId, update, { new : true }, (err, painting) => {
            if(err) {
                console.log("THROWING ERROR\n\n");
                res.json(err);
            }

            res.json(painting);
        });

    })
    .delete((req, res) => {
        const query = {
            _id: req.params._id
        };

        Painting.remove(query, (err, painting) => {
            if(err)
                res.json(err);

            res.json(painting);
        });

    });

router.route('/gallery/:_category')
    .get((req, res, next) => {
        console.log("GALLERY\n\n\n");
        Painting.find({ category: req.params._category }, (err, painting) => {
            if(err)
                res.send(err);
            res.json(painting);
        });
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

module.exports = router;

