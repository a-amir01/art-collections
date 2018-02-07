/**
 * Created by amirassad on 11/10/17.
 */

// const express = require('express');
// const router = express.Router();
// const Painting = require('../models/painting');
// const PaintingCategory = require('../models/categories');
//
// router.route('/gallery')
//     .get((req, res, next) =>{
//         // console.log("GET!!!!\n" ,req.body);
//         //get all paintings in database
//         Painting.find((err, paintings) => {
//             if(err)
//                 throw err;
//             res.json(paintings)
//         });
//
//     })
//     .post((req, res, next) =>{
//         console.log("POST!!!!\n" ,req.body);
//         const painting = req.body; //copy array
//         Painting.create(painting, function(err, paintings) {
//             console.log("WHYYYYYYYYY");
//             if(err) {
//                 console.log("FUCK");
//                 throw err;
//             }
//             console.log("painting", paintings);
//             res.json(paintings);
//         });
//     });
//
// router.route('/gallery/:_id')
//     .get((req, res, next) => {
//         Painting.findById(req.params._id, (err, painting) => {
//             if(err)
//                 res.send(err);
//             res.json(painting);
//         });
//     });