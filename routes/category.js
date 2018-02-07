/**
 * Created by amirassad on 11/10/17.
 */

const express = require('express');
const router = express.Router();
const Painting = require('../models/painting');
const PaintingCategory = require('../models/categories');

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
