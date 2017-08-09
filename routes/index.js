"use strict";

const express = require('express');
const router = express.Router();
const Painting = require('../models/painting');

router.route('/gallery')
    .get((req, res, next) =>{
        //get all paintings in database
        Painting.find((err, paintings) => {
            if(err)
                throw err;
            res.json(paintings)
        });

    })
    .post((req, res, next) =>{
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

module.exports = router;

